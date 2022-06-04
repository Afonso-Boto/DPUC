import mysql.connector
from typing import List, Dict, Any
from collections.abc import Callable

from .utils import query_very_basic, format_value, get_fields
from .log import get_logger
from .env import DB_HOST, DB_NAME, DB_USER, DB_PASSWORD


class MysqlConnector:

    host = DB_HOST
    database = DB_NAME
    user = DB_USER
    password = DB_PASSWORD

    logger = get_logger(f"db-connector({host}, {database}, {user})")

    @classmethod
    def execute(cls, query) -> Any:
        connector = mysql.connector.connect(
            host=cls.host,
            database=cls.database,
            user=cls.user,
            password=cls.password,
        )
        cursor = connector.cursor()
        cursor.execute(query)
        response = cursor.fetchall()
        cursor.close()
        connector.close()
        return response

    @classmethod
    def get_dpucs(cls, timestamp: float = None) -> List[Dict]:
        cls.logger.info(f"get_dpucs(ts={timestamp})")

        if timestamp is None:
            query = query_very_basic()
        else:
            #TODO
            query = query_very_basic()

        response = cls.execute(query)

        fields = get_fields()
        docs = list()
        for row in response:
            uc = dict()
            for i in range(len(fields)):
                if fields[i] == "id":
                    uc[fields[i]] = row[i]
                else:
                    uc[fields[i]] = format_value(row[i])
            docs.append(uc)
        return docs
