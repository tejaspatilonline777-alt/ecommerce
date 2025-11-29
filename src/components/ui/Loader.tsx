import React from 'react';
import './Loader.css';

interface LoaderProps {
    size?: 'sm' | 'md' | 'lg';
}

export const Spinner: React.FC<LoaderProps> = ({ size = 'md' }) => {
    return <div className={`spinner spinner--${size}`} />;
};

export const SkeletonLoader: React.FC<{ className?: string }> = ({ className = '' }) => {
    return <div className={`skeleton ${className}`} />;
};

export const ProductCardSkeleton: React.FC = () => {
    return (
        <div className="card">
            <div className="skeleton" style={{ height: '300px', marginBottom: '1rem' }} />
            <div className="skeleton skeleton-text" style={{ width: '70%' }} />
            <div className="skeleton skeleton-text" style={{ width: '50%' }} />
            <div className="skeleton skeleton-text" style={{ width: '40%' }} />
        </div>
    );
};

export const PageLoader: React.FC = () => {
    return (
        <div className="page-loader">
            <Spinner size="lg" />
            <p>Loading...</p>
        </div>
    );
};

export default Spinner;
