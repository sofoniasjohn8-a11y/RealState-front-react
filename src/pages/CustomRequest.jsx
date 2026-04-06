import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE, buildAuthHeaders } from '../utils/api';

function CustomRequest() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        preferredDate: '',
        budget: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        if (!formData.title.trim() || !formData.description.trim()) {
            setError('Please provide a title and description for your request.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/user/requests`, {
                method: 'POST',
                headers: buildAuthHeaders(user?.token),
                body: JSON.stringify({
                    userId: user?.userId,
                    title: formData.title,
                    description: formData.description,
                    preferredDate: formData.preferredDate,
                    budget: formData.budget
                })
            });

            const result = await response.json().catch(() => null);
            if (!response.ok) {
                throw new Error(result?.message || 'Failed to submit request.');
            }

            setSuccess('Your custom request has been submitted successfully.');
            setFormData({
                title: '',
                description: '',
                preferredDate: '',
                budget: ''
            });
        } catch (err) {
            setError(err.message || 'Unable to submit request. Please try again.');
            console.error('Custom request error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <button className="btn btn-secondary mb-4" onClick={() => navigate('/dashboard')}>
                        ← Back to Dashboard
                    </button>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title mb-4">Make Custom Request</h2>
                            {error && <div className="alert alert-danger">{error}</div>}
                            {success && <div className="alert alert-success">{success}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Request Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Briefly describe your request"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="form-control"
                                        rows="4"
                                        placeholder="Explain the property you need, budget, location, or special requirements"
                                        required
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Preferred Date</label>
                                        <input
                                            type="date"
                                            name="preferredDate"
                                            value={formData.preferredDate}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Budget</label>
                                        <input
                                            type="text"
                                            name="budget"
                                            value={formData.budget}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Enter your budget range"
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Submitting...' : 'Submit Request'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomRequest;
