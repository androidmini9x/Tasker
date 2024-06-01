from psycopg2 import extensions
from db.database import Database


# Reference:
# https://stackoverflow.com/questions/12316638/psycopg2-execute-returns-datetime-instead-of-a-string
# to cast jsonify datetime.date to 2024-05-31 instead
# of Fri, 31 May 2024 00:00:00 GMT
def cast_time(value, _):
    return str(value)


# 1082 is oid for datetime.date
time_format = extensions.new_type((1082,), 'DATE_FORMAT', cast_time)
extensions.register_type(time_format)

# initialize database instance
conn = Database().get_connect()
