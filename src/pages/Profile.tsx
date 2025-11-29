import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, ShoppingBag, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        navigate('/login');
        return null;
    }

    return (
        <div className="profile-page">
            <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
                <h1 style={{ marginBottom: '2rem' }}>My Account</h1>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                    <div>
                        <Card>
                            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                                <div style={{ width: '100px', height: '100px', margin: '0 auto 1rem', borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2.5rem', fontWeight: 700 }}>
                                    {user?.name.charAt(0).toUpperCase()}
                                </div>
                                <h3>{user?.name}</h3>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>{user?.email}</p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <Button variant="ghost" fullWidth onClick={() => { }}>
                                    <User size={20} /> Profile
                                </Button>
                                <Button variant="ghost" fullWidth onClick={() => navigate('/orders')}>
                                    <ShoppingBag size={20} /> Orders
                                </Button>
                                <Button variant="ghost" fullWidth onClick={() => navigate('/wishlist')}>
                                    <Heart size={20} /> Wishlist
                                </Button>
                                <Button variant="ghost" fullWidth onClick={() => { }}>
                                    <MapPin size={20} /> Addresses
                                </Button>
                            </div>
                        </Card>
                    </div>

                    <div>
                        <Card>
                            <h3 style={{ marginBottom: '1.5rem' }}>Personal Information</h3>
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input type="text" className="form-input" defaultValue={user?.name} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-input" defaultValue={user?.email} disabled />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone</label>
                                <input type="tel" className="form-input" placeholder="+91 98765 43210" />
                            </div>
                            <Button variant="primary">Save Changes</Button>
                        </Card>
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .profile-page [style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </div>
    );
};

export default Profile;
