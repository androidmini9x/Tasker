from flask import Flask, request, jsonify
from service import task


app = Flask(__name__)


@app.route('/tasks')
def get_tasks():
    try:
        result = task.get_all()
        return jsonify(result)
    except Exception as e:
        return jsonify({"message": e}), 500


@app.route('/tasks/<int:id>')
def get_task_by_id(id):
    try:
        result = task.get_one(id)
        if not result:
            return jsonify({"message": "Task not found"}), 404
        return jsonify(result)
    except Exception as e:
        return jsonify({"message": e}), 500


@app.route('/tasks', methods=['POST'])
def add_task():
    try:
        result = task.create_task(request.get_json())
        return jsonify(result)
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    try:
        task.update_task(id, request.get_json())
        return jsonify({"message": "Task updated successfully."})
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    try:
        task.del_task(id)
        return jsonify({"message": "Task deleted successfully."})
    except Exception as e:
        print(e)
        return jsonify({"message": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
