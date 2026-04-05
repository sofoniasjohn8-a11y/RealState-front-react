import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/Auth.css';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'CLIENT', // Default role
        licenseNumber: '' // For agents
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Set role and license from navigation state if coming from landing page
    useEffect(() => {
        if (location.state?.selectedRole) {
            setFormData(prev => ({
                ...prev,
                role: location.state.selectedRole,
                licenseNumber: location.state.licenseNumber || ''
            }));
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.username.trim()) {
            setError('Username is required');
            return false;
        }
        if (!formData.email.trim()) {
            setError('Email is required');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError('Please enter a valid email');
            return false;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Prepare registration data
            const registrationData = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                role: formData.role
            };

            // Add license number for agents
            if (formData.role === 'AGENT') {
                registrationData.licenseNumber = formData.licenseNumber;
            }

            await axios.post('http://localhost:8081/RealStatePro/register', registrationData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setSuccess('Registration successful! Redirecting to login...');
            
            setFormData({
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            });

            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
            console.error('Registration error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Create Account</h2>
                <p className="auth-subtitle">Join our Real Estate Community</p>
                
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="username">User Name</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            placeholder="Enter username"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
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
                            placeholder="At least 6 characters"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            placeholder="Confirm your password"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="role">I want to register as:</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="form-control"
                            required
                        >
                            <option value="CLIENT">Client - Looking for Properties</option>
                            <option value="AGENT">Agent - Listing Properties</option>
                        </select>
                    </div>

                    {formData.role === 'AGENT' && (
                        <div className="form-group">
                            <label htmlFor="licenseNumber">Real Estate License Number</label>
                            <input
                                type="text"
                                id="licenseNumber"
                                name="licenseNumber"
                                value={formData.licenseNumber}
                                onChange={handleChange}
                                required
                                placeholder="Enter your license number"
                                className="form-control"
                            />
                            <small className="form-text text-muted">
                                Your license will be verified by our organization
                            </small>
                        </div>
                    )}

                    <div className="terms">
                        <input type="checkbox" id="terms" required />
                        <label htmlFor="terms">I agree to the Terms & Conditions</label>
                    </div>

                    <button 
                        type="submit" 
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Already have an account? <Link to="/login" className="link-button">Sign In</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Register;