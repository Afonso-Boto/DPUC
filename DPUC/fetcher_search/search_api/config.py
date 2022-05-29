import fetcher_search.env as env

from .mysql import MysqlConnector
from .address import Address
from .es import ElasticSearchConnector

# environment variables
ES_HOST = env.ES_HOST
ES_PORT = env.ES_PORT
INDEX = env.INDEX_NAME
TTL = env.DAY_MILLISECONDS

DB_HOST = env.DB_HOST
DB_NAME = env.DB_NAME
DB_USER = env.DB_USER
DB_PASSWORD = env.DB_PASSWORD

es_connector = ElasticSearchConnector(
    MysqlConnector(DB_HOST, DB_NAME, DB_USER, DB_PASSWORD),
    Address(ES_HOST, ES_PORT),
    INDEX,
    TTL,
)
