import { useEffect, useState } from 'react';
import api from '../../utils/api';
import GlassCard from '../Common/GlassCard';

export default function TaskForm({ projectId, members = [], onClose, onSaved }) {
  const [form, setForm] = useState({
    title: '', description: '', assignedTo: '',
    status: 'Pending', priority: 'Medium', dueDate: ''
  });
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(projectId || '');
  const [availableMembers, setAvailableMembers] = useState(members);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!projectId) {
      api.get('/projects').then(r => setProjects(r.data));
    }
  }, [projectId]);

  useEffect(() => {
    if (!projectId && selectedProject) {
      const p = projects.find(x => x._id === selectedProject);
      setAvailableMembers(p?.members || []);
    }
  }, [selectedProject, projects, projectId]);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/tasks', { ...form, project: selectedProject });
      onSaved();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating task');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <GlassCard className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>New Task</h2>
        {error && <div className="alert">{error}</div>}
        <form onSubmit={submit}>
          {!projectId && (
            <div className="form-group">
              <label>Project</label>
              <select required value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}>
                <option value="">Select project</option>
                {projects.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
              </select>
            </div>
          )}
          <div className="form-group">
            <label>Title</label>
            <input required value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea rows="3" value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Assign To</label>
            <select value={form.assignedTo}
              onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}>
              <option value="">Unassigned</option>
              {availableMembers.map(m => (
                <option key={m._id} value={m._id}>{m.name}</option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Priority</label>
              <select value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}>
                <option>Low</option><option>Medium</option><option>High</option>
              </select>
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Status</label>
              <select value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input type="date" value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" className="btn btn-primary">Create</button>
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}