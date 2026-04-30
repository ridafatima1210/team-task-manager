import { useEffect, useState } from 'react';
import api from '../../utils/api';
import GlassCard from '../Common/GlassCard';
import TaskCard from '../Tasks/TaskCard';

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, completed: 0, overdue: 0 });
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [s, t] = await Promise.all([
        api.get('/tasks/stats'),
        api.get('/tasks')
      ]);
      setStats(s.data);
      setRecentTasks(t.data.slice(0, 6));
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>📊 Dashboard</h1>

      <div className="stats-grid">
        <GlassCard className="stat-card glass">
          <h3>{stats.total}</h3><p>Total Tasks</p>
        </GlassCard>
        <GlassCard className="stat-card">
          <h3>{stats.pending}</h3><p>Pending</p>
        </GlassCard>
        <GlassCard className="stat-card progress">
          <h3>{stats.inProgress}</h3><p>In Progress</p>
        </GlassCard>
        <GlassCard className="stat-card completed">
          <h3>{stats.completed}</h3><p>Completed</p>
        </GlassCard>
        <GlassCard className="stat-card overdue">
          <h3>{stats.overdue}</h3><p>⚠️ Overdue</p>
        </GlassCard>
      </div>

      <div className="section-header">
        <h2>Recent Tasks</h2>
      </div>

      {recentTasks.length === 0 ? (
        <GlassCard><p>No tasks yet. Create a project and add tasks!</p></GlassCard>
      ) : (
        <div className="cards-grid">
          {recentTasks.map(task => (
            <TaskCard key={task._id} task={task} onUpdate={loadData} />
          ))}
        </div>
      )}
    </div>
  );
}