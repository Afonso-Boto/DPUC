import fetcher_search.env as env

from .mysql import MysqlConnector
from .address import Address
from .es import ElasticSearchConnector

# environment variables
ES_HOST = env.ES_HOST
ES_PORT = env.ES_PORT

DB_HOST = env.DB_HOST
DB_NAME = env.DB_NAME
DB_USER = env.DB_USER
DB_PASSWORD = env.DB_PASSWORD

INDEX = env.INDEX_NAME

# config variables
DAY_IN_SECOND = 60*60*24*1000

db_connector = MysqlConnector(DB_HOST, DB_NAME, DB_USER, DB_PASSWORD)
es_connector = ElasticSearchConnector(db_connector, Address(ES_HOST, ES_PORT), INDEX, DAY_IN_SECOND)
