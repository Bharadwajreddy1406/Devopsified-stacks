# Task Manager MERN Application

A simple task management application built with the MERN stack (MongoDB, Express, React, Node.js) and Tailwind CSS.

## Features

- Create, read, update, and delete tasks
- Mark tasks as completed or pending
- Filter tasks by status (all, pending, completed)
- Responsive design with Tailwind CSS

## Project Structure

- **client/** - React frontend with TypeScript
- **server/** - Node.js/Express backend API

## Running the Application

### Development Mode

1. **Setup the backend:**
   ```
   cd server
   npm install
   npm run dev
   ```

2. **Setup the frontend:**
   ```
   cd client
   npm install
   npm run dev
   ```

3. **Make sure MongoDB is running locally** on port 27017

### Docker Mode

To run the entire application with Docker:

```
docker-compose up --build
```

This will start:
- Frontend at http://localhost
- Backend API at http://localhost:5000
- MongoDB database

## API Endpoints

- `GET /api/tasks` - Get all tasks (query param: `status`)
- `GET /api/tasks/:id` - Get a task by ID
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
