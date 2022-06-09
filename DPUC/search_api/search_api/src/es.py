from elasticsearch import Elasticsearch
from typing import List, Dict, Any
from collections.abc import Callable

from .mysql import MysqlConnector
from .utils import es_query, now, format_value
from .log import get_logger
from .env import ES_URL, INDEX_NAME, DAY_MILLISECONDS as TTL


class ElasticSearchConnector:

    __url = ES_URL
    __index = INDEX_NAME
    __ttl = TTL

    __last_updated = None
    __initialized = False

    __logger = get_logger(f"es-connector({__url}, {__index})")

    @classmethod
    def __execute(cls, callback: Callable, *arg) -> Any:
        connector = Elasticsearch(cls.__url)
        response = callback(connector, *arg)
        connector.close()
        return response

    @classmethod
    def __initialize(cls, connector: Elasticsearch):
        if cls.__initialized:
            return
        if connector.indices.exists(index=cls.__index):
            connector.indices.delete(index=cls.__index)
        connector.indices.create(index=cls.__index)
        docs = MysqlConnector.get_dpucs()
        cls.__update(connector, docs)
        cls.__initialized = True

    @classmethod
    def __update(cls, connector: Elasticsearch, docs: List[Dict]):
        cls.__last_updated = now()
        for doc in docs:
            identifier = doc.pop("id")
            if connector.exists(index=cls.__index, id=identifier):
                connector.update(index=cls.__index, id=identifier, doc=doc)
            else:
                connector.create(index=cls.__index, id=identifier, document=doc)

    @classmethod
    def __search(cls, connector: Elasticsearch, query: Dict):
        return connector.search(index=cls.__index, query=query, size=50)

    @classmethod
    def initialize(cls):
        cls.__execute(cls.__initialize)

    @classmethod
    def update(cls):
        cls.initialize()
        docs = MysqlConnector.get_dpucs(timestamp=cls.__last_updated)
        cls.__execute(cls.__update, docs)

    @classmethod
    def search(cls, keywords=None) -> List[int]:
        cls.initialize()
        if now() > cls.__last_updated + cls.__ttl:
            cls.__logger.info("data is Outdated")
            cls.update()

        query = None
        if keywords is not None and len(keywords.strip()) >= 1:
            new_words = [format_value(word) for word in keywords.split(" ")]
            keywords = " ".join(new_words).strip()
            query = es_query(keywords)

        response = cls.__execute(cls.__search, query)

        response = response["hits"]["hits"]
        identifiers = list()
        for doc in response:
            identifiers.append(int(doc["_id"]))
        return identifiers

    def __init__(self):
        self.initialize()
