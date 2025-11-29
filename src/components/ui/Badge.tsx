import React, { ReactNode } from 'react';

interface BadgeProps {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
    size?: 'sm' | 'md';
    className?: string;
}

const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
}) => {
    const baseStyles = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        borderRadius: 'var(--radius-full)',
        whiteSpace: 'nowrap' as const,
    };

    const sizeStyles = {
        sm: {
            padding: '0.25rem 0.5rem',
            fontSize: '0.75rem',
        },
        md: {
            padding: '0.375rem 0.75rem',
            fontSize: '0.875rem',
        },
    };

    const variantStyles = {
        primary: {
            background: 'var(--color-primary)',
            color: 'white',
        },
        secondary: {
            background: 'var(--color-secondary)',
            color: 'white',
        },
        success: {
            background: 'var(--color-success)',
            color: 'white',
        },
        warning: {
            background: 'var(--color-warning)',
            color: 'white',
        },
        error: {
            background: 'var(--color-error)',
            color: 'white',
        },
    };

    const styles = {
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant],
    };

    return (
        <span className={className} style={styles}>
            {children}
        </span>
    );
};

export default Badge;
