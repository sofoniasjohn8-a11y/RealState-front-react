import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ListProperty() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        bedrooms: '',
        bathrooms: '',
        area: '',
        propertyType: 'house'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        alert('Property listing submitted! (This is a placeholder - backend integration needed)');
        navigate('/');
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1>List Your Property</h1>
                        <button className="btn btn-secondary" onClick={() => navigate('/')}>
                            ← Back to Home
                        </button>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Property Details</h5>

                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="title" className="form-label">Property Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            placeholder="e.g., Beautiful 3BR House"
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="propertyType" className="form-label">Property Type</label>
                                        <select
                                            className="form-control"
                                            id="propertyType"
                                            name="propertyType"
                                            value={formData.propertyType}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="house">House</option>
                                            <option value="apartment">Apartment</option>
                                            <option value="condo">Condo</option>
                                            <option value="townhouse">Townhouse</option>
                                            <option value="land">Land</option>
                                            <option value="commercial">Commercial</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Describe your property..."
                                        required
                                    ></textarea>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="price" className="form-label">Price ($)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="price"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            placeholder="e.g., 250000"
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="location" className="form-label">Location</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="location"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            placeholder="City, State"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="bedrooms" className="form-label">Bedrooms</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="bedrooms"
                                            name="bedrooms"
                                            value={formData.bedrooms}
                                            onChange={handleChange}
                                            min="0"
                                            placeholder="0"
                                        />
                                    </div>

                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="bathrooms" className="form-label">Bathrooms</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="bathrooms"
                                            name="bathrooms"
                                            value={formData.bathrooms}
                                            onChange={handleChange}
                                            min="0"
                                            step="0.5"
                                            placeholder="0"
                                        />
                                    </div>

                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="area" className="form-label">Area (sq ft)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="area"
                                            name="area"
                                            value={formData.area}
                                            onChange={handleChange}
                                            placeholder="e.g., 2000"
                                        />
                                    </div>
                                </div>

                                <div className="alert alert-info mb-4">
                                    <strong>Note:</strong> Image upload functionality will be added in the next update.
                                </div>

                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary btn-lg">
                                        List Property
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListProperty;