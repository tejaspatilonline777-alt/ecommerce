import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ShoppingCart,
    Heart,
    User,
    Menu,
    X,
    Sun,
    Moon,
    Globe,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useTheme } from '../../contexts/ThemeContext';
import SearchBar from '../search/SearchBar';
import './Header.css';

const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const { isAuthenticated, logout } = useAuth();
    const { itemCount } = useCart();
    const { items: wishlistItems } = useWishlist();
    const { theme, language, toggleTheme, setLanguage } = useTheme();

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'hi', label: 'हिन्दी' },
        { code: 'mr', label: 'मराठी' },
    ];

    return (
        <header className="header">
            <div className="header__top">
                <div className="container">
                    <div className="header__top-content">
                        <p className="header__promo">Free Shipping on Orders Above ₹2000</p>
                        <div className="header__top-actions">
                            <button
                                className="header__icon-btn"
                                onClick={toggleTheme}
                                aria-label="Toggle theme"
                            >
                                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                            </button>
                            <div className="header__language">
                                <button
                                    className="header__icon-btn"
                                    onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                                    aria-label="Select language"
                                >
                                    <Globe size={18} />
                                </button>
                                {isLanguageOpen && (
                                    <div className="header__language-dropdown">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => {
                                                    setLanguage(lang.code as 'en' | 'hi' | 'mr');
                                                    setIsLanguageOpen(false);
                                                }}
                                                className={language === lang.code ? 'active' : ''}
                                            >
                                                {lang.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="header__main">
                <div className="container">
                    <div className="header__main-content">
                        <Link to="/" className="header__logo">
                            <h1>Aarambh</h1>
                        </Link>

                        <nav className={`header__nav ${isMobileMenuOpen ? 'header__nav--open' : ''}`}>
                            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                                Home
                            </Link>
                            <Link to="/products" onClick={() => setIsMobileMenuOpen(false)}>
                                Shop
                            </Link>
                            <Link to="/products?category=Clothing" onClick={() => setIsMobileMenuOpen(false)}>
                                Clothing
                            </Link>
                            <Link to="/products?category=Shoes" onClick={() => setIsMobileMenuOpen(false)}>
                                Shoes
                            </Link>
                            <Link to="/products?category=Accessories" onClick={() => setIsMobileMenuOpen(false)}>
                                Accessories
                            </Link>
                            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                                Contact
                            </Link>
                        </nav>

                        <div className="header__actions">
                            <div className="header__search-container">
                                <SearchBar />
                            </div>

                            <Link to="/wishlist" className="header__icon-link" aria-label="Wishlist">
                                <Heart size={22} />
                                {wishlistItems.length > 0 && (
                                    <span className="header__badge">{wishlistItems.length}</span>
                                )}
                            </Link>

                            <Link to="/cart" className="header__icon-link" aria-label="Cart">
                                <ShoppingCart size={22} />
                                {itemCount > 0 && <span className="header__badge">{itemCount}</span>}
                            </Link>

                            {isAuthenticated ? (
                                <div className="header__user-menu">
                                    <button className="header__icon-link" aria-label="User menu">
                                        <User size={22} />
                                    </button>
                                    <div className="header__user-dropdown">
                                        <Link to="/profile">My Profile</Link>
                                        <Link to="/orders">My Orders</Link>
                                        <Link to="/wishlist">Wishlist</Link>
                                        <button onClick={logout}>Logout</button>
                                    </div>
                                </div>
                            ) : (
                                <Link to="/login" className="header__icon-link" aria-label="Login">
                                    <User size={22} />
                                </Link>
                            )}

                            <button
                                className="header__mobile-toggle"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
