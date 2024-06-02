# Tasker

## Features

- Create tasks with title, description.
- View a list of all tasks.
- Update tasks by editing their details.
- Delete tasks.

## Technologies Used

- PostgreSQL
- Python
- Flask (Python service)
- Node.js
- Express.js (Node.js service)
- React.js

## Architecture Overview

Tasker follows a 3-tier architecture:
- PostgreSQL database for storing task data.
- Python Flask service for handling database communication and exposing APIs.
- Node.js Express.js service as a proxy between the Python service and the frontend.
- React.js frontend for the user interface.

## Installation
### (Manually)
1. Clone the repository.
2. Install dependencies for the Python service: `cd python-service && pip install -r requirements.txt`
3. Install dependencies for the Node.js service: `cd node-service && npm install && npm run build`
4. Install dependencies for the frontend: `cd react-frontend && npm install && npm run build`
5. Set up the PostgreSQL database as schema in file `database`.
6. Configure `.env` file for each service.
7. Start the Python service: `cd python-service && python app.py`
8. Start the Node.js service: `cd node-service && npm start`
9. Start the Frontend: `cd react-frontend && npm start`
### Using Docker (automated && easy)
1. Clone the repository.
2. Run `docker compose up -d`.

## API Documentation

The Node service exposes the following API endpoints:

- `GET /api/tasks`: Get all tasks.
- `GET /api/tasks/{id}`: Get a specific task by ID.
- `POST /api/tasks`: Create a new task.
- `PUT /api/tasks/{id}`: Update an existing task by ID.
- `DELETE /api/tasks/{id}`: Delete a task by ID.