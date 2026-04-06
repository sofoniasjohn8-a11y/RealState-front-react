import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE, buildAuthHeaders } from '../utils/api';

function ManageAgents() {
    const { user } = useAuth();
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [warning, setWarning] = useState('');

    useEffect(() => {
        fetchAgents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchAgents = async () => {
        setLoading(true);
        setError('');
        setWarning('');

        try {
            const response = await fetch(`${API_BASE}/admin/agents`, {
                headers: buildAuthHeaders(user?.token)
            });

            const result = await response.json().catch(() => null);
            if (!response.ok) {
                throw new Error(result?.message || 'Unable to load agents');
            }

            const agentList = Array.isArray(result)
                ? result
                : result?.agents || result?.data || [];

            if (!Array.isArray(result)) {
                setWarning('Received unexpected agents payload shape from API; using fallback data if available.');
            } else {
                setWarning('');
            }

            setAgents(agentList);
        } catch (err) {
            setError(err.message || 'Failed to load agents.');
            setWarning('');
            console.error('Fetch agents error:', err);
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = async (id) => {
        const agent = agents.find((agent) => agent.id === id);
        if (!agent) return;

        const newStatus = agent.status === 'active' ? 'inactive' : 'active';
        setError('');

        try {
            const response = await fetch(`${API_BASE}/admin/agents/${id}/status`, {
                method: 'PUT',
                headers: buildAuthHeaders(user?.token),
                body: JSON.stringify({ status: newStatus })
            });

            const result = await response.json().catch(() => null);
            if (!response.ok) {
                throw new Error(result?.message || 'Unable to update status');
            }

            setAgents((current) => current.map((item) =>
                item.id === id ? { ...item, status: newStatus } : item
            ));
        } catch (err) {
            setError(err.message || 'Status update failed.');
            console.error('Toggle agent status error:', err);
        }
    };

    const deleteAgent = async (id) => {
        if (!window.confirm('Are you sure you want to delete this agent?')) {
            return;
        }

        setError('');
        try {
            const response = await fetch(`${API_BASE}/admin/agents/${id}`, {
                method: 'DELETE',
                headers: buildAuthHeaders(user?.token)
            });

            const result = await response.json().catch(() => null);
            if (!response.ok) {
                throw new Error(result?.message || 'Unable to delete agent');
            }

            setAgents((current) => current.filter((agent) => agent.id !== id));
        } catch (err) {
            setError(err.message || 'Delete failed.');
            console.error('Delete agent error:', err);
        }
    };

    if (loading) return <div>Loading agents...</div>;

    return (
        <div className="card mb-4">
            <div className="card-header">
                <h5>Manage Agents</h5>
            </div>
            <div className="card-body">
                {error && <div className="alert alert-danger">{error}</div>}
                {warning && <div className="alert alert-warning">{warning}</div>}
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>License Number</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agents.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center">No agents found.</td>
                                </tr>
                            ) : (
                                agents.map((agent) => (
                                    <tr key={agent.id}>
                                        <td>{agent.id}</td>
                                        <td>{agent.username}</td>
                                        <td>{agent.email}</td>
                                        <td>{agent.licenseNum}</td>
                                        <td>
                                            <span className={`badge ${agent.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                                                {agent.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className={`btn btn-sm me-2 ${agent.status === 'active' ? 'btn-warning' : 'btn-success'}`}
                                                onClick={() => toggleStatus(agent.id)}
                                            >
                                                {agent.status === 'active' ? 'Deactivate' : 'Activate'}
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => deleteAgent(agent.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ManageAgents;