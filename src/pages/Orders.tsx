import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Truck, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { formatCurrency } from '../utils/formatters';

const Orders: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        navigate('/login');
        return null;
    }

    // Mock orders data
    const orders = [
        {
            id: 'ORD-001',
            date: '2024-11-25',
            status: 'delivered',
            total: 6499,
            items: 2,
        },
        {
            id: 'ORD-002',
            date: '2024-11-28',
            status: 'shipped',
            total: 3999,
            items: 1,
        },
    ];

    const statusConfig = {
        delivered: { label: 'Delivered', variant: 'success' as const, icon: CheckCircle },
        shipped: { label: 'Shipped', variant: 'primary' as const, icon: Truck },
        processing: { label: 'Processing', variant: 'warning' as const, icon: Package },
    };

    return (
        <div className="orders-page">
            <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
                <h1 style={{ marginBottom: '2rem' }}>My Orders</h1>

                {orders.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                        <Package size={64} style={{ margin: '0 auto 1.5rem', color: 'var(--color-text-tertiary)' }} />
                        <h2>No orders yet</h2>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Start shopping to see your orders here</p>
                        <Button variant="primary" onClick={() => navigate('/products')}>Browse Products</Button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {orders.map((order) => {
                            const config = statusConfig[order.status as keyof typeof statusConfig];
                            const Icon = config.icon;

                            return (
                                <Card key={order.id}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
                                        <div>
                                            <h3 style={{ marginBottom: '0.5rem' }}>Order {order.id}</h3>
                                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                                                Placed on {order.date}
                                            </p>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <Badge variant={config.variant} size="sm">
                                                    <Icon size={14} />
                                                    {config.label}
                                                </Badge>
                                                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                                    {order.items} {order.items === 1 ? 'item' : 'items'}
                                                </span>
                                            </div>
                                        </div>

                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                                                Total
                                            </p>
                                            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                                                {formatCurrency(order.total)}
                                            </p>
                                            <Button variant="outline" size="sm" style={{ marginTop: '1rem' }}>
                                                View Details
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
