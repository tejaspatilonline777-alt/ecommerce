import React, { ReactNode } from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    glass?: boolean;
    hover?: boolean;
}

const Card: React.FC<CardProps> = ({
    children,
    className = '',
    glass = false,
    hover = false,
    ...props
}) => {
    const classes = [
        'card',
        glass && 'card-glass',
        hover && 'card-hover',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={classes} {...props}>
            {children}
        </div>
    );
};

export default Card;
