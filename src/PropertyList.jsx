import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/PropertyList.css';

function PropertyList() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login');
            return;
        }

        fetchProperties();
    }, [navigate]);

    const fetchProperties = async () => {
        try {
            setLoading(true);
            // Replace with your actual Servlet URL
            const response = await axios.get('http://localhost:8080/RealEstateBackend/properties', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            setProperties(response.data);
            setError('');
        } catch (err) {
            setError('Failed to load properties. Please try again later.');
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        navigate('/');
        window.location.reload();
    };

    return (
        <div className="property-container">
            <nav className="property-navbar">
                <div className="navbar-content">
                    <h1 className="navbar-title">🏠 Real Estate</h1>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </nav>

            <div className="property-content">
                <div className="property-header">
                    <h2>Available Properties</h2>
                    <button onClick={fetchProperties} className="refresh-btn">🔄 Refresh</button>
                </div>

                {error && <div className="error-banner">{error}</div>}

                {loading && <div className="loading">Loading properties...</div>}

                {!loading && properties.length === 0 && !error && (
                    <div className="empty-state">
                        <p>No properties available at the moment.</p>
                    </div>
                )}

                <div className="properties-grid">
                    {properties.map((property) => (
                        <div key={property.id} className="property-card">
                            <div className="property-image">
                                {property.image ? (
                                    <img src={property.image} alt={property.title} />
                                ) : (
                                    <div className="placeholder-image">🏠</div>
                                )}
                            </div>
                            <div className="property-info">
                                <h3>{property.title || 'Property'}</h3>
                                <p className="property-description">{property.description}</p>
                                <div className="property-details">
                                    <span>📍 {property.location}</span>
                                    <span>🛏️ {property.bedrooms} bed</span>
                                    <span>🚿 {property.bathrooms} bath</span>
                                </div>
                                <div className="property-price">${property.price?.toLocaleString() || 'N/A'}</div>
                                <button className="view-btn">View Details</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PropertyList;