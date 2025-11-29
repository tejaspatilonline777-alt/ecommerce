import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import ProductGrid from '../components/products/ProductGrid';
import Button from '../components/ui/Button';

const Wishlist: React.FC = () => {
    const { items } = useWishlist();

    if (items.length === 0) {
        return (
            <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <Heart size={64} style={{ margin: '0 auto 1.5rem', color: 'var(--color-text-tertiary)' }} />
                <h2 style={{ marginBottom: '1rem' }}>Your wishlist is empty</h2>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
                    Save your favorite items to buy them later
                </p>
                <Link to="/products">
                    <Button variant="primary" size="lg">
                        Discover Products
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="wishlist-page">
            <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
                <h1 style={{ marginBottom: '2rem' }}>My Wishlist ({items.length} items)</h1>
                <ProductGrid products={items} />
            </div>
        </div>
    );
};

export default Wishlist;
