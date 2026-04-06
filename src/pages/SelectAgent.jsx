import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE, buildAuthHeaders } from '../utils/api';

function SelectAgent() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAgents = async () => {
            if (!user?.token) return;
            setLoading(true);
            setError('');

            try {
                const response = await fetch(`${API_BASE}/agents`, {
                    headers: buildAuthHeaders(user?.token)
                });
                const result = await response.json().catch(() => []);

                if (!response.ok) {
                    throw new Error(result?.message || 'Unable to load agents.');
                }

                setAgents(Array.isArray(result) ? result : []);
            } catch (err) {
                setError(err.message || 'Failed to load agents.');
                console.error('Agent fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAgents();
    }, [user?.token]);

    const handleAgentClick = (agentId) => {
        navigate(`/agent/${agentId}`);
    };

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

                    <h2>Select Your Agent</h2>
                    <p>Choose an agent to assist with your property needs. Click on a card to view details.</p>

                    {loading && <div className="alert alert-info">Loading agents...</div>}
                    {error && <div className="alert alert-danger">{error}</div>}

                    {!loading && !error && agents.length === 0 && (
                        <div className="alert alert-warning">
                            No agents available at the moment. Please check back later.
                        </div>
                    )}

                    {!loading && agents.length > 0 && (
                        <div className="row">
                            {agents.map((agent) => (
                                <div key={agent.id} className="col-md-6 col-lg-4 mb-4">
                                    <div
                                        className="card h-100 agent-card"
                                        onClick={() => handleAgentClick(agent.id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="card-body">
                                            <div className="text-center mb-3">
                                                <div className="agent-avatar">
                                                    <span className="avatar-icon">👤</span>
                                                </div>
                                            </div>
                                            <h5 className="card-title">{agent.username || agent.name || 'Agent'}</h5>
                                            <p className="card-text">
                                                <strong>Email:</strong> {agent.email || 'N/A'}<br />
                                                <strong>License:</strong> {agent.licenseNum || 'N/A'}<br />
                                                <strong>Status:</strong> {agent.status || 'Active'}<br />
                                                <strong>Experience:</strong> {agent.experience || 'N/A'} years
                                            </p>
                                            <p className="card-text text-muted">
                                                {agent.bio || 'Professional real estate agent ready to help you find your dream property.'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SelectAgent;