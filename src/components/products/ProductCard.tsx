import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import Badge from '../ui/Badge';
import './ProductCard.css';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const inWishlist = isInWishlist(product.id);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (product.variants.length > 0) {
            addToCart(product, product.variants[0], 1);
        }
    };

    const handleWishlistToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (inWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const displayPrice = product.salePrice || product.basePrice;
    const hasDiscount = !!product.salePrice;

    return (
        <Link to={`/products/${product.slug}`} className="product-card">
            <div className="product-card__image-wrapper">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="product-card__image"
                    loading="lazy"
                />
                <div className="product-card__badges">
                    {product.isNew && <Badge variant="success" size="sm">New</Badge>}
                    {hasDiscount && (
                        <Badge variant="error" size="sm">
                            -{product.discount}%
                        </Badge>
                    )}
                </div>
                <div className="product-card__actions">
                    <button
                        className={`product-card__action-btn ${inWishlist ? 'active' : ''}`}
                        onClick={handleWishlistToggle}
                        aria-label="Add to wishlist"
                    >
                        <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
                    </button>
                    <button
                        className="product-card__action-btn"
                        onClick={handleAddToCart}
                        aria-label="Add to cart"
                    >
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>

            <div className="product-card__content">
                <p className="product-card__brand">{product.brand}</p>
                <h3 className="product-card__title">{product.name}</h3>

                <div className="product-card__rating">
                    <Star size={16} fill="currentColor" />
                    <span>{product.rating}</span>
                    <span className="product-card__reviews">({product.reviewCount})</span>
                </div>

                <div className="product-card__price">
                    <span className="product-card__price-current">{formatCurrency(displayPrice)}</span>
                    {hasDiscount && (
                        <span className="product-card__price-original">
                            {formatCurrency(product.basePrice)}
                        </span>
                    )}
                </div>

                {product.variants[0]?.stock === 0 && (
                    <p className="product-card__stock">Out of Stock</p>
                )}
            </div>
        </Link>
    );
};

export default ProductCard;
