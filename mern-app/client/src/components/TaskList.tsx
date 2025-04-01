import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Task } from '../types/Task'
import { fetchTasks, deleteTask, updateTaskStatus } from '../services/taskService'
import { cn } from '../lib/utils'

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all')

  useEffect(() => {
    loadTasks()
  }, [filter])

  const loadTasks = async () => {
    try {
      setLoading(true)
      const statusParam = filter !== 'all' ? filter : ''
      const data = await fetchTasks(statusParam)
      setTasks(data)
      setError(null)
    } catch (err) {
      console.error('Error loading tasks:', err)
      setError('Failed to load tasks. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id)
        setTasks(tasks.filter(task => task._id !== id))
      } catch (err) {
        console.error('Error deleting task:', err)
        setError('Failed to delete task. Please try again.')
      }
    }
  }

  const handleStatusToggle = async (task: Task) => {
    try {
      const newStatus = task.status === 'pending' ? 'completed' : 'pending'
      const updatedTask = await updateTaskStatus(task._id, newStatus)
      setTasks(tasks.map(t => t._id === task._id ? updatedTask : t))
    } catch (err) {
      console.error('Error updating task status:', err)
      setError('Failed to update task status. Please try again.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">My Tasks</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={cn(
              "px-4 py-2 rounded-md transition-colors",
              filter === 'all' 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            All
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={cn(
              "px-4 py-2 rounded-md transition-colors",
              filter === 'pending' 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={cn(
              "px-4 py-2 rounded-md transition-colors",
              filter === 'completed' 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            Completed
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-destructive/20 border border-destructive text-destructive p-4 rounded-md">
          {error}
        </div>
      )}
      
      {loading ? (
        <p className="text-center text-muted-foreground">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-center py-8 text-muted-foreground">
          {filter === 'all' 
            ? 'No tasks found. Add some tasks to get started!' 
            : `No ${filter} tasks found.`}
        </p>
      ) : (
        <ul className="space-y-4">
          {tasks.map(task => (
            <li 
              key={task._id} 
              className="border border-border rounded-lg p-4 bg-card text-card-foreground shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={task.status === 'completed'}
                    onChange={() => handleStatusToggle(task)}
                    className="mt-1.5 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <div>
                    <h3 className={cn(
                      "text-xl font-medium",
                      task.status === 'completed' && "line-through text-muted-foreground"
                    )}>
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className="text-muted-foreground mt-1">{task.description}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      Created: {new Date(task.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link 
                    to={`/edit/${task._id}`}
                    className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded hover:bg-accent/80 transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="text-xs bg-destructive text-destructive-foreground px-2 py-1 rounded hover:bg-destructive/80 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TaskList
