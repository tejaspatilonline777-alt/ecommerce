import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { formatCurrency } from '../utils/formatters';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Checkout: React.FC = () => {
    const navigate = useNavigate();
    const { items, total, clearCart } = useCart();
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        navigate('/login?redirect=checkout');
        return null;
    }

    if (items.length === 0) {
        navigate('/cart');
        return null;
    }

    const handlePlaceOrder = () => {
        // Mock order placement
        alert('Order placed successfully! This is a demo.');
        clearCart();
        navigate('/orders');
    };

    return (
        <div className="checkout-page">
            <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
                <h1 style={{ marginBottom: '2rem' }}>Checkout</h1>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                    <div>
                        <Card style={{ marginBottom: '2rem' }}>
                            <h3 style={{ marginBottom: '1.5rem' }}>Shipping Information</h3>
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input type="text" className="form-input" placeholder="John Doe" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone Number</label>
                                <input type="tel" className="form-input" placeholder="+91 98765 43210" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Address</label>
                                <input type="text" className="form-input" placeholder="Street address" />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label className="form-label">City</label>
                                    <input type="text" className="form-input" placeholder="Mumbai" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Pincode</label>
                                    <input type="text" className="form-input" placeholder="400001" />
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <h3 style={{ marginBottom: '1.5rem' }}>Payment Method</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {['Credit/Debit Card', 'UPI', 'Net Banking', 'Cash on Delivery'].map((method) => (
                                    <label key={method} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                                        <input type="radio" name="payment" className="form-radio" />
                                        <span>{method}</span>
                                    </label>
                                ))}
                            </div>
                        </Card>
                    </div>

                    <div>
                        <Card style={{ position: 'sticky', top: '100px' }}>
                            <h3 style={{ marginBottom: '1.5rem' }}>Order Summary</h3>
                            <div style={{ marginBottom: '1.5rem' }}>
                                {items.map((item) => (
                                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
                                        <span>{item.product.name} × {item.quantity}</span>
                                        <span>{formatCurrency((item.product.salePrice || item.product.basePrice) * item.quantity)}</span>
                                    </div>
                                ))}
                            </div>
                            <div style={{ borderTop: '2px solid var(--color-border)', paddingTop: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                                    <span>Total</span>
                                    <span style={{ color: 'var(--color-primary)' }}>{formatCurrency(total)}</span>
                                </div>
                                <Button variant="primary" size="lg" fullWidth onClick={handlePlaceOrder}>
                                    <ShoppingBag size={20} />
                                    Place Order
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 1024px) {
          .checkout-page [style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </div>
    );
};

export default Checkout;
