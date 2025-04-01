import { Task, TaskFormData } from '../types/Task';

// Use relative URL or environment variable for API URL
const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api/tasks'  // In production, use relative path that can be handled by proxy
  : 'http://localhost:5000/api/tasks'; // In development, use full URL

// Fetch all tasks with optional status filter
export const fetchTasks = async (status?: string): Promise<Task[]> => {
  const url = status ? `${API_URL}?status=${status}` : API_URL;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Error fetching tasks: ${response.statusText}`);
  }
  
  return response.json();
};

// Fetch a single task by ID
export const fetchTaskById = async (id: string): Promise<Task> => {
  const response = await fetch(`${API_URL}/${id}`);
  
  if (!response.ok) {
    throw new Error(`Error fetching task: ${response.statusText}`);
  }
  
  return response.json();
};

// Create a new task
export const createTask = async (taskData: TaskFormData): Promise<Task> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });
  
  if (!response.ok) {
    throw new Error(`Error creating task: ${response.statusText}`);
  }
  
  return response.json();
};

// Update an existing task
export const updateTask = async (id: string, taskData: TaskFormData): Promise<Task> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });
  
  if (!response.ok) {
    throw new Error(`Error updating task: ${response.statusText}`);
  }
  
  return response.json();
};

// Update only the status of a task
export const updateTaskStatus = async (id: string, status: 'pending' | 'completed'): Promise<Task> => {
  const task = await fetchTaskById(id);
  
  return updateTask(id, {
    title: task.title,
    description: task.description || '',
    status
  });
};

// Delete a task
export const deleteTask = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error(`Error deleting task: ${response.statusText}`);
  }
};
