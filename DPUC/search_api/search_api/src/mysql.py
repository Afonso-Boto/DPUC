import mysql.connector
from typing import List, Dict, Any

from .utils import query_very_basic, format_value, get_fields
from .log import get_logger
from .env import DB_HOST, DB_NAME, DB_USER, DB_PASSWORD


class MysqlConnector:

    __host = DB_HOST
    __database = DB_NAME
    __user = DB_USER
    __password = DB_PASSWORD

    __logger = get_logger(f"db-connector({__host}, {__database}, {__user})")

    @classmethod
    def __execute(cls, query) -> Any:
        connector = mysql.connector.connect(
            host=cls.__host,
            database=cls.__database,
            user=cls.__user,
            password=cls.__password,
        )
        cursor = connector.cursor()
        cursor.execute(query)
        response = cursor.fetchall()
        cursor.close()
        connector.close()
        return response

    @classmethod
    def get_dpucs(cls, timestamp: float = None) -> List[Dict]:
        cls.__logger.info(f"get_dpucs(ts={timestamp})")

        if timestamp is None:
            query = query_very_basic()
        else:
            # TODO
            query = query_very_basic()

        response = cls.__execute(query)

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
