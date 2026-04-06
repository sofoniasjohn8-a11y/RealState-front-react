import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AddProperty from '../components/AddProperty';
import ManageAgents from '../components/ManageAgents';
import ManageCustomers from '../components/ManageCustomers';
import ChangeLicenseNum from '../components/ChangeLicenseNum';
import AdminChangePassword from '../components/AdminChangePassword';

function AdminDashboard() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'add-property':
                return <AddProperty />;
            case 'manage-agents':
                return <ManageAgents />;
            case 'manage-customers':
                return <ManageCustomers />;
            case 'change-license':
                return <ChangeLicenseNum />;
            case 'change-password':
                return <AdminChangePassword />;
            default:
                return (
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Welcome, {user?.username}!</h5>
                            <p className="card-text">You have admin privileges.</p>
                            <div className="alert alert-info">
                                <strong>Admin Dashboard:</strong> Use the tabs above to manage properties, agents, customers, and your account settings.
                            </div>
                        </div>
                    </div>
                );
        }
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

                    <div className="row">
                        {/* Left Column - Navigation */}
                        <div className="col-md-4">
                            <div className="card mb-4">
                                <div className="card-header">
                                    <h5 className="card-title mb-0">Admin Functions</h5>
                                </div>
                                <div className="card-body">
                                    <div className="d-grid gap-2">
                                        <button
                                            className={`btn ${activeTab === 'overview' ? 'btn-primary' : 'btn-outline-primary'} d-flex align-items-center`}
                                            onClick={() => setActiveTab('overview')}
                                        >
                                            <span className="me-2">📊</span>
                                            Overview
                                        </button>
                                        <button
                                            className={`btn ${activeTab === 'add-property' ? 'btn-primary' : 'btn-outline-primary'} d-flex align-items-center`}
                                            onClick={() => setActiveTab('add-property')}
                                        >
                                            <span className="me-2">🏠</span>
                                            Add Property
                                        </button>
                                        <button
                                            className={`btn ${activeTab === 'manage-agents' ? 'btn-primary' : 'btn-outline-primary'} d-flex align-items-center`}
                                            onClick={() => setActiveTab('manage-agents')}
                                        >
                                            <span className="me-2">👥</span>
                                            Manage Agents
                                        </button>
                                        <button
                                            className={`btn ${activeTab === 'manage-customers' ? 'btn-primary' : 'btn-outline-primary'} d-flex align-items-center`}
                                            onClick={() => setActiveTab('manage-customers')}
                                        >
                                            <span className="me-2">👤</span>
                                            Manage Customers
                                        </button>
                                        <button
                                            className={`btn ${activeTab === 'change-license' ? 'btn-primary' : 'btn-outline-primary'} d-flex align-items-center`}
                                            onClick={() => setActiveTab('change-license')}
                                        >
                                            <span className="me-2">📋</span>
                                            Change License
                                        </button>
                                        <button
                                            className={`btn ${activeTab === 'change-password' ? 'btn-primary' : 'btn-outline-primary'} d-flex align-items-center`}
                                            onClick={() => setActiveTab('change-password')}
                                        >
                                            <span className="me-2">🔒</span>
                                            Change Password
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Content */}
                        <div className="col-md-8">
                            <div className="content-area">
                                {renderTabContent()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;