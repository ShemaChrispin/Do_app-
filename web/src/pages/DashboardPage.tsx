import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import api from '../services/api';
import TaskCard from '../components/TaskCard';
import { useAuth } from '../hooks';
import { LogOut, Plus, Filter, Calendar as CalendarIcon, List } from 'lucide-react';

import axios from 'axios';

interface Task {
  id: number;
  content: string;
  startDate: string;
  dueDate: string;
  colorTags: string[];
  category: string;
  completed: boolean;
}

const DashboardPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Work' | 'Private'>('All');
  const [showForm, setShowForm] = useState(false);
  const [content, setContent] = useState('');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('Work');
  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState('');
  const { logout, user } = useAuth();

  const fetchTasks = React.useCallback(async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch {
      console.error('Failed to fetch tasks');
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = React.useMemo(() => {
    if (categoryFilter === 'All') {
      return tasks;
    } else {
      return tasks.filter(t => t.category === categoryFilter);
    }
  }, [categoryFilter, tasks]);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tags = tagInput.split(',').map(t => t.trim()).filter(t => t);
      await api.post('/tasks', { content, startDate, dueDate, category, colorTags: tags });
      setContent('');
      setStartDate('');
      setDueDate('');
      setTagInput('');
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Failed to create task');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  const handleToggle = async (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    try {
      await api.put(`/tasks/${id}`, { completed: !task.completed });
      fetchTasks();
    } catch {
      console.error('Failed to update task');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch {
      console.error('Failed to delete task');
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome, {user?.name}</h1>
        <button onClick={logout} className="logout-btn">
          <LogOut size={20} /> Logout
        </button>
      </header>

      <div className="dashboard-controls">
        <div className="view-toggles">
          <button onClick={() => setView('list')} className={`toggle-btn ${view === 'list' ? 'active' : ''}`}>
            <List size={20} /> List
          </button>
          <button onClick={() => setView('calendar')} className={`toggle-btn ${view === 'calendar' ? 'active' : ''}`}>
            <CalendarIcon size={20} /> Calendar
          </button>
        </div>

        <div className="filter-controls">
          <Filter size={20} className="filter-icon" />
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value as 'All' | 'Work' | 'Private')}>
            <option value="All">All Categories</option>
            <option value="Work">Work</option>
            <option value="Private">Private</option>
          </select>
        </div>

        <button onClick={() => setShowForm(!showForm)} className="btn-primary add-btn">
          <Plus size={20} /> {showForm ? 'Cancel' : 'New Task'}
        </button>
      </div>

      {showForm && (
        <div className="task-form-card">
          <h3>Create New Task</h3>
          {error && <p className="error-msg">{error}</p>}
          <form onSubmit={handleCreateTask}>
            <div className="form-group">
              <label>Content</label>
              <input type="text" value={content} onChange={(e) => setContent(e.target.value)} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Due Date</label>
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="Work">Work</option>
                  <option value="Private">Private</option>
                </select>
              </div>
              <div className="form-group">
                <label>Color Tags (comma separated colors)</label>
                <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="#ff0000, #00ff00" />
              </div>
            </div>
            <button type="submit" className="btn-primary">Create Task</button>
          </form>
        </div>
      )}

      {view === 'list' ? (
        <div className="task-list">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <TaskCard key={task.id} task={task} onToggle={handleToggle} onDelete={handleDelete} />
            ))
          ) : (
            <p className="empty-msg">No tasks found. Create one to get started!</p>
          )}
        </div>
      ) : (
        <div className="calendar-view">
          <Calendar 
            tileContent={({ date, view }) => {
              if (view === 'month') {
                const dayTasks = filteredTasks.filter(t => new Date(t.dueDate).toDateString() === date.toDateString());
                return (
                  <div className="calendar-tiles">
                    {dayTasks.map(t => (
                      <div key={t.id} className={`tile-dot ${t.category.toLowerCase()}`} title={t.content} />
                    ))}
                  </div>
                );
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
