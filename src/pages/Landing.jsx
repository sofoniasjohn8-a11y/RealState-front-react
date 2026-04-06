import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Landing.css';

function Landing() {
    const navigate = useNavigate();
    const [licenseNumber, setLicenseNumber] = useState('');
    const [showLicenseInput, setShowLicenseInput] = useState(false);

    const handleRoleSelect = (role) => {
        if (role === 'AGENT') {
            setShowLicenseInput(true);
        } else {
            setShowLicenseInput(false);
            navigate('/register', { state: { selectedRole: role } });
        }
    };

    const handleLicenseSubmit = () => {
        if (licenseNumber.trim()) {
            navigate('/register', {
                state: {
                    selectedRole: 'AGENT',
                    licenseNumber: licenseNumber.trim()
                }
            });
        }
    };

    const handleBackToRoles = () => {
        setShowLicenseInput(false);
        setLicenseNumber('');
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
                        <a href="#about" className="nav-link">About Us</a>
                        <a href="#contact" className="nav-link">Contact</a>
                    </div>

                    {/* Right: Action Buttons */}
                    <div className="navbar-nav">
                        <button
                            className="btn btn-outline-light me-2"
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-overlay">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="hero-content">
                                    <h1 className="hero-title">
                                        Find Your Perfect <span className="highlight">Home</span>
                                    </h1>
                                    <p className="hero-subtitle">
                                        Discover amazing properties and connect with trusted real estate professionals
                                        in your area. Whether you're buying, selling, or investing.
                                    </p>
                                    <div className="hero-stats">
                                        <div className="stat-item">
                                            <span className="stat-number">10K+</span>
                                            <span className="stat-label">Properties</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-number">500+</span>
                                            <span className="stat-label">Agents</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-number">50K+</span>
                                            <span className="stat-label">Happy Clients</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Role Selection Section */}
            <section className="role-selection-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="role-selection-card">
                                {!showLicenseInput ? (
                                    <>
                                        <h2 className="role-title">Join Our Community</h2>
                                        <p className="role-subtitle">Choose your role to get started</p>

                                        <div className="role-options">
                                            <div className="role-card client-card" onClick={() => handleRoleSelect('CLIENT')}>
                                                <div className="role-icon">🏠</div>
                                                <h3>I'm Looking for Properties</h3>
                                                <p>Find your dream home, browse listings, and connect with agents</p>
                                                <button className="btn btn-primary role-btn">
                                                    Register as Client
                                                </button>
                                            </div>

                                            <div className="role-card agent-card" onClick={() => handleRoleSelect('AGENT')}>
                                                <div className="role-icon">👨‍💼</div>
                                                <h3>I'm a Real Estate Agent</h3>
                                                <p>List properties, manage clients, and grow your business</p>
                                                <button className="btn btn-success role-btn">
                                                    Register as Agent
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="license-verification">
                                            <h2 className="role-title">Agent Verification</h2>
                                            <p className="role-subtitle">Please enter your real estate license number</p>

                                            <div className="license-input-container">
                                                <div className="form-group">
                                                    <label htmlFor="licenseNumber">License Number</label>
                                                    <input
                                                        type="text"
                                                        id="licenseNumber"
                                                        value={licenseNumber}
                                                        onChange={(e) => setLicenseNumber(e.target.value)}
                                                        placeholder="Enter your license number"
                                                        className="form-control license-input"
                                                        required
                                                    />
                                                    <small className="form-text text-muted">
                                                        Your license will be verified by our organization
                                                    </small>
                                                </div>

                                                <div className="license-buttons">
                                                    <button
                                                        className="btn btn-outline-secondary me-2"
                                                        onClick={handleBackToRoles}
                                                    >
                                                        Back
                                                    </button>
                                                    <button
                                                        className="btn btn-success"
                                                        onClick={handleLicenseSubmit}
                                                        disabled={!licenseNumber.trim()}
                                                    >
                                                        Continue Registration
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="login-prompt">
                                    <p>Already have an account?
                                        <button
                                            className="btn btn-link login-link"
                                            onClick={() => navigate('/login')}
                                        >
                                            Sign In
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <div className="row text-center mb-5">
                        <div className="col-12">
                            <h2 className="section-title">Why Choose RealEstate Pro?</h2>
                            <p className="section-subtitle">We make real estate simple, transparent, and rewarding</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="feature-card">
                                <div className="feature-icon">🔍</div>
                                <h4>Smart Search</h4>
                                <p>Find properties that match your exact criteria with our advanced search filters</p>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="feature-card">
                                <div className="feature-icon">🤝</div>
                                <h4>Verified Agents</h4>
                                <p>Connect with licensed and verified real estate professionals</p>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="feature-card">
                                <div className="feature-icon">📊</div>
                                <h4>Market Insights</h4>
                                <p>Get real-time market data and property valuation reports</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h5>🏠 RealEstate Pro</h5>
                            <p>Your trusted partner in real estate</p>
                        </div>
                        <div className="col-md-4">
                            <h5>Quick Links</h5>
                            <ul className="footer-links">
                                <li><a href="#properties">Browse Properties</a></li>
                                <li><a href="#agents">Find Agents</a></li>
                                <li><a href="#about">About Us</a></li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h5>Contact</h5>
                            <p>support@realestatepro.com</p>
                            <p>+1 (555) 123-4567</p>
                        </div>
                    </div>
                    <hr />
                    <div className="text-center">
                        <p>&copy; 2024 RealEstate Pro. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Landing;