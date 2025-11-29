import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    Mail,
    Phone,
    MapPin,
    Send,
} from 'lucide-react';
import Button from '../ui/Button';
import './Footer.css';

const Footer: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle newsletter subscription
        console.log('Newsletter subscription:', email);
        setEmail('');
        alert('Thank you for subscribing!');
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer__main">
                <div className="container">
                    <div className="footer__grid">
                        <div className="footer__section">
                            <h3 className="footer__title">Aarambh</h3>
                            <p className="footer__description">
                                Your destination for premium fashion. Discover the latest trends in clothing,
                                shoes, and accessories.
                            </p>
                            <div className="footer__social">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                    <Facebook size={20} />
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                    <Instagram size={20} />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                    <Twitter size={20} />
                                </a>
                                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                    <Youtube size={20} />
                                </a>
                            </div>
                        </div>

                        <div className="footer__section">
                            <h4 className="footer__heading">Shop</h4>
                            <ul className="footer__links">
                                <li><Link to="/products?category=Clothing">Clothing</Link></li>
                                <li><Link to="/products?category=Shoes">Shoes</Link></li>
                                <li><Link to="/products?category=Accessories">Accessories</Link></li>
                                <li><Link to="/products?new=true">New Arrivals</Link></li>
                                <li><Link to="/products?sale=true">Sale</Link></li>
                            </ul>
                        </div>

                        <div className="footer__section">
                            <h4 className="footer__heading">Customer Service</h4>
                            <ul className="footer__links">
                                <li><Link to="/contact">Contact Us</Link></li>
                                <li><Link to="/faq">FAQ</Link></li>
                                <li><Link to="/shipping">Shipping & Delivery</Link></li>
                                <li><Link to="/returns">Returns & Exchange</Link></li>
                                <li><Link to="/track-order">Track Order</Link></li>
                            </ul>
                        </div>

                        <div className="footer__section">
                            <h4 className="footer__heading">Newsletter</h4>
                            <p className="footer__newsletter-text">
                                Subscribe to get special offers, free giveaways, and exclusive deals.
                            </p>
                            <form className="footer__newsletter" onSubmit={handleNewsletterSubmit}>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="footer__newsletter-input"
                                />
                                <Button type="submit" variant="primary" size="sm">
                                    <Send size={16} />
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer__contact">
                <div className="container">
                    <div className="footer__contact-grid">
                        <div className="footer__contact-item">
                            <Phone size={20} />
                            <div>
                                <p className="footer__contact-label">Call Us</p>
                                <p className="footer__contact-value">+91 98765 43210</p>
                            </div>
                        </div>
                        <div className="footer__contact-item">
                            <Mail size={20} />
                            <div>
                                <p className="footer__contact-label">Email Us</p>
                                <p className="footer__contact-value">support@aarambh.com</p>
                            </div>
                        </div>
                        <div className="footer__contact-item">
                            <MapPin size={20} />
                            <div>
                                <p className="footer__contact-label">Visit Us</p>
                                <p className="footer__contact-value">Mumbai, Maharashtra, India</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer__bottom">
                <div className="container">
                    <div className="footer__bottom-content">
                        <p>&copy; {currentYear} Aarambh. All rights reserved.</p>
                        <div className="footer__legal">
                            <Link to="/privacy">Privacy Policy</Link>
                            <span>•</span>
                            <Link to="/terms">Terms & Conditions</Link>
                            <span>•</span>
                            <Link to="/cookies">Cookie Policy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
