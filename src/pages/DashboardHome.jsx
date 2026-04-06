import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { buildAuthHeaders } from '../utils/api';

function DashboardHome() {
    const { user } = useAuth();
    const [dashboardStats, setDashboardStats] = useState({
        activeRequests: 0,
        totalOrders: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                setLoading(true);
                const headers = buildAuthHeaders();

                // Fetch active requests
                const requestsResponse = await fetch('http://localhost:8081/RealStatePro/api/requests/user', {
                    headers
                });
                const requests = requestsResponse.ok ? await requestsResponse.json() : [];
                const activeRequests = requests.filter(req => req.status !== 'COMPLETED').length;

                // Fetch orders
                const ordersResponse = await fetch('http://localhost:8081/RealStatePro/api/orders/user', {
                    headers
                });
                const orders = ordersResponse.ok ? await ordersResponse.json() : [];
                const totalOrders = orders.length;

                setDashboardStats({
                    activeRequests,
                    totalOrders
                });
            } catch (err) {
                console.error('Error fetching dashboard stats:', err);
                setError('Failed to load dashboard statistics');
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchDashboardStats();
        }
    }, [user]);

    return (
        <>
            <div className="content-header">
                <h2>Welcome to Your Dashboard</h2>
                <p>Manage your real estate activities and account settings</p>
            </div>

            {loading && <div className="alert alert-info">Loading dashboard...</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {!loading && !error && (
                <div className="dashboard-overview">
                    <div className="row">
                        <div className="col-md-6 col-lg-4 mb-4">
                            <div className="stat-card">
                                <div className="stat-icon">📋</div>
                                <div className="stat-content">
                                    <h4>Active Requests</h4>
                                    <p className="stat-number">{dashboardStats.activeRequests}</p>
                                    <p className="stat-description">Property requests in progress</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4 mb-4">
                            <div className="stat-card">
                                <div className="stat-icon">🛒</div>
                                <div className="stat-content">
                                    <h4>Total Orders</h4>
                                    <p className="stat-number">{dashboardStats.totalOrders}</p>
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
            )}

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
        </>
    );
}

export default DashboardHome;
