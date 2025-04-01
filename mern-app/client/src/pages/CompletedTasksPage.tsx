import { useState, useEffect } from 'react';
import { Task } from '../types/Task';
import { getTasks, deleteTask, toggleTaskStatus } from '../api/taskApi';
import TaskCard from '../components/TaskCard';

const CompletedTasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCompletedTasks();
  }, []);

  const loadCompletedTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks('completed');
      setTasks(data);
      setError(null);
    } catch (err) {
      console.error('Error loading completed tasks:', err);
      setError(err instanceof Error ? err.message : 'Failed to load completed tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        setTasks(tasks.filter(task => task._id !== id));
      } catch (err) {
        console.error('Error deleting task:', err);
        setError(err instanceof Error ? err.message : 'Failed to delete task');
      }
    }
  };

  const handleToggleStatus = async (task: Task) => {
    try {
      await toggleTaskStatus(task._id, 'pending');
      setTasks(tasks.filter(t => t._id !== task._id));
    } catch (err) {
      console.error('Error updating task status:', err);
      setError(err instanceof Error ? err.message : 'Failed to update task status');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Completed Tasks</h1>
      
      {error && (
        <div className="bg-destructive/20 border border-destructive text-destructive p-4 rounded-md">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No completed tasks found.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {tasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedTasksPage;
