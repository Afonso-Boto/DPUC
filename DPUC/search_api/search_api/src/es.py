from elasticsearch import Elasticsearch
from typing import List, Dict, Any
from collections.abc import Callable

from .mysql import MysqlConnector
from .utils import es_query, now, format_value
from .log import get_logger
from .env import ES_URL, INDEX_NAME, DAY_MILLISECONDS as TTL


class ElasticSearchConnector:

    url = ES_URL
    index = INDEX_NAME
    ttl = TTL

    last_updated = None
    initialized = False

    logger = get_logger(f"es-connector({url}, {index})")

    @classmethod
    def execute(cls, callback: Callable, *arg) -> Any:
        connector = Elasticsearch(cls.url)
        response = callback(connector, *arg)
        connector.close()
        return response

    @classmethod
    def _initialize(cls, connector: Elasticsearch):
        if cls.initialized:
            return
        if connector.indices.exists(index=cls.index):
            connector.indices.delete(index=cls.index)
        connector.indices.create(index=cls.index)
        docs = MysqlConnector.get_dpucs()
        cls._update(connector, docs)
        cls.initialized = True

    @classmethod
    def initialize(cls):
        cls.execute(cls._initialize)

    @classmethod
    def _update(cls, connector: Elasticsearch, docs: List[Dict]):
        cls.last_updated = now()
        for doc in docs:
            identifier = doc.pop("id")
            if connector.exists(index=cls.index, id=identifier):
                connector.update(index=cls.index, id=identifier, doc=doc)
            else:
                connector.create(index=cls.index, id=identifier, document=doc)

    @classmethod
    def _search(cls, connector: Elasticsearch, query: Dict):
        return connector.search(index=cls.index, query=query)

    @classmethod
    def update(cls):
        cls.initialize()
        docs = MysqlConnector.get_dpucs(timestamp=cls.last_updated)
        cls.execute(cls._update, docs)

    @classmethod
    def search(cls, keywords=None) -> List[int]:
        cls.initialize()
        if now() > cls.last_updated + cls.ttl:
            cls.logger.info("data is Outdated")
            cls.update()

        query = None
        if keywords is not None and len(keywords.strip()) >= 1:
            new_words = [format_value(word) for word in keywords.split(" ")]
            keywords = " ".join(new_words).strip()
            query = es_query(keywords)

        response = cls.execute(cls._search, query)

        response = response["hits"]["hits"]
        identifiers = list()
        for doc in response:
            identifiers.append(int(doc["_id"]))
        return identifiers

    def __init__(self):
        self.initialize()
