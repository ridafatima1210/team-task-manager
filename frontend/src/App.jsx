import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import ProjectList from './components/Projects/ProjectList';
import ProjectDetail from './components/Projects/ProjectDetail';
import TaskList from './components/Tasks/TaskList';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import ForgotPassword from "./components/Auth/ForgotPassword";
import './styles/App.css';

const ProtectedLayout = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ padding: 40 }}>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
      <Route path="/projects" element={<ProtectedLayout><ProjectList /></ProtectedLayout>} />
      <Route path="/projects/:id" element={<ProtectedLayout><ProjectDetail /></ProtectedLayout>} />
      <Route path="/tasks" element={<ProtectedLayout><TaskList /></ProtectedLayout>} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

