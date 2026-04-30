import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="glass navbar">
      <h2>{user?.name}</h2>
      <div className="user-info">
        <span className={`role-badge ${user?.role === 'Admin' ? 'admin' : ''}`}>
          {user?.role}
        </span>
        <button className="btn btn-small" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}