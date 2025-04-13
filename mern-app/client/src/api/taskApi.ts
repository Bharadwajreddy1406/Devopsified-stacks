import { Task, TaskFormData } from '../types/Task';

// Use environment variable or default to localhost in development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/tasks';

// Function to handle common fetch errors
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.message || response.statusText;
  throw new Error(`API Error: ${errorMessage}`);
  }
  return response.json();
};

// Get all tasks with optional status filter
export const getTasks = async (status?: string): Promise<Task[]> => {
  const url = status ? `${API_URL}?status=${status}` : API_URL;
  console.log(`Fetching tasks from: ${url}`);
  const response = await fetch(url);
  return handleResponse(response);
};

// Get a single task by ID
export const getTaskById = async (id: string): Promise<Task> => {
  const response = await fetch(`${API_URL}/${id}`);
  return handleResponse(response);
};

// Create a new task
export const addTask = async (taskData: TaskFormData): Promise<Task> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });
  return handleResponse(response);
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
  return handleResponse(response);
};

// Delete a task
export const deleteTask = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  await handleResponse(response);
};

// Update only the status of a task
export const toggleTaskStatus = async (id: string, status: 'pending' | 'completed'): Promise<Task> => {
  const task = await getTaskById(id);
  return updateTask(id, {
    title: task.title,
    description: task.description || '',
    status
  });
};
