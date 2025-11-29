import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        setIsLoading(true);

        try {
            await register(name, email, password);
            navigate('/');
        } catch (err) {
            setError('Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="register-page" style={{ padding: '4rem 0', background: 'var(--color-bg-tertiary)' }}>
            <div className="container-narrow">
                <Card style={{ maxWidth: '480px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Create Account</h1>
                        <p style={{ color: 'var(--color-text-secondary)' }}>Sign up to start shopping</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div style={{ padding: '1rem', background: 'var(--color-error)', color: 'white', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                                {error}
                            </div>
                        )}

                        <div className="form-group">
                            <label className="form-label">
                                <User size={18} style={{ marginRight: '0.5rem' }} />
                                Full Name
                            </label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                <Mail size={18} style={{ marginRight: '0.5rem' }} />
                                Email Address
                            </label>
                            <input
                                type="email"
                                className="form-input"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                <Lock size={18} style={{ marginRight: '0.5rem' }} />
                                Password
                            </label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-input"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: 'var(--color-text-tertiary)',
                                    }}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                <Lock size={18} style={{ marginRight: '0.5rem' }} />
                                Confirm Password
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="form-input"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer' }}>
                                <input type="checkbox" className="form-checkbox" required />
                                <span style={{ fontSize: '0.875rem', lineHeight: 1.5 }}>
                                    I agree to the <Link to="/terms">Terms & Conditions</Link> and{' '}
                                    <Link to="/privacy">Privacy Policy</Link>
                                </span>
                            </label>
                        </div>

                        <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isLoading}>
                            Create Account
                        </Button>
                    </form>

                    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>Or continue with</p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Button variant="outline" fullWidth>Google</Button>
                            <Button variant="outline" fullWidth>Facebook</Button>
                        </div>
                    </div>

                    <div style={{ marginTop: '2rem', textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
                        <p style={{ color: 'var(--color-text-secondary)' }}>
                            Already have an account?{' '}
                            <Link to="/login" style={{ fontWeight: 600 }}>
                                Login
                            </Link>
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Register;
