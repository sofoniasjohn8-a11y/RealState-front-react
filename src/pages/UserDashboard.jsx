import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/UserDashboard.css';

function UserDashboard() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const menuItems = [
        {
            id: 'home',
            title: 'Home',
            description: 'Dashboard overview',
            icon: '🏠',
            path: '/dashboard'
        },
        {
            id: 'select-agent',
            title: 'Select Agent',
            description: 'Choose your agent',
            icon: '👥',
            path: '/dashboard/select-agent'
        },
        {
            id: 'requests',
            title: 'My Requests',
            description: 'Track requests',
            icon: '📋',
            path: '/dashboard/requests'
        },
        {
            id: 'orders',
            title: 'Orders',
            description: 'View transactions',
            icon: '🛒',
            path: '/dashboard/orders'
        },
        {
            id: 'custom-request',
            title: 'Custom Request',
            description: 'New property request',
            icon: '📝',
            path: '/dashboard/custom-request'
        },
        {
            id: 'change-password',
            title: 'Change Password',
            description: 'Update password',
            icon: '🔒',
            path: '/dashboard/change-password'
        }
    ];

    return (
        <div className="dashboard-container">
            {/* Top Navigation Bar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">
                        🏠 Real Estate Dashboard
                    </span>
                    <div className="navbar-nav ms-auto">
                        <button
                            className="nav-link btn btn-link text-white me-3"
                            onClick={() => navigate('/properties')}
                        >
                            Browse Properties
                        </button>
                        <button
                            className="nav-link btn btn-link text-white"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div className="row g-0">
                {/* Sidebar - 4 columns on medium screens and up */}
                <div className="col-md-4 sidebar">
                    <div className="sidebar-content">
                        <div className="user-info">
                            <div className="user-avatar">
                                <span className="avatar-icon">👤</span>
                            </div>
                            <div className="user-details">
                                <h5 className="username">{user?.username || 'User'}</h5>
                                <p className="user-id">ID: {user?.userId || 'N/A'}</p>
                            </div>
                        </div>

                        <nav className="dashboard-nav">
                            <ul className="nav-list">
                                {menuItems.map((item) => (
                                    <li key={item.id} className="nav-item">
                                        <button
                                            className="nav-link"
                                            onClick={() => navigate(item.path)}
                                        >
                                            <span className="nav-icon">{item.icon}</span>
                                            <div className="nav-content">
                                                <span className="nav-title">{item.title}</span>
                                                <span className="nav-description">{item.description}</span>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* <div className="sidebar-footer">
                            <button
                                className="btn btn-danger logout-btn"
                                onClick={handleLogout}
                            >
                                <span className="logout-icon">🚪</span>
                                Logout
                            </button>
                        </div> */}
                    </div>
                </div>

                {/* Main Content Area - 8 columns on medium screens and up */}
                <div className="col-md-8 main-content">
                    <Outlet />
                </div>
            </div>

            <footer className="dashboard-footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <p className="mb-0">© 2026 Real Estate Dashboard. All rights reserved.</p>
                        </div>
                        <div className="col-md-6 text-md-end">
                            <p className="mb-0">
                                Welcome back, {user?.username || 'User'}
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default UserDashboard;