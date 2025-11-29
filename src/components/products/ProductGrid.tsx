import React from 'react';
import { Product } from '../../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
    products: Product[];
    columns?: 2 | 3 | 4;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, columns = 4 }) => {
    if (products.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>
                    No products found.
                </p>
            </div>
        );
    }

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(${columns === 2 ? '300px' : columns === 3 ? '280px' : '260px'}, 1fr))`,
        gap: '1.5rem',
        marginBottom: '2rem',
    };

    return (
        <div style={gridStyle}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductGrid;
