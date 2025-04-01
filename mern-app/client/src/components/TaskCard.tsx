import { Link } from 'react-router-dom';
import { Task } from '../types/Task';
import { cn } from '../lib/utils';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggleStatus: (task: Task) => void;
}

const TaskCard = ({ task, onDelete, onToggleStatus }: TaskCardProps) => {
  const formattedDate = new Date(task.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="border border-border rounded-lg p-4 bg-card text-card-foreground shadow-sm hover:shadow transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={task.status === 'completed'}
            onChange={() => onToggleStatus(task)}
            className="mt-1.5 h-4 w-4 rounded border-border text-primary focus:ring-primary"
            aria-label={`Mark task "${task.title}" as ${task.status === 'completed' ? 'pending' : 'completed'}`}
          />
          <div>
            <h3 className={cn(
              "text-xl font-medium",
              task.status === 'completed' && "line-through text-muted-foreground"
            )}>
              {task.title}
            </h3>
            {task.description && (
              <p className={cn(
                "mt-1",
                task.status === 'completed' ? "text-muted-foreground/70" : "text-muted-foreground"
              )}>
                {task.description}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              Created: {formattedDate}
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
            onClick={() => onDelete(task._id)}
            className="text-xs bg-destructive text-destructive-foreground px-2 py-1 rounded hover:bg-destructive/80 transition-colors"
            aria-label={`Delete task "${task.title}"`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
