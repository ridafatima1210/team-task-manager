import api from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';
import GlassCard from '../Common/GlassCard';

export default function TaskCard({ task, onUpdate }) {
  const { user } = useAuth();
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'Completed';

  const changeStatus = async (status) => {
    try {
      await api.put(`/tasks/${task._id}`, { status });
      onUpdate();
    } catch (err) { alert('Failed to update'); }
  };

  const remove = async () => {
    if (!confirm('Delete this task?')) return;
    await api.delete(`/tasks/${task._id}`);
    onUpdate();
  };

  const statusClass = task.status.toLowerCase().replace(' ', '-');

  return (
    <GlassCard className="task-card">
      <h4>{task.title}</h4>
      <p style={{ fontSize: '0.88rem', opacity: 0.85, margin: '6px 0' }}>
        {task.description || 'No description'}
      </p>
      <div className="meta">
        <span className={`badge ${statusClass}`}>{task.status}</span>
        <span className={`badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
        {isOverdue && <span className="badge overdue">⚠️ Overdue</span>}
      </div>
      <div style={{ fontSize: '0.82rem', opacity: 0.8, marginTop: 8 }}>
        📁 {task.project?.name}<br />
        👤 {task.assignedTo?.name || 'Unassigned'}<br />
        {task.dueDate && <>📅 {new Date(task.dueDate).toLocaleDateString()}</>}
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
        <select value={task.status} onChange={(e) => changeStatus(e.target.value)}
          style={{
            padding: '6px 10px', borderRadius: 8, fontSize: '0.8rem',
            background: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff'
          }}>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        {user?.role === 'Admin' && (
          <button className="btn btn-small btn-danger" onClick={remove}>Delete</button>
        )}
      </div>
    </GlassCard>
  );
}