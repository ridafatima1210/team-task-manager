import { useEffect, useState } from 'react';
import api from '../../utils/api';
import GlassCard from '../Common/GlassCard';
import TaskCard from './TaskCard';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/tasks');
      setTasks(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const filtered = filter === 'All' ? tasks : tasks.filter(t => t.status === filter);

  return (
    <div>
      <div className="section-header">
        <h1>✅ All Tasks</h1>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: '8px 12px', borderRadius: 10,
            background: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff'
          }}>
          <option>All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>

      {loading ? <p>Loading...</p> : filtered.length === 0 ? (
        <GlassCard><p>No tasks found.</p></GlassCard>
      ) : (
        <div className="cards-grid">
          {filtered.map(t => <TaskCard key={t._id} task={t} onUpdate={load} />)}
        </div>
      )}
    </div>
  );
}