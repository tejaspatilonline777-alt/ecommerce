import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    fullWidth = false,
    className = '',
    disabled,
    ...props
}) => {
    const classes = [
        'btn',
        `btn--${variant}`,
        `btn--${size}`,
        fullWidth && 'btn--full-width',
        isLoading && 'btn--loading',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button className={classes} disabled={disabled || isLoading} {...props}>
            {isLoading ? (
                <>
                    <span className="btn__spinner"></span>
                    <span className="btn__text">{children}</span>
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
