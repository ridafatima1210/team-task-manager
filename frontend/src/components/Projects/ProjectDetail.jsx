import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';
import GlassCard from '../Common/GlassCard';
import TaskCard from '../Tasks/TaskCard';
import TaskForm from '../Tasks/TaskForm';

export default function ProjectDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    try {
      const [p, t] = await Promise.all([
        api.get(`/projects/${id}`),
        api.get(`/tasks?project=${id}`)
      ]);
      setProject(p.data);
      setTasks(t.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { load(); }, [id]);

  if (!project) return <p>Loading project...</p>;

  return (
    <div>
      <GlassCard style={{ marginBottom: 20 }}>
        <h1>{project.name}</h1>
        <p style={{ margin: '10px 0', opacity: 0.9 }}>{project.description}</p>
        <div className="meta">
          <span className="badge">👤 Owner: {project.createdBy?.name}</span>
          <span className="badge">👥 {project.members?.length} members</span>
        </div>
        {project.members?.length > 0 && (
          <div style={{ marginTop: 10 }}>
            <strong>Team: </strong>
            {project.members.map(m => m.name).join(', ')}
          </div>
        )}
      </GlassCard>

      <div className="section-header">
        <h2>Tasks ({tasks.length})</h2>
        {user?.role === 'Admin' && (
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            + Add Task
          </button>
        )}
      </div>

      {tasks.length === 0 ? (
        <GlassCard><p>No tasks yet for this project.</p></GlassCard>
      ) : (
        <div className="cards-grid">
          {tasks.map(t => <TaskCard key={t._id} task={t} onUpdate={load} />)}
        </div>
      )}

      {showForm && (
        <TaskForm projectId={id} members={project.members}
          onClose={() => setShowForm(false)} onSaved={load} />
      )}
    </div>
  );
}