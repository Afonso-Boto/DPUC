from elasticsearch import Elasticsearch
from typing import List

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
    def get_dpucs(cls, timestamp: float = None):
        return MysqlConnector.get_dpucs(timestamp)

    @classmethod
    def execute(cls):
        connector = Elasticsearch(cls.url)
        
        connector.close()

    def __init__(self):

        connector = self.get_connection()

        if connector.indices.exists(index=self.index):
            connector.indices.delete(index=self.index)
        connector.indices.create(index=self.index)

        docs = self.get_dpucs()
        self.last_updated = now()
        for doc in docs:
            identifier = doc.pop("id", "")
            connector.create(index=self.index, id=identifier, document=doc)

        connector.close()

    @property
    def is_outdated(self) -> bool:
        return now() > self.last_updated + self.ttl

    def get_connection(self):
        return Elasticsearch(self.url)

    def update(self):
        connector = self.get_connection()

        docs = self.get_dpucs(timestamp=self.last_updated)
        self.last_updated = now()
        for doc in docs:
            identifier = doc.pop("id", "")
            if connector.exists(index=self.index, id=identifier):
                connector.update(index=self.index, id=identifier, doc=doc)
            else:
                connector.create(index=self.index, id=identifier, document=doc)

        connector.close()

    def get_relevant_search(self, keywords=None) -> List[int]:
        if self.is_outdated:
            self.logger.info(f"data is Outdated")
            self.update()

        connector = self.get_connection()

        query = None
        if len(keywords) >= 1:
            keywords = format_keywords(keywords)
            query = es_query(keywords)
        response = connector.search(index=self.index, query=query)["hits"]["hits"]
        identifiers = list()
        for doc in response:
            identifiers.append(int(doc["_id"]))

        connector.close()

        return identifiers
