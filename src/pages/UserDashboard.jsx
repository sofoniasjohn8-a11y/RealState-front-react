import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserDashboard.css';

function UserDashboard() {
    const navigate = useNavigate();

    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const { username, userId } = userData;

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
        window.location.reload();
    };

    const menuItems = [
        {
            id: 'home',
            title: 'Home',
            description: 'Browse and search properties',
            icon: '🏠',
            path: '/dashboard/home'
        },
        {
            id: 'requests',
            title: 'My Requests Status',
            description: 'View and track your property requests',
            icon: '📋',
            path: '/my-requests'
        },
        {
            id: 'orders',
            title: 'Orders',
            description: 'View your property orders and transactions',
            icon: '🛒',
            path: '/orders'
        },
        {
            id: 'change-password',
            title: 'Change Password',
            description: 'Update your account password',
            icon: '🔒',
            path: '/change-password'
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
                                <h5 className="username">{username || 'User'}</h5>
                                <p className="user-id">ID: {userId || 'N/A'}</p>
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

                        <div className="sidebar-footer">
                            <button
                                className="btn btn-danger logout-btn"
                                onClick={handleLogout}
                            >
                                <span className="logout-icon">🚪</span>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content Area - 8 columns on medium screens and up */}
                <div className="col-md-8 main-content">
                    <div className="content-header">
                        <h2>Welcome to Your Dashboard</h2>
                        <p>Manage your real estate activities and account settings</p>
                    </div>

                    <div className="dashboard-overview">
                        <div className="row">
                            <div className="col-md-6 col-lg-4 mb-4">
                                <div className="stat-card">
                                    <div className="stat-icon">📋</div>
                                    <div className="stat-content">
                                        <h4>Active Requests</h4>
                                        <p className="stat-number">0</p>
                                        <p className="stat-description">Property requests in progress</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-4 mb-4">
                                <div className="stat-card">
                                    <div className="stat-icon">🛒</div>
                                    <div className="stat-content">
                                        <h4>Total Orders</h4>
                                        <p className="stat-number">0</p>
                                        <p className="stat-description">Completed property transactions</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-4 mb-4">
                                <div className="stat-card">
                                    <div className="stat-icon">⭐</div>
                                    <div className="stat-content">
                                        <h4>Account Status</h4>
                                        <p className="stat-status active">Active</p>
                                        <p className="stat-description">Your account is in good standing</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="recent-activity">
                        <h3>Recent Activity</h3>
                        <div className="activity-list">
                            <div className="activity-item">
                                <div className="activity-icon">🔐</div>
                                <div className="activity-content">
                                    <p className="activity-title">Account Login</p>
                                    <p className="activity-time">Just now</p>
                                </div>
                            </div>
                            <div className="activity-item empty">
                                <div className="activity-content">
                                    <p className="activity-title">No recent property activities</p>
                                    <p className="activity-description">Start by browsing properties or making a request</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;