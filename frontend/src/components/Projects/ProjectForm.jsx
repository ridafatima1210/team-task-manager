import { useEffect, useState } from 'react';
import api from '../../utils/api';
import GlassCard from '../Common/GlassCard';

export default function ProjectForm({ onClose, onSaved, initial }) {
  const [form, setForm] = useState(initial || { name: '', description: '', members: [] });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/auth/users').then(r => setUsers(r.data)).catch(() => {});
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (initial?._id) await api.put(`/projects/${initial._id}`, form);
      else await api.post('/projects', form);
      onSaved();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving');
    }
  };

  const toggleMember = (id) => {
    setForm(f => ({
      ...f,
      members: f.members.includes(id)
        ? f.members.filter(m => m !== id)
        : [...f.members, id]
    }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <GlassCard className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{initial ? 'Edit' : 'New'} Project</h2>
        {error && <div className="alert">{error}</div>}
        <form onSubmit={submit}>
          <div className="form-group">
            <label>Name</label>
            <input required value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea rows="3" value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Team Members</label>
            <div style={{ maxHeight: 150, overflowY: 'auto', padding: 8,
              background: 'rgba(255,255,255,0.1)', borderRadius: 10 }}>
              {users.map(u => (
                <label key={u._id} style={{ display: 'flex', gap: 8, padding: 4, cursor: 'pointer' }}>
                  <input type="checkbox"
                    checked={form.members.includes(u._id)}
                    onChange={() => toggleMember(u._id)} />
                  {u.name} ({u.role})
                </label>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}