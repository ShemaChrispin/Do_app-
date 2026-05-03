import React from 'react';
import { Calendar, Tag, CheckCircle, Circle, Trash2 } from 'lucide-react';

interface Task {
  id: number;
  content: string;
  startDate: string;
  dueDate: string;
  colorTags: string[];
  category: string;
  completed: boolean;
}

interface TaskCardProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle, onDelete }) => {
  const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="task-header">
        <span className={`category-badge ${task.category.toLowerCase()}`}>{task.category}</span>
        <div className="task-actions">
          <button onClick={() => onToggle(task.id)} className="action-btn">
            {task.completed ? <CheckCircle className="icon-success" /> : <Circle />}
          </button>
          <button onClick={() => onDelete(task.id)} className="action-btn">
            <Trash2 className="icon-danger" />
          </button>
        </div>
      </div>
      <p className="task-content">{task.content}</p>
      <div className="task-footer">
        <div className="task-dates">
          <Calendar size={14} />
          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
        <div className="task-tags">
          {task.colorTags.map((tag, index) => (
            <span key={index} className="tag" style={{ backgroundColor: tag }}>
              <Tag size={10} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
