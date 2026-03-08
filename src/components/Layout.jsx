import { Outlet, NavLink, useNavigate, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { LayoutDashboard, BookOpen, Map, MessageSquare, LogOut, User } from 'lucide-react';
import './Layout.css';

const Layout = () => {
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();

    // Protect routes
    if (!user && !localStorage.getItem('eduai_user')) {
        // Use a slight delay or a direct render trick: 
        // We'll return an immediate navigation component instead of trying to navigate during render
        return <Navigate to="/login" replace />;
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="layout-container">
            {/* Sidebar Navigation */}
            <aside className="sidebar glass-panel">
                <div className="sidebar-header">
                    <div className="logo">
                        <span className="logo-icon">🧠</span>
                        <h2>EduAI</h2>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink to="/assessment" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                        <BookOpen size={20} />
                        <span>Assessment</span>
                    </NavLink>

                    <NavLink to="/path" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                        <Map size={20} />
                        <span>Learning Path</span>
                    </NavLink>

                    <NavLink to="/assistant" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                        <MessageSquare size={20} />
                        <span>AI Assistant</span>
                    </NavLink>

                    <NavLink to="/profile" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                        <User size={20} />
                        <span>Student Profile</span>
                    </NavLink>
                </nav>

                <div className="sidebar-footer">
                    {user && (
                        <div className="user-profile" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>
                            <div className="avatar">{user.name.charAt(0)}</div>
                            <div className="user-info">
                                <p className="user-name">{user.name}</p>
                                <p className="user-score">Score: {user.skillScore}</p>
                            </div>
                        </div>
                    )}
                    <button className="logout-btn" onClick={handleLogout}>
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="main-content">
                <header className="top-header">
                    <h1>Welcome back, {user ? user.name.split(' ')[0] : 'Student'}!</h1>
                    <div className="header-actions">
                        <button className="notification-btn glass-panel">🔔</button>
                    </div>
                </header>

                <div className="content-area animate-fade-in">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
