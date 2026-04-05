import React from 'react';
import { useNavigate } from 'react-router-dom';

function MyRequests() {
    const navigate = useNavigate();

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12">
                    <button
                        className="btn btn-secondary mb-3"
                        onClick={() => navigate('/dashboard')}
                    >
                        ← Back to Dashboard
                    </button>
                    <h2>My Requests Status</h2>
                    <p>View and track your property requests here.</p>
                    <div className="alert alert-info">
                        <strong>Coming Soon:</strong> This feature will display your property request status, pending approvals, and request history.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyRequests;