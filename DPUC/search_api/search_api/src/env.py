import os
from .address import Address

# database environment variables
DB_NAME = os.getenv('DB_NAME')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_HOST = os.getenv('DB_HOST')

# elastic search node variables
ES_HOST = os.getenv("ES01_NAME")
ES_PORT = os.getenv("ES_PORT")
ES_URL = Address(ES_HOST, int(ES_PORT)).http_url
INDEX_NAME = os.getenv("INDEX_NAME")

DAY_MILLISECONDS = 60*60*24*1000

UTF8 = "utf-8"
LATIN1 = "latin-1"

