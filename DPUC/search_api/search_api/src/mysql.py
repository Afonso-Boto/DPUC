import mysql.connector
from typing import List, Dict, Any
from collections.abc import Callable

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
    def _execute(cls, callback: Callable, *arg) -> Any:
        connector = mysql.connector.connect(
            host=cls.host,
            database=cls.database,
            user=cls.user,
            password=cls.password,
        )
        cursor = connector.cursor()
        response = callback(cls, cursor, *arg)
        cursor.close()
        connector.close()
        return response

    @classmethod
    def _get_dpucs(cls, cursor, *arg):
        timestamp = arg[0]
        if timestamp is None:
            query = query_very_basic()
        else:
            #TODO
            query = query_very_basic()
        cursor.execute(query)
        return cursor.fetchall()


    @classmethod
    def get_dpucs(cls, timestamp: float = None) -> List[Dict]:
        cls.logger.info(f"get_dpucs(ts={timestamp})")

        connection = cls.get_connection()
        cursor = connection.cursor()

        response = cls._get_dpucs(cursor, timestamp)

        cursor.close()
        connection.close()

        docs = list()
        for row in response:
            docs.append(row2dict(row))
        return docs
