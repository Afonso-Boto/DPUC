import mysql.connector
from typing import List, Dict, Any

from .utils import row2dict, query_very_basic
from .log import get_logger
from .env import DB_HOST, DB_NAME, DB_USER, DB_PASSWORD


class MysqlConnector:

    host = DB_HOST
    database = DB_NAME
    user = DB_USER
    password = DB_PASSWORD

    logger = get_logger(f"db-connector({host}, {database}, {user})")

    @classmethod
    def get_connection(cls):
        return mysql.connector.connect(
            host=cls.host,
            database=cls.database,
            user=cls.user,
            password=cls.password,
        )

    @classmethod
    def execute(cls) -> Any:
        connector = mysql.connector.connect(
            host=cls.host,
            database=cls.database,
            user=cls.user,
            password=cls.password,
        )

    @classmethod
    def get_dpucs(cls, timestamp: float = None) -> List[Dict]:
        cls.logger.info(f"get_dpucs(ts={timestamp})")

        connection = cls.get_connection()
        cursor = connection.cursor()

        if timestamp is None:
            query = query_very_basic()
        else:
            #TODO
            query = query_very_basic()
        cursor.execute(query)
        response = cursor.fetchall()

        cursor.close()
        connection.close()

        docs = list()
        for row in response:
            docs.append(row2dict(row))
        return docs
