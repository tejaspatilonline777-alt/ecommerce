import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Sparkles, ShoppingBag } from 'lucide-react';
import { getFeaturedProducts, getNewProducts, categories } from '../data/mockData';
import ProductGrid from '../components/products/ProductGrid';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import './Home.css';

const Home: React.FC = () => {
    const featuredProducts = getFeaturedProducts().slice(0, 4);
    const newProducts = getNewProducts().slice(0, 4);

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero__bg">
                    <img src="/images/hero_banner_1764411021711.png" alt="Hero banner" />
                    <div className="hero__overlay" />
                </div>
                <div className="container">
                    <div className="hero__content">
                        <h1 className="hero__title animate-slideUp">
                            Discover Your <br />
                            <span className="hero__title-gradient">Perfect Style</span>
                        </h1>
                        <p className="hero__subtitle animate-slideUp">
                            Explore our premium collection of fashion, footwear, and accessories
                        </p>
                        <div className="hero__actions animate-slideUp">
                            <Link to="/products">
                                <Button variant="primary" size="lg">
                                    Shop Now <ArrowRight size={20} />
                                </Button>
                            </Link>
                            <Link to="/products?new=true">
                                <Button variant="outline" size="lg">
                                    New Arrivals
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Shop by Category</h2>
                        <p className="section-subtitle">Discover our curated collections</p>
                    </div>
                    <div className="categories__grid">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                to={`/products?category=${category.name}`}
                                className="category-card"
                            >
                                <div className="category-card__image">
                                    <img src={category.image} alt={category.name} />
                                </div>
                                <div className="category-card__content">
                                    <h3>{category.name}</h3>
                                    <p>{category.description}</p>
                                    <span className="category-card__link">
                                        Explore <ArrowRight size={16} />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="featured-products">
                <div className="container">
                    <div className="section-header">
                        <div>
                            <h2 className="section-title">
                                <Sparkles className="section-icon" />
                                Featured Products
                            </h2>
                            <p className="section-subtitle">Handpicked favorites for you</p>
                        </div>
                        <Link to="/products?featured=true">
                            <Button variant="outline">
                                View All <ArrowRight size={18} />
                            </Button>
                        </Link>
                    </div>
                    <ProductGrid products={featuredProducts} columns={4} />
                </div>
            </section>

            {/* New Arrivals */}
            <section className="new-arrivals">
                <div className="container">
                    <div className="section-header">
                        <div>
                            <h2 className="section-title">
                                <TrendingUp className="section-icon" />
                                New Arrivals
                            </h2>
                            <p className="section-subtitle">Just landed: Fresh styles</p>
                        </div>
                        <Link to="/products?new=true">
                            <Button variant="outline">
                                View All <ArrowRight size={18} />
                            </Button>
                        </Link>
                    </div>
                    <ProductGrid products={newProducts} columns={4} />
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <div className="container">
                    <div className="features__grid">
                        <Card className="feature-card" glass>
                            <div className="feature-card__icon">
                                <ShoppingBag size={32} />
                            </div>
                            <h3 className="feature-card__title">Free Shipping</h3>
                            <p className="feature-card__description">
                                On all orders above ₹2000
                            </p>
                        </Card>
                        <Card className="feature-card" glass>
                            <div className="feature-card__icon">
                                <Sparkles size={32} />
                            </div>
                            <h3 className="feature-card__title">Premium Quality</h3>
                            <p className="feature-card__description">
                                Handpicked products from top brands
                            </p>
                        </Card>
                        <Card className="feature-card" glass>
                            <div className="feature-card__icon">
                                <TrendingUp size={32} />
                            </div>
                            <h3 className="feature-card__title">Easy Returns</h3>
                            <p className="feature-card__description">
                                30-day hassle-free returns
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <div className="container">
                    <Card className="cta__card" glass>
                        <div className="cta__content">
                            <h2>Get 20% Off Your First Order</h2>
                            <p>Sign up to receive exclusive offers and updates</p>
                            <Link to="/register">
                                <Button variant="primary" size="lg">
                                    Sign Up Now
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default Home;
