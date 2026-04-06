import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE, buildAuthHeaders } from '../utils/api';

function AgentDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();
    const [agent, setAgent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectionMessage, setSelectionMessage] = useState('');

    useEffect(() => {
        const fetchAgent = async () => {
            if (!user?.token || !id) return;
            setLoading(true);
            setError('');

            try {
                const response = await fetch(`${API_BASE}/agents/${id}`, {
                    headers: buildAuthHeaders(user?.token)
                });
                const result = await response.json().catch(() => null);

                if (!response.ok) {
                    throw new Error(result?.message || 'Unable to load agent details.');
                }

                setAgent(result);
            } catch (err) {
                setError(err.message || 'Failed to load agent details.');
                console.error('Agent detail fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAgent();
    }, [user?.token, id]);

    const handleSelectAgent = async () => {
        setSelectionMessage('');

        try {
            const response = await fetch(`${API_BASE}/user/select-agent`, {
                method: 'POST',
                headers: {
                    ...buildAuthHeaders(user?.token),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ agentId: id })
            });
            const result = await response.json().catch(() => null);

            if (!response.ok) {
                throw new Error(result?.message || 'Unable to select agent.');
            }

            setSelectionMessage(`You have successfully selected ${agent?.username || agent?.name || 'this agent'}.`);
        } catch (err) {
            setSelectionMessage(err.message || 'Failed to select agent.');
            console.error('Agent selection error:', err);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12">
                    <button
                        className="btn btn-secondary mb-3"
                        onClick={() => navigate('/select-agent')}
                    >
                        ← Back to Agent Selection
                    </button>

                    {loading && <div className="alert alert-info">Loading agent details...</div>}
                    {error && <div className="alert alert-danger">{error}</div>}

                    {!loading && !error && agent && (
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4 text-center">
                                        <div className="agent-avatar-large mb-3">
                                            <span className="avatar-icon-large">👤</span>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <h2>{agent.username || agent.name || 'Agent'}</h2>
                                        <p className="text-muted">{agent.email || 'N/A'}</p>
                                        <div className="row mt-3">
                                            <div className="col-sm-6">
                                                <strong>License Number:</strong> {agent.licenseNum || 'N/A'}
                                            </div>
                                            <div className="col-sm-6">
                                                <strong>Status:</strong> {agent.status || 'Active'}
                                            </div>
                                            <div className="col-sm-6">
                                                <strong>Experience:</strong> {agent.experience || 'N/A'} years
                                            </div>
                                            <div className="col-sm-6">
                                                <strong>Phone:</strong> {agent.phone || 'N/A'}
                                            </div>
                                        </div>
                                        <p className="mt-3">{agent.bio || 'Professional real estate agent with extensive experience in helping clients find their perfect property.'}</p>
                                        <button
                                            className="btn btn-primary mt-3"
                                            onClick={handleSelectAgent}
                                        >
                                            Select This Agent
                                        </button>
                                        {selectionMessage && (
                                            <div className="mt-3 alert alert-secondary">{selectionMessage}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AgentDetail;