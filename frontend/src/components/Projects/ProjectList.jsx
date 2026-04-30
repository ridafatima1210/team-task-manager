import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';
import GlassCard from '../Common/GlassCard';
import ProjectForm from './ProjectForm';

export default function ProjectList() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/projects');
      setProjects(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this project and all its tasks?')) return;
    await api.delete(`/projects/${id}`);
    load();
  };

  return (
    <div>
      <div className="section-header">
        <h1>📁 Projects</h1>
        {user?.role === 'Admin' && (
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            + New Project
          </button>
        )}
      </div>

      {loading ? <p>Loading...</p> : projects.length === 0 ? (
        <GlassCard><p>No projects yet.</p></GlassCard>
      ) : (
        <div className="cards-grid">
          {projects.map(p => (
            <GlassCard key={p._id} className="task-card">
              <h4>{p.name}</h4>
              <p style={{ opacity: 0.85, margin: '8px 0' }}>{p.description || 'No description'}</p>
              <div className="meta">
                <span className="badge">👥 {p.members?.length || 0} members</span>
                <span className="badge">👤 {p.createdBy?.name}</span>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <Link to={`/projects/${p._id}`} className="btn btn-small">View</Link>
                {user?.role === 'Admin' && (
                  <button className="btn btn-small btn-danger" onClick={() => handleDelete(p._id)}>
                    Delete
                  </button>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {showForm && <ProjectForm onClose={() => setShowForm(false)} onSaved={load} />}
    </div>
  );
}