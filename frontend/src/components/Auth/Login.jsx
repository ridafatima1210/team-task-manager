import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import GlassCard from '../Common/GlassCard';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-content">

        {/* LEFT SIDE TEXT */}
        <div className="app-title">
          <h1>Team Task Manager</h1>
          <p>Manage your projects, tasks, and team efficiently</p>
        </div>

        {/* RIGHT SIDE LOGIN */}
        <GlassCard className="auth-box glass-effect">

          <h1 className="welcome-text">WELCOME</h1>
          <div className="divider"></div>

          {error && <div className="alert">{error}</div>}

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <input
                type="email"
                placeholder="Username"
                required
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="glass-input"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="********"
                required
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className="glass-input"
              />
            </div>

            <div className="options-row">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <Link to="/forgot-password" className="forgot">
  Forgot Password?
</Link>
            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'LOGIN'}
            </button>
          </form>

          <p className="auth-footer">
            No account? <Link to="/signup">Sign up</Link>
          </p>

        </GlassCard>

      </div>
    </div>
  );
}