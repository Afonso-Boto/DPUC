import os

# database environment variables
DB_NAME = os.getenv('DB_NAME')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_HOST = os.getenv('DB_HOST')
DB_PORT = os.getenv('DB_PORT')

# elastic search node variables
ES_HOST = os.getenv("ES01_NAME")
ES_PORT = os.getenv("ES_PORT")
INDEX_NAME = os.getenv("INDEX_NAME")
