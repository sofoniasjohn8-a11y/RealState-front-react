import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE, buildAuthHeaders } from '../utils/api';

function ManageCustomers() {
    const { user } = useAuth();
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [warning, setWarning] = useState('');

    useEffect(() => {
        fetchCustomers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchCustomers = async () => {
        setLoading(true);
        setError('');
        setWarning('');

        try {
            const response = await fetch(`${API_BASE}/admin/customers`, {
                headers: buildAuthHeaders(user?.token)
            });

            const result = await response.json().catch(() => null);
            if (!response.ok) {
                throw new Error(result?.message || 'Unable to load customers');
            }

            const customerList = Array.isArray(result)
                ? result
                : result?.customers || result?.data || [];

            if (!Array.isArray(result)) {
                setWarning('Received unexpected customers payload shape from API; using fallback data if available.');
            } else {
                setWarning('');
            }

            setCustomers(customerList);
        } catch (err) {
            setError(err.message || 'Failed to load customers.');
            setWarning('');
            console.error('Fetch customers error:', err);
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = async (id) => {
        const customer = customers.find((item) => item.id === id);
        if (!customer) return;

        const newStatus = customer.status === 'active' ? 'inactive' : 'active';
        setError('');

        try {
            const response = await fetch(`${API_BASE}/admin/customers/${id}/status`, {
                method: 'PUT',
                headers: buildAuthHeaders(user?.token),
                body: JSON.stringify({ status: newStatus })
            });

            const result = await response.json().catch(() => null);
            if (!response.ok) {
                throw new Error(result?.message || 'Unable to update customer status');
            }

            setCustomers((current) => current.map((item) =>
                item.id === id ? { ...item, status: newStatus } : item
            ));
        } catch (err) {
            setError(err.message || 'Status update failed.');
            console.error('Toggle customer status error:', err);
        }
    };

    const deleteCustomer = async (id) => {
        if (!window.confirm('Are you sure you want to delete this customer?')) {
            return;
        }

        setError('');
        try {
            const response = await fetch(`${API_BASE}/admin/customers/${id}`, {
                method: 'DELETE',
                headers: buildAuthHeaders(user?.token)
            });

            const result = await response.json().catch(() => null);
            if (!response.ok) {
                throw new Error(result?.message || 'Unable to delete customer');
            }

            setCustomers((current) => current.filter((item) => item.id !== id));
        } catch (err) {
            setError(err.message || 'Delete failed.');
            console.error('Delete customer error:', err);
        }
    };

    if (loading) return <div>Loading customers...</div>;

    return (
        <div className="card mb-4">
            <div className="card-header">
                <h5>Manage Customers</h5>
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
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center">No customers found.</td>
                                </tr>
                            ) : (
                                customers.map((customer) => (
                                    <tr key={customer.id}>
                                        <td>{customer.id}</td>
                                        <td>{customer.username}</td>
                                        <td>{customer.email}</td>
                                        <td>
                                            <span className={`badge ${customer.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                                                {customer.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className={`btn btn-sm me-2 ${customer.status === 'active' ? 'btn-warning' : 'btn-success'}`}
                                                onClick={() => toggleStatus(customer.id)}
                                            >
                                                {customer.status === 'active' ? 'Deactivate' : 'Activate'}
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => deleteCustomer(customer.id)}
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

export default ManageCustomers;