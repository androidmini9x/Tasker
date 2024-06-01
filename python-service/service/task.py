from db import conn
from datetime import date
from pydantic import ValidationError
from psycopg2.extras import RealDictCursor
from model import TaskValidator


class Task():
    def create_task(self, data):
        try:
            task = TaskValidator.model_validate(data)
        except ValidationError as e:
            raise Exception('Title field is required')

        try:
            today = date.today()
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""INSERT INTO tasks
                            (title, description, created_at, updated_at)
                            VALUES (%s, %s, %s, %s)
                            RETURNING
                            id, title, description, created_at, updated_at
                            """, (task.title, task.description, today, today))
                result = cur.fetchone()
                conn.commit()
                return result
        except Exception as e:
            print(e)
            raise Exception('Failed to add new task')

    def update_task(self, id, data):
        try:
            today = date.today()
            task = TaskValidator.model_validate(data)
            with conn.cursor() as cur:
                cur.execute("""UPDATE tasks
                            SET title = %s, description = %s, updated_at = %s
                            WHERE id = %s
                            """, (task.title, task.description, today, id))
                conn.commit()
        except Exception as e:
            print(e)
            raise Exception('Failed to update the task')

    def get_all(self):
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute('select * from tasks')
                result = cur.fetchall()
                return result
        except Exception as e:
            raise Exception('Failed to get tasks')

    def get_one(self, id):
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute('select * from tasks where id = %s', (id,))
                result = cur.fetchall()
                return result
        except Exception as e:
            raise Exception('Failed to get task')

    def del_task(self, id):
        try:
            with conn.cursor() as cur:
                cur.execute("""DELETE FROM tasks
                            WHERE id = %s
                            """, (id,))
                conn.commit()
                if not cur.rowcount:
                    raise Exception('There is not task to delete')
        except Exception as e:
            print(e)
            raise Exception('Failed to delete the task')
