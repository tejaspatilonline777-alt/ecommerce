import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { products } from '../../data/mockData';
import { Product } from '../../types';
import './SearchBar.css';

const SearchBar: React.FC = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Product[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (query.trim().length > 1) {
            const filtered = products.filter(p =>
                p.name.toLowerCase().includes(query.toLowerCase()) ||
                p.brand.toLowerCase().includes(query.toLowerCase()) ||
                p.category.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 5);
            setSuggestions(filtered);
            setIsOpen(true);
        } else {
            setSuggestions([]);
            setIsOpen(false);
        }
    }, [query]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/products?search=${encodeURIComponent(query)}`);
            setIsOpen(false);
            setQuery('');
        }
    };

    const handleProductClick = (slug: string) => {
        navigate(`/products/${slug}`);
        setIsOpen(false);
        setQuery('');
    };

    return (
        <div className="search-bar" ref={wrapperRef}>
            <form onSubmit={handleSubmit} className="search-bar__form">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for products..."
                    className="search-bar__input"
                />
                {query && (
                    <button
                        type="button"
                        className="search-bar__clear"
                        onClick={() => {
                            setQuery('');
                            setIsOpen(false);
                        }}
                    >
                        <X size={16} />
                    </button>
                )}
                <button type="submit" className="search-bar__submit">
                    <Search size={20} />
                </button>
            </form>

            {isOpen && suggestions.length > 0 && (
                <div className="search-bar__suggestions">
                    {suggestions.map((product) => (
                        <div
                            key={product.id}
                            className="search-bar__suggestion-item"
                            onClick={() => handleProductClick(product.slug)}
                        >
                            <img src={product.images[0]} alt={product.name} />
                            <div>
                                <p className="search-bar__product-name">{product.name}</p>
                                <p className="search-bar__product-brand">{product.brand}</p>
                            </div>
                        </div>
                    ))}
                    <div
                        className="search-bar__view-all"
                        onClick={handleSubmit}
                    >
                        View all results for "{query}"
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
