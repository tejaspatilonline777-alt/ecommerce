import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, Tag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { formatCurrency } from '../utils/formatters';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Cart: React.FC = () => {
    const navigate = useNavigate();
    const { items, removeFromCart, updateQuantity, subtotal, discount, tax, total, promoCode, applyPromoCode, removePromoCode } = useCart();
    const { isAuthenticated } = useAuth();
    const [promoInput, setPromoInput] = useState('');
    const [promoError, setPromoError] = useState('');

    const handlePromoSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = applyPromoCode(promoInput);
        if (isValid) {
            setPromoError('');
            setPromoInput('');
        } else {
            setPromoError('Invalid promo code or minimum order not met');
        }
    };

    const handleCheckout = () => {
        if (isAuthenticated) {
            navigate('/checkout');
        } else {
            navigate('/login?redirect=checkout');
        }
    };

    if (items.length === 0) {
        return (
            <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <ShoppingBag size={64} style={{ margin: '0 auto 1.5rem', color: 'var(--color-text-tertiary)' }} />
                <h2 style={{ marginBottom: '1rem' }}>Your cart is empty</h2>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
                    Add some products to get started
                </p>
                <Link to="/products">
                    <Button variant="primary" size="lg">
                        Continue Shopping
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
                <h1 style={{ marginBottom: '2rem' }}>Shopping Cart ({items.length} items)</h1>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                    {/* Cart Items */}
                    <div>
                        {items.map((item) => (
                            <Card key={item.id} style={{ marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', gap: '1.5rem' }}>
                                    <img
                                        src={item.product.images[0]}
                                        alt={item.product.name}
                                        style={{
                                            width: '120px',
                                            height: '120px',
                                            objectFit: 'cover',
                                            borderRadius: 'var(--radius-md)',
                                            background: 'var(--color-bg-tertiary)',
                                        }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                                            {item.product.name}
                                        </h3>
                                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                                            {item.product.brand}
                                        </p>
                                        <p style={{ color: 'var(--color-text-tertiary)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                                            Size: {item.variant.size} | Color: {item.variant.color}
                                        </p>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                            {/* Quantity Controls */}
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    style={{
                                                        width: '32px',
                                                        height: '32px',
                                                        border: '1px solid var(--color-border)',
                                                        borderRadius: 'var(--radius-sm)',
                                                        background: 'var(--color-surface)',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span style={{ fontWeight: 600, minWidth: '2rem', textAlign: 'center' }}>
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    style={{
                                                        width: '32px',
                                                        height: '32px',
                                                        border: '1px solid var(--color-border)',
                                                        borderRadius: 'var(--radius-sm)',
                                                        background: 'var(--color-surface)',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>

                                            {/* Price */}
                                            <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                                                {formatCurrency((item.product.salePrice || item.product.basePrice) * item.quantity)}
                                            </span>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                style={{
                                                    marginLeft: 'auto',
                                                    background: 'transparent',
                                                    border: 'none',
                                                    color: 'var(--color-error)',
                                                    cursor: 'pointer',
                                                    padding: '0.5rem',
                                                    borderRadius: 'var(--radius-sm)',
                                                    transition: 'background var(--transition-fast)',
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-hover)'}
                                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div>
                        <Card style={{ position: 'sticky', top: '100px' }}>
                            <h3 style={{ marginBottom: '1.5rem' }}>Order Summary</h3>

                            {/* Promo Code */}
                            <form onSubmit={handlePromoSubmit} style={{ marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <input
                                        type="text"
                                        placeholder="Promo code"
                                        value={promoInput}
                                        onChange={(e) => setPromoInput(e.target.value)}
                                        className="form-input"
                                        style={{ flex: 1 }}
                                    />
                                    <Button type="submit" variant="outline">
                                        <Tag size={18} />
                                    </Button>
                                </div>
                                {promoError && (
                                    <p style={{ color: 'var(--color-error)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                                        {promoError}
                                    </p>
                                )}
                                {promoCode && (
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem', padding: '0.5rem', background: 'var(--color-success)', color: 'white', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem' }}>
                                        <span>Code "{promoCode.code}" applied!</span>
                                        <button
                                            onClick={removePromoCode}
                                            style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                )}
                            </form>

                            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                    <span style={{ color: 'var(--color-text-secondary)' }}>Subtotal</span>
                                    <span style={{ fontWeight: 600 }}>{formatCurrency(subtotal)}</span>
                                </div>
                                {discount > 0 && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: 'var(--color-success)' }}>
                                        <span>Discount</span>
                                        <span style={{ fontWeight: 600 }}>-{formatCurrency(discount)}</span>
                                    </div>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                    <span style={{ color: 'var(--color-text-secondary)' }}>Tax (GST 18%)</span>
                                    <span style={{ fontWeight: 600 }}>{formatCurrency(tax)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                    <span style={{ color: 'var(--color-text-secondary)' }}>Shipping</span>
                                    <span style={{ fontWeight: 600, color: 'var(--color-success)' }}>FREE</span>
                                </div>
                            </div>

                            <div style={{ borderTop: '2px solid var(--color-border)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                    <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>Total</span>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                                        {formatCurrency(total)}
                                    </span>
                                </div>

                                <Button variant="primary" size="lg" fullWidth onClick={handleCheckout}>
                                    Proceed to Checkout
                                </Button>
                            </div>

                            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginTop: '1rem', textAlign: 'center' }}>
                                Taxes and shipping calculated at checkout
                            </p>
                        </Card>
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 1024px) {
          .cart-page [style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </div>
    );
};

export default Cart;
