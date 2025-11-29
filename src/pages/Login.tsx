import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirectTo = searchParams.get('redirect') || '/';
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(email, password);
            navigate(redirectTo === 'checkout' ? '/checkout' : '/');
        } catch (err) {
            setError('Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page" style={{ padding: '4rem 0', background: 'var(--color-bg-tertiary)' }}>
            <div className="container-narrow">
                <Card style={{ maxWidth: '480px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome Back</h1>
                        <p style={{ color: 'var(--color-text-secondary)' }}>Login to your account</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div style={{ padding: '1rem', background: 'var(--color-error)', color: 'white', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                                {error}
                            </div>
                        )}

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
                                    placeholder="Enter your password"
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

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input type="checkbox" className="form-checkbox" />
                                <span style={{ fontSize: '0.875rem' }}>Remember me</span>
                            </label>
                            <Link to="/forgot-password" style={{ fontSize: '0.875rem' }}>
                                Forgot password?
                            </Link>
                        </div>

                        <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isLoading}>
                            Login
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
                            Don't have an account?{' '}
                            <Link to="/register" style={{ fontWeight: 600 }}>
                                Sign up
                            </Link>
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Login;
