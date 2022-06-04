import search_api.src.env as env

from search_api.src.mysql import MysqlConnector
from search_api.src.address import Address
from search_api.src.es import ElasticSearchConnector

# environment variables
ES_HOST = env.ES_HOST
ES_PORT = env.ES_PORT
INDEX = env.INDEX_NAME
TTL = env.DAY_MILLISECONDS

es_connector = ElasticSearchConnector()
