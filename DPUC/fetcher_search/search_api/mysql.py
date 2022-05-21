import mysql.connector
from mysql.connector import Error
import fetcher_search.env as env


def connect():
    try:
        connection = mysql.connector.connect(
            host=env.DB_HOST,
            database=env.DB_NAME,
            user=env.DB_USER,
            password=env.DB_PASSWORD)
        if connection.is_connected():
            pass
    except Error as e:
        pass
