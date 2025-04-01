# Task Manager API Server

A RESTful API for managing tasks built with Node.js, Express, and MongoDB.

## Features

- Complete CRUD operations for tasks
- MongoDB integration with Mongoose
- CORS support for cross-origin requests
- Environment variable configuration

## API Endpoints

| Method | Endpoint        | Description |
|--------|----------------|-------------|
| GET    | `/api/tasks`        | Fetch all tasks (query param: `status`) |
| POST   | `/api/tasks`        | Create a new task |
| GET    | `/api/tasks/:id`    | Get a specific task by ID |
| PUT    | `/api/tasks/:id`    | Update a task |
| DELETE | `/api/tasks/:id`    | Delete a task |

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or remote instance)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   NODE_ENV=development
   ```

### Running the Server

For development:
```bash
npm run dev
```

For production:
```bash
npm start
```

### Docker

To run with Docker:
```bash
docker compose up --build
```

## Project Structure

```
server/
│── config/              # Database configuration
│── models/              # Mongoose schema for tasks
│── routes/              # API routes
│── controllers/         # Request handlers
│── index.js             # Entry point for the Express app
│── .env                 # Environment variables
```
