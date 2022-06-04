from elasticsearch import Elasticsearch
from typing import List, Dict, Any
from collections.abc import Callable

from .mysql import MysqlConnector
from .utils import es_query, format_keywords, now
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
    def update(cls):
        docs = MysqlConnector.get_dpucs(timestamp=cls.last_updated)
        cls.execute(cls._update, docs)

    def __init__(self):
        self.initialize()

    def get_relevant_search(self, keywords=None) -> List[int]:
        if now() > self.last_updated + self.ttl:
            self.logger.info(f"data is Outdated")
            self.update()

        query = None
        if len(keywords) >= 1:
            keywords = format_keywords(keywords)
            query = es_query(keywords)

        connector = Elasticsearch(self.url)
        response = connector.search(index=self.index, query=query)
        connector.close()

        response = response["hits"]["hits"]
        identifiers = list()
        for doc in response:
            identifiers.append(int(doc["_id"]))
        return identifiers
