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

    def get_connection(self):
        return mysql.connector.connect(
            host=self.host,
            database=self.database,
            user=self.user,
            password=self.password,
        )

    @classmethod
    def execute(cls) -> Any:
        pass

    def get_dpucs(self, timestamp: float = None) -> List[Dict]:
        self.logger.info(f"get_dpucs(ts={timestamp})")

        connection = self.get_connection()
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
