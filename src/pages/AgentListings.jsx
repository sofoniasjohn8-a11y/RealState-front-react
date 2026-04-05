import React from 'react';
import { useNavigate } from 'react-router-dom';

function AgentListings() {
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
                        <h1>Agent Listings</h1>
                        <button className="btn btn-danger" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Welcome, Agent {userData.username}!</h5>
                            <p className="card-text">Manage your property listings and client interactions.</p>
                            <div className="alert alert-info">
                                <strong>Agent Dashboard Coming Soon:</strong> This will include property listings management, client communications, appointment scheduling, and sales analytics.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AgentListings;