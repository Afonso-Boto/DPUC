from elasticsearch import Elasticsearch
from datetime import datetime
from typing import List

from search_api.src.mysql import MysqlConnector
from search_api.src.utils import es_query, format_keywords
from search_api.src.log import get_logger
from .env import ES_URL, INDEX_NAME, DAY_MILLISECONDS as TTL


class ElasticSearchConnector:

    database = MysqlConnector()
    url = ES_URL
    index = INDEX_NAME
    ttl = TTL

    logger = get_logger(f"es-connector({url}, {index})")

    def __init__(self):
        self.last_updated = None

        connector = self.get_connection()

        if connector.indices.exists(index=self.index):
            connector.indices.delete(index=self.index)
        connector.indices.create(index=self.index)

        docs = self.database.get_dpucs()
        self.last_updated = datetime.now().timestamp()
        for doc in docs:
            identifier = doc.pop("id", "")
            connector.create(index=self.index, id=identifier, document=doc)

        connector.close()

    @property
    def is_outdated(self) -> bool:
        now = datetime.now().timestamp()
        return now > self.last_updated + self.ttl

    def get_connection(self):
        return Elasticsearch(self.url)

    def update(self):
        connector = self.get_connection()

        docs = self.database.get_dpucs(timestamp=self.last_updated)
        self.last_updated = datetime.now()
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
