import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Truck, Shield, RefreshCw } from 'lucide-react';
import { getProductBySlug, getReviewsByProductId } from '../data/mockData';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { formatCurrency } from '../utils/formatters';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProductGrid from '../components/products/ProductGrid';
import ProductReviews from '../components/products/ProductReviews';
import { products } from '../data/mockData';

const ProductDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const product = getProductBySlug(slug || '');
    const { addToCart } = useCart();
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

    const [selectedVariant, setSelectedVariant] = useState(product?.variants[0]);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return (
            <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <h2>Product not found</h2>
                <Button onClick={() => navigate('/products')}>Back to Products</Button>
            </div>
        );
    }

    const inWishlist = isInWishlist(product.id);
    const displayPrice = product.salePrice || product.basePrice;
    const hasDiscount = !!product.salePrice;

    const handleAddToCart = () => {
        if (selectedVariant) {
            addToCart(product, selectedVariant, quantity);
            alert('Added to cart!');
        }
    };

    const handleWishlistToggle = () => {
        if (inWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const relatedProducts = products.filter(
        (p) => p.category === product.category && p.id !== product.id
    ).slice(0, 4);

    return (
        <div className="product-detail">
            <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
                {/* Product Main Section */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '4rem' }}>
                    {/* Images */}
                    <div>
                        <div
                            style={{
                                aspectRatio: '1',
                                borderRadius: 'var(--radius-xl)',
                                overflow: 'hidden',
                                marginBottom: '1rem',
                                background: 'var(--color-bg-tertiary)',
                            }}
                        >
                            <img
                                src={product.images[selectedImage]}
                                alt={product.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: 'var(--radius-md)',
                                        border: selectedImage === idx ? '3px solid var(--color-primary)' : '1px solid var(--color-border)',
                                        overflow: 'hidden',
                                        background: 'var(--color-bg-tertiary)',
                                        cursor: 'pointer',
                                        padding: 0,
                                    }}
                                >
                                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div>
                        <div style={{ marginBottom: '1rem' }}>
                            <p style={{ color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem' }}>
                                {product.brand}
                            </p>
                        </div>

                        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{product.name}</h1>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-warning)' }}>
                                <Star size={20} fill="currentColor" />
                                <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>{product.rating}</span>
                                <span style={{ color: 'var(--color-text-tertiary)' }}>({product.reviewCount} reviews)</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <span style={{ fontSize: '2.5rem', fontWeight: 700 }}>{formatCurrency(displayPrice)}</span>
                            {hasDiscount && (
                                <>
                                    <span style={{ fontSize: '1.5rem', color: 'var(--color-text-tertiary)', textDecoration: 'line-through' }}>
                                        {formatCurrency(product.basePrice)}
                                    </span>
                                    <Badge variant="error">-{product.discount}%</Badge>
                                </>
                            )}
                        </div>

                        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
                            {product.description}
                        </p>

                        {/* Size Selection */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h4 style={{ marginBottom: '0.75rem' }}>Select Size</h4>
                            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                {product.variants.map((variant) => (
                                    <button
                                        key={variant.id}
                                        onClick={() => setSelectedVariant(variant)}
                                        style={{
                                            padding: '0.75rem 1.5rem',
                                            border: selectedVariant?.id === variant.id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                                            borderRadius: 'var(--radius-md)',
                                            background: selectedVariant?.id === variant.id ? 'var(--color-primary)' : 'var(--color-surface)',
                                            color: selectedVariant?.id === variant.id ? 'white' : 'var(--color-text)',
                                            cursor: 'pointer',
                                            fontWeight: 600,
                                            transition: 'all var(--transition-fast)',
                                        }}
                                    >
                                        {variant.size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div style={{ marginBottom: '2rem' }}>
                            <h4 style={{ marginBottom: '0.75rem' }}>Quantity</h4>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: 'var(--radius-md)',
                                        background: 'var(--color-surface)',
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                    }}
                                >
                                    -
                                </button>
                                <span style={{ fontSize: '1.25rem', fontWeight: 600, minWidth: '3rem', textAlign: 'center' }}>{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: 'var(--radius-md)',
                                        background: 'var(--color-surface)',
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                    }}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                            <Button variant="primary" size="lg" onClick={handleAddToCart} fullWidth>
                                <ShoppingCart size={20} />
                                Add to Cart
                            </Button>
                            <Button variant="outline" size="lg" onClick={handleWishlistToggle}>
                                <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
                            </Button>
                        </div>

                        {/* Features */}
                        <div className="card" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <Truck size={24} color="var(--color-primary)" />
                                    <div>
                                        <p style={{ fontWeight: 600, margin: 0 }}>Free Shipping</p>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0 }}>On orders above ₹2000</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <RefreshCw size={24} color="var(--color-primary)" />
                                    <div>
                                        <p style={{ fontWeight: 600, margin: 0 }}>Easy Returns</p>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0 }}>30-day return policy</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <Shield size={24} color="var(--color-primary)" />
                                    <div>
                                        <p style={{ fontWeight: 600, margin: 0 }}>Secure Payment</p>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0 }}>100% secure transactions</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div style={{ marginBottom: '4rem' }}>
                    <ProductReviews
                        reviews={getReviewsByProductId(product.id)}
                        rating={product.rating}
                        reviewCount={product.reviewCount}
                    />
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div>
                        <h2 style={{ marginBottom: '2rem' }}>You May Also Like</h2>
                        <ProductGrid products={relatedProducts} />
                    </div>
                )}
            </div>

            <style>{`
        @media (max-width: 768px) {
          .product-detail [style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </div>
    );
};

export default ProductDetail;
