import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('authToken');

    return (
        <div className="home-container">
            <nav className="navbar">
                <div className="navbar-content">
                    <div className="logo">
                        <h1>🏠 Real Estate</h1>
                    </div>
                    <div className="nav-links">
                        {isAuthenticated ? (
                            <>
                                <button onClick={() => navigate('/properties')} className="nav-button">
                                    Browse Properties
                                </button>
                                <button onClick={() => {
                                    localStorage.removeItem('authToken');
                                    localStorage.removeItem('user');
                                    navigate('/');
                                    window.location.reload();
                                }} className="nav-button logout">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => navigate('/login')} className="nav-button">
                                    Login
                                </button>
                                <button onClick={() => navigate('/register')} className="nav-button primary">
                                    Sign Up
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <section className="hero">
                <div className="hero-content">
                    <h2>Find Your Dream Home</h2>
                    <p>Discover the perfect property with our real estate platform</p>
                    {!isAuthenticated && (
                        <div className="hero-buttons">
                            <button onClick={() => navigate('/login')} className="btn btn-primary">
                                Get Started
                            </button>
                            <button onClick={() => navigate('/register')} className="btn btn-secondary">
                                Create Account
                            </button>
                        </div>
                    )}
                    {isAuthenticated && (
                        <button onClick={() => navigate('/properties')} className="btn btn-primary">
                            Browse Properties
                        </button>
                    )}
                </div>
            </section>

            <section className="features">
                <h3>Why Choose Us</h3>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🔍</div>
                        <h4>Easy Search</h4>
                        <p>Find properties with advanced filters and smart search</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">💰</div>
                        <h4>Best Prices</h4>
                        <p>Competitive pricing with transparent information</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🛡️</div>
                        <h4>Secure</h4>
                        <p>Your data is protected with top security standards</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🤝</div>
                        <h4>Expert Support</h4>
                        <p>24/7 customer support to help you find your home</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
