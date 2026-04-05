import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1>Admin Dashboard</h1>
                        <button className="btn btn-danger" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Welcome, {userData.username}!</h5>
                            <p className="card-text">You have admin privileges.</p>
                            <div className="alert alert-info">
                                <strong>Admin Dashboard Coming Soon:</strong> This will include user management, property approvals, analytics, and system administration tools.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;