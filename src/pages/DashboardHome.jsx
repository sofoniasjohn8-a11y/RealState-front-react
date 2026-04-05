import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function DashboardHome() {
    const navigate = useNavigate();
    const [searchType, setSearchType] = useState('buy');
    const [searchLocation, setSearchLocation] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        // Navigate to properties page with search parameters
        navigate(`/properties?type=${searchType}&location=${searchLocation}`);
    };

    return (
        <div className="landing-page">
            {/* Navigation Bar */}
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container-fluid px-4">
                    {/* Left: Company Logo */}
                    <div className="navbar-brand">
                        <h1 className="logo-text">🏠 RealEstate Pro</h1>
                    </div>

                    {/* Center: Navigation Menu */}
                    <div className="navbar-nav mx-auto d-none d-lg-flex">
                        <a href="#home" className="nav-link active">Home</a>
                        <a href="#properties" className="nav-link">Properties</a>
                        <a href="#build-custom" className="nav-link">Build Custom</a>
                        <a href="#about" className="nav-link">About Us</a>
                    </div>

                    {/* Right: Action Buttons */}
                    <div className="navbar-nav">
                        <button
                            className="btn btn-outline-light me-2"
                            onClick={() => navigate('/dashboard')}
                        >
                            Dashboard
                        </button>
                        <button
                            className="btn btn-warning"
                            onClick={() => navigate('/list-property')}
                        >
                            List Your Property
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 text-center">
                                <h1 className="hero-title">
                                    Find Your Dream Home Today
                                </h1>
                                <p className="hero-subtitle">
                                    Discover the perfect property from our extensive collection of homes, apartments, and commercial spaces.
                                </p>

                                {/* Search Bar */}
                                <div className="search-container">
                                    <form onSubmit={handleSearch} className="search-form">
                                        <div className="search-tabs">
                                            <button
                                                type="button"
                                                className={`search-tab ${searchType === 'buy' ? 'active' : ''}`}
                                                onClick={() => setSearchType('buy')}
                                            >
                                                Buy
                                            </button>
                                            <button
                                                type="button"
                                                className={`search-tab ${searchType === 'rent' ? 'active' : ''}`}
                                                onClick={() => setSearchType('rent')}
                                            >
                                                Rent
                                            </button>
                                        </div>

                                        <div className="search-input-group">
                                            <input
                                                type="text"
                                                className="search-input"
                                                placeholder="Enter location, city, or neighborhood"
                                                value={searchLocation}
                                                onChange={(e) => setSearchLocation(e.target.value)}
                                            />
                                            <button type="submit" className="search-button">
                                                🔍 Search
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section py-5">
                <div className="container">
                    <div className="row text-center mb-5">
                        <div className="col-12">
                            <h2 className="section-title">Why Choose RealEstate Pro?</h2>
                            <p className="section-subtitle">We make finding your perfect home simple and stress-free</p>
                        </div>
                    </div>

                    <div className="row g-4">
                        <div className="col-md-6 col-lg-3">
                            <div className="feature-card">
                                <div className="feature-icon">🏠</div>
                                <h4>Wide Selection</h4>
                                <p>Thousands of properties across all price ranges and locations</p>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="feature-card">
                                <div className="feature-icon">💰</div>
                                <h4>Best Prices</h4>
                                <p>Competitive pricing with transparent market data</p>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="feature-card">
                                <div className="feature-icon">🤝</div>
                                <h4>Expert Agents</h4>
                                <p>Professional real estate agents to guide you through every step</p>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="feature-card">
                                <div className="feature-icon">🛡️</div>
                                <h4>Secure & Safe</h4>
                                <p>Your data and transactions are fully protected</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h2>Ready to Find Your Perfect Home?</h2>
                            <p>Join thousands of satisfied customers who found their dream homes with us</p>
                            <div className="cta-buttons">
                                <button
                                    className="btn btn-primary btn-lg me-3"
                                    onClick={() => navigate('/properties')}
                                >
                                    Browse Properties
                                </button>
                                <button
                                    className="btn btn-outline-light btn-lg"
                                    onClick={() => navigate('/register')}
                                >
                                    Get Started Free
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default DashboardHome;
