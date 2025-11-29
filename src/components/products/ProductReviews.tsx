import React from 'react';
import { Star, ThumbsUp, CheckCircle, User } from 'lucide-react';
import { Review } from '../../types';
import { formatDate } from '../../utils/formatters';
import Card from '../ui/Card';
import './ProductReviews.css';

interface ProductReviewsProps {
    reviews: Review[];
    rating: number;
    reviewCount: number;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ reviews, rating, reviewCount }) => {
    return (
        <div className="product-reviews">
            <h2 className="product-reviews__title">Ratings & Reviews</h2>

            <div className="product-reviews__summary">
                <div className="product-reviews__rating-box">
                    <div className="product-reviews__rating-number">
                        {rating} <Star size={24} fill="currentColor" />
                    </div>
                    <p className="product-reviews__count">{reviewCount} Verified Reviews</p>
                </div>

                {/* Rating distribution bars could go here */}
            </div>

            <div className="product-reviews__list">
                {reviews.length === 0 ? (
                    <p className="product-reviews__empty">No reviews yet. Be the first to review!</p>
                ) : (
                    reviews.map((review) => (
                        <Card key={review.id} className="review-card">
                            <div className="review-card__header">
                                <div className="review-card__rating">
                                    {review.rating} <Star size={14} fill="currentColor" />
                                </div>
                                <h4 className="review-card__title">{review.title}</h4>
                            </div>

                            <p className="review-card__comment">{review.comment}</p>

                            {review.images && review.images.length > 0 && (
                                <div className="review-card__images">
                                    {review.images.map((img, idx) => (
                                        <img key={idx} src={img} alt="Review attachment" />
                                    ))}
                                </div>
                            )}

                            <div className="review-card__footer">
                                <div className="review-card__user">
                                    <div className="review-card__avatar">
                                        <User size={16} />
                                    </div>
                                    <span>{review.userName}</span>
                                    {review.verified && (
                                        <span className="review-card__verified">
                                            <CheckCircle size={12} /> Verified Buyer
                                        </span>
                                    )}
                                </div>
                                <span className="review-card__date">{formatDate(new Date(review.createdAt))}</span>
                            </div>

                            <div className="review-card__helpful">
                                <ThumbsUp size={14} />
                                <span>Helpful ({review.helpful})</span>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductReviews;
