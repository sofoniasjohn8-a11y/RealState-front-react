import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE, buildAuthHeaders } from '../utils/api';

function MyRequests() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRequests = async () => {
            if (!user?.token) return;
            setLoading(true);
            setError('');

            try {
                const response = await fetch(`${API_BASE}/user/requests`, {
                    headers: buildAuthHeaders(user.token)
                });
                const result = await response.json().catch(() => []);

                if (!response.ok) {
                    throw new Error(result?.message || 'Unable to load requests.');
                }

                setRequests(Array.isArray(result) ? result : []);
            } catch (err) {
                setError(err.message || 'Failed to load requests.');
                console.error('Requests fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [user?.token]);

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

                    {loading && <div className="alert alert-info">Loading requests...</div>}
                    {error && <div className="alert alert-danger">{error}</div>}

                    {!loading && !error && requests.length === 0 && (
                        <div className="alert alert-warning">
                            No requests found yet. Submit a custom request to get started.
                        </div>
                    )}

                    {!loading && requests.length > 0 && (
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Request ID</th>
                                        <th>Title</th>
                                        <th>Status</th>
                                        <th>Submitted</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.map((request) => (
                                        <tr key={request.id || request.requestId}>
                                            <td>{request.id || request.requestId}</td>
                                            <td>{request.title || request.description || 'N/A'}</td>
                                            <td>{request.status || 'Pending'}</td>
                                            <td>{request.submittedAt || request.date || 'N/A'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyRequests;
