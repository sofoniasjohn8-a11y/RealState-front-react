import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE, buildAuthHeaders } from '../utils/api';

function Orders() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user?.token) return;
            setLoading(true);
            setError('');

            try {
                const response = await fetch(`${API_BASE}/user/orders`, {
                    headers: buildAuthHeaders(user.token)
                });
                const result = await response.json().catch(() => []);

                if (!response.ok) {
                    throw new Error(result?.message || 'Unable to load orders.');
                }

                setOrders(Array.isArray(result) ? result : []);
            } catch (err) {
                setError(err.message || 'Failed to load orders.');
                console.error('Orders fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
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

                    <h2>My Orders</h2>
                    <p>View your property orders and transactions here.</p>

                    {loading && <div className="alert alert-info">Loading orders...</div>}
                    {error && <div className="alert alert-danger">{error}</div>}

                    {!loading && !error && orders.length === 0 && (
                        <div className="alert alert-warning">
                            No orders found yet. Submit a request or browse properties to get started.
                        </div>
                    )}

                    {!loading && orders.length > 0 && (
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Property</th>
                                        <th>Status</th>
                                        <th>Total</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.id || order.orderId}>
                                            <td>{order.id || order.orderId}</td>
                                            <td>{order.propertyName || order.title || 'N/A'}</td>
                                            <td>{order.status || 'Pending'}</td>
                                            <td>{order.total ? `$${order.total}` : 'N/A'}</td>
                                            <td>{order.orderDate || order.date || 'N/A'}</td>
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

export default Orders;
