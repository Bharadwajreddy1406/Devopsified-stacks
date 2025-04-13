import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { TaskFormData } from '../types/Task'
import { createTask, fetchTaskById, updateTask } from '../services/taskService'

const TaskForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    status: 'pending'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isEditMode = !!id

  useEffect(() => {
    if (isEditMode) {
      loadTask(id)
    }
  }, [id, isEditMode])

  const loadTask = async (taskId: string) => {
    try {
      setLoading(true)
      const task = await fetchTaskById(taskId)
      setFormData({
        title: task.title,
        description: task.description || '',
        status: task.status
      })
    } catch (err) {
      console.error('Error loading task:', err)
      setError('Failed to load task details. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError(null)
      
      if (!formData.title.trim()) {
        setError('Title is required')
        return
      }
      
      if (isEditMode) {
        await updateTask(id, formData)
      } else {
        await createTask(formData)
      }
      
      navigate('/')
    } catch (err) {
      console.error('Error saving task:', err)
      setError('Failed to save task. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6">
        {isEditMode ? 'Edit Task' : 'Add New Task'}
      </h2>
      
      {error && (
        <div className="bg-destructive/20 border border-destructive text-destructive p-4 rounded-md mb-4">
          {error}
        </div>
      )}
      
      {loading && isEditMode ? (
        <p className="text-center text-muted-foreground">Loading task details...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="block font-medium">
              Title <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-input bg-background rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter task title"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="block font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full border border-input bg-background rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter task description (optional)"
            ></textarea>
          </div>
          
          {isEditMode && (
            <div className="space-y-2">
              <label htmlFor="status" className="block font-medium">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-input bg-background rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          )}
          
          <div className="flex space-x-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-70"
            >
              {loading ? 'Saving...' : isEditMode ? 'Update Task' : 'Create Task'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default TaskForm
