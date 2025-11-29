import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFound: React.FC = () => {
    return (
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
            <div>
                <h1 style={{ fontSize: '8rem', fontWeight: 800, background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem' }}>
                    404
                </h1>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Page Not Found</h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem', marginBottom: '2rem', maxWidth: '500px' }}>
                    Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/">
                        <Button variant="primary" size="lg">
                            <Home size={20} />
                            Go Home
                        </Button>
                    </Link>
                    <Link to="/products">
                        <Button variant="outline" size="lg">
                            <Search size={20} />
                            Browse Products
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
