import mysql.connector
from mysql.connector import Error
import fetcher_search.env as env
import logging
from datetime import datetime
from mysql.connector.connection import MySQLConnection
from typing import List, Dict

import os
import json
from pathlib import Path

logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s %(name)-12s %(levelname)-8s %(message)s",
    datefmt="%m-%d %H:%M:%S",
)


class MysqlConnector:

    @classmethod
    def get_connection(cls):
        connector = mysql.connector.connect(
            host=env.DB_HOST,
            database=env.DB_NAME,
            user=env.DB_USER,
            password=env.DB_PASSWORD
        )
        if not connector.is_connected():
            raise RuntimeError("Cannot connect to the database!")
        return connector

    def __init__(self):
        connection = self.get_connection()
        connection.close()
        self.logger = logging.getLogger("MysqlConnector")
        self.logger.info(f"connector to database is successfully initialized")

    def get_dpucs(self, timestamp: datetime = None) -> List[Dict]:
        self.logger.info(f"Call to get dpucs from database with timestamp {timestamp}")
        connection = None
        cursor = None
        docs = []
        try:
            connection = self.get_connection()
            cursor = connection.cursor()
            if timestamp is None:
                self.logger.info("Return every uc")
                docs = get_data()
                self.logger.info(f"count of rows: {len(docs)}")
            else:
                self.logger.info("Update some UCs")
                docs = get_data()
                self.logger.info(f"count of rows: {len(docs)}")
        except Error as e:
            RuntimeError("Error while interacting with database")
        finally:
            if cursor is not None:
                cursor.close()
            if connection is not None and connection.is_connected():
                connection.close()
            return docs


def get_data() -> List[Dict]:
    filename = os.path.join(Path(__file__).parent, "dpuc.json")
    with open(filename, "r") as file:
        return json.load(file)


