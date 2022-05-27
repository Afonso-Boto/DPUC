from elasticsearch import Elasticsearch
import logging
import fetcher_search.env as env

from datetime import datetime
from .mysql import MysqlConnector
from .utils import es_query

from typing import List, Dict

logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s %(name)-12s %(levelname)-8s %(message)s",
    datefmt="%m-%d %H:%M:%S",
)

DAY_IN_SECOND = 60*60*24*1000


class ElasticSearchConnector:

    @classmethod
    def TTL(cls):
        return DAY_IN_SECOND

    @classmethod
    def is_outdated(cls, date: datetime):
        now = datetime.now().timestamp()
        return now > datetime.timestamp(date) + cls.TTL()

    @classmethod
    def index_name(cls):
        return env.INDEX_NAME

    @classmethod
    def url(cls):
        return "http://" + env.ES_HOST + ":" + env.ES_PORT

    @classmethod
    def get_connection(cls):
        connector = Elasticsearch(cls.url())
        if not connector.ping():
            raise ElasticsearchUnreachable(cls.url())
        return connector

    def __init__(self):
        self.logger = logging.getLogger(f"es-connector: {self.url()}")
        self.db_connection = MysqlConnector()
        self.last_updated = None

        connection = self.get_connection()
        connection.close()

        self.initialize()

    def update(self):
        connector = None
        try:
            connector = self.get_connection()

            docs = self.db_connection.get_dpucs(timestamp=self.last_updated)
            self.last_updated = datetime.now()
            for doc in docs:
                id = doc["id"]
                doc.pop("id")
                connector.update(index=self.index_name(), id=id, doc=doc)

        except Exception as e:
            raise RuntimeError("Error while interacting with Elastic Search Engine")
        finally:
            if connector is not None and connector.ping():
                connector.close()

    def initialize(self):
        connector = None
        index = self.index_name()
        try:
            connector = self.get_connection()

            if connector.indices.exists(index=index):
                connector.indices.delete(index=index)
            connector.indices.create(index=index)
            docs = self.db_connection.get_dpucs()
            self.last_updated = datetime.now()
            for doc in docs:
                id = doc.pop("id", "")
                connector.create(index=index, id=id, document=doc)

        except Exception as e:
            raise RuntimeError("Error while interacting with Elastic Search Engine")
        finally:
            if connector is not None and connector.ping():
                connector.close()

    def get_relevant_search(self, keywords=None) -> List[Dict]:
        if self.last_updated is None or self.is_outdated(self.last_updated):
            self.logger.info(f"last_update is None or data is Outdated - {self.last_updated}")
            self.initialize()

        connector = None
        new_docs = list()
        try:
            connector = self.get_connection()

            query = None
            if len(keywords.split(" ")) >= 1:
                query = es_query(keywords)
            response = connector.search(index=self.index_name(), query=query)
            docs = response["hits"]["hits"]
            for doc in docs:
                #new_doc = doc["_source"]
                #new_doc["id"] = doc["_id"]
                new_docs.append(doc["_id"])

        except Exception as e:
            raise RuntimeError("Error while interacting with Elastic Search Engine")
        finally:
            if connector is not None and connector.ping():
                connector.close()
            return new_docs


class ElasticsearchUnreachable(Exception):

    def __init__(self, url):
        self._url = url

    @property
    def msg(self):
        return f"Cannot connect to Elastic Search Node {self._url}"


main_connector = ElasticSearchConnector()
