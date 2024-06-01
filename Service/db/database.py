from psycopg2 import connect, OperationalError
from os import getenv
from dotenv import load_dotenv
load_dotenv()


class Database:
    def __init__(self):
        try:
            self.conn = connect(
                host=getenv('DATABASE_HOST', 'localhost'),
                user=getenv('DATABASE_USER', 'root'),
                password=getenv('DATABASE_PASSWORD', ''),
                database=getenv('DATABASE_NAME', 'app'),
                port=getenv('DATABASE_PORT', 5432)
            )
            print("Database connection estiblished successfully")
        except OperationalError as err:
            print(err)
            exit()

    def get_connect(self):
        return self.conn
