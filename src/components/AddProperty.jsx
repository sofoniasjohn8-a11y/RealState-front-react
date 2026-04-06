import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE, buildAuthHeaders } from '../utils/api';

function AddProperty() {
    const { user } = useAuth();
    const [property, setProperty] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        type: '',
        bedrooms: '',
        bathrooms: '',
        area: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setProperty({ ...property, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE}/admin/properties`, {
                method: 'POST',
                headers: buildAuthHeaders(user?.token),
                body: JSON.stringify(property)
            });

            const result = await response.json().catch(() => null);
            if (!response.ok) {
                throw new Error(result?.message || 'Failed to add property');
            }

            setSuccess('Property added successfully!');
            setProperty({
                title: '',
                description: '',
                price: '',
                location: '',
                type: '',
                bedrooms: '',
                bathrooms: '',
                area: ''
            });
        } catch (err) {
            setError(err.message || 'Unable to add property.');
            console.error('Add property error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card mb-4">
            <div className="card-header">
                <h5>Add New Property</h5>
            </div>
            <div className="card-body">
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={property.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Type</label>
                                <select
                                    className="form-control"
                                    name="type"
                                    value={property.type}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Type</option>
                                    <option value="house">House</option>
                                    <option value="apartment">Apartment</option>
                                    <option value="condo">Condo</option>
                                    <option value="townhouse">Townhouse</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            name="description"
                            value={property.description}
                            onChange={handleChange}
                            rows="3"
                            required
                        />
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="price"
                                    value={property.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Location</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="location"
                                    value={property.location}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label className="form-label">Bedrooms</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="bedrooms"
                                    value={property.bedrooms}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label className="form-label">Bathrooms</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="bathrooms"
                                    value={property.bathrooms}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label className="form-label">Area (sq ft)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="area"
                                    value={property.area}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Adding...' : 'Add Property'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddProperty;