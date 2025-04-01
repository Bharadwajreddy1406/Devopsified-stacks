export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  createdAt: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  status: 'pending' | 'completed';
}
