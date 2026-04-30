import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h1 className="taskflow-title">TASK FLOW</h1>      
      <nav>
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/tasks">Tasks</NavLink>
      </nav>
    </aside>
  );
}