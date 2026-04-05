import React from 'react';
import { useNavigate } from 'react-router-dom';

function Orders() {
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
                    <h2>My Orders</h2>
                    <p>View your property orders and transactions here.</p>
                    <div className="alert alert-info">
                        <strong>Coming Soon:</strong> This feature will display your order history, transaction details, and property purchases.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Orders;