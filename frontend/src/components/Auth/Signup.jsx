import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import GlassCard from '../Common/GlassCard';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'Member' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await signup(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Signup failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-container">
      <GlassCard className="auth-box">
        <h1>CREATE ACCOUNT</h1>
        {error && <div className="alert">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" required
              value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" required
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Password (min 6 chars)</label>
            <input type="password" placeholder="••••••" required minLength={6}
              value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option value="Member">Member</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Creating...' : 'Sign Up'}
          </button>
        </form>
        <p className="auth-footer">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </GlassCard>
    </div>
  );
}