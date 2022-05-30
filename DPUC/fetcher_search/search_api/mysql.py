import mysql.connector
from typing import List, Dict
from datetime import datetime

from .utils import row2dict, query_very_basic
from .log import get_logger


class MysqlConnector:

    def __init__(self, host, database, user, password):
        self.host = host
        self.database = database
        self.user = user
        self.password = password

        self.logger = get_logger(f"db-connector({self.host}, {self.database}, {self.user})")
        self.logger.info(f"successfully initialized")

    def get_connection(self):
        return mysql.connector.connect(
            host=self.host,
            database=self.database,
            user=self.user,
            password=self.password,
            use_unicode=True,
            charset="utf8"
        )

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
        docs = list()
        for row in cursor:
            docs.append(row2dict(row))

        cursor.close()
        connection.close()

        return docs
