import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8081/RealStatePro/api/user/login', {
                username: formData.username,
                password: formData.password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Store user data
            if (response.data.username && response.data.userId && response.data.token && response.data.role) {
                const userData = {
                    username: response.data.username,
                    userId: response.data.userId,
                    token: response.data.token,
                    role: response.data.role
                };
                localStorage.setItem('user', JSON.stringify(userData));

                // Role-based redirection
                switch (response.data.role.toUpperCase()) {
                    case 'ADMIN':
                        navigate('/admin/dashboard');
                        break;
                    case 'AGENT':
                        navigate('/agent/listings');
                        break;
                    case 'CLIENT':
                        navigate('/dashboard');
                        break;
                    default:
                        navigate('/dashboard');
                }
            } else {
                setError('Invalid response from server. Please try again.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials and try again.');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                {/* Left Side - Image */}
                <div className="login-image">
                    <div className="image-overlay">
                        <div className="image-content">
                            <h1>Welcome Back</h1>
                            <p>Sign in to access your account and continue your real estate journey</p>
                            <div className="image-features">
                                <div className="feature-item">
                                    <span className="feature-icon">🏠</span>
                                    <span>Find Your Dream Home</span>
                                </div>
                                <div className="feature-item">
                                    <span className="feature-icon">📊</span>
                                    <span>Track Your Investments</span>
                                </div>
                                <div className="feature-item">
                                    <span className="feature-icon">🤝</span>
                                    <span>Connect with Agents</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="login-form-container">
                    <div className="login-form-wrapper">
                        <div className="login-header">
                            <h2>Sign In</h2>
                            <p>Enter your credentials to access your account</p>
                        </div>

                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your username"
                                    className="form-control"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your password"
                                    className="form-control"
                                />
                            </div>

                            <div className="form-options">
                                <div className="remember-me">
                                    <input type="checkbox" id="remember" />
                                    <label htmlFor="remember">Remember me</label>
                                </div>
                                <Link to="/forgot-password" className="forgot-password">
                                    Forgot Password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary login-btn"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </form>

                        <div className="login-footer">
                            <p>Don't have an account?
                                <Link to="/register" className="register-link"> Sign up here</Link>
                            </p>
                        </div>

                        <div className="divider">
                            <span>or</span>
                        </div>

                        <div className="social-login">
                            <button className="btn btn-outline-secondary social-btn">
                                <span className="social-icon">🌐</span>
                                Continue with Google
                            </button>
                            <button className="btn btn-outline-secondary social-btn">
                                <span className="social-icon">📘</span>
                                Continue with Facebook
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
