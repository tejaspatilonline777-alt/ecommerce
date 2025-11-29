import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { products } from '../data/mockData';
import ProductGrid from '../components/products/ProductGrid';
import Button from '../components/ui/Button';

const Products: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [minRating, setMinRating] = useState<number>(0);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
    const [sortBy, setSortBy] = useState('popularity');

    // Get category from URL params
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');

    const filteredProducts = useMemo(() => {
        let filtered = [...products];

        // Filter by search query
        if (searchParam) {
            const query = searchParam.toLowerCase();
            filtered = filtered.filter(
                (p) =>
                    p.name.toLowerCase().includes(query) ||
                    p.brand.toLowerCase().includes(query) ||
                    p.category.toLowerCase().includes(query)
            );
        }

        // Filter by category from URL
        if (categoryParam) {
            filtered = filtered.filter((p) => p.category === categoryParam);
        }

        // Filter by selected categories
        if (selectedCategories.length > 0) {
            filtered = filtered.filter((p) => selectedCategories.includes(p.category));
        }

        // Filter by selected brands
        if (selectedBrands.length > 0) {
            filtered = filtered.filter((p) => selectedBrands.includes(p.brand));
        }

        // Filter by selected sizes
        if (selectedSizes.length > 0) {
            filtered = filtered.filter((p) =>
                p.variants.some((v) => selectedSizes.includes(v.size))
            );
        }

        // Filter by selected colors
        if (selectedColors.length > 0) {
            filtered = filtered.filter((p) =>
                p.variants.some((v) => selectedColors.includes(v.color))
            );
        }

        // Filter by rating
        if (minRating > 0) {
            filtered = filtered.filter((p) => p.rating >= minRating);
        }

        // Filter by price range
        filtered = filtered.filter((p) => {
            const price = p.salePrice || p.basePrice;
            return price >= priceRange[0] && price <= priceRange[1];
        });

        // Sort
        switch (sortBy) {
            case 'price-asc':
                filtered.sort((a, b) => (a.salePrice || a.basePrice) - (b.salePrice || b.basePrice));
                break;
            case 'price-desc':
                filtered.sort((a, b) => (b.salePrice || b.basePrice) - (a.salePrice || a.basePrice));
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
                break;
            case 'bestsellers':
                filtered.sort((a, b) => (b.isBestseller === a.isBestseller ? 0 : b.isBestseller ? 1 : -1));
                break;
            default: // popularity
                // Assuming default order is popularity or we could sort by reviewCount
                filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        }

        return filtered;
    }, [categoryParam, searchParam, selectedCategories, selectedBrands, selectedSizes, selectedColors, minRating, priceRange, sortBy]);

    const toggleCategory = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        );
    };

    const toggleBrand = (brand: string) => {
        setSelectedBrands((prev) =>
            prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
        );
    };

    const toggleSize = (size: string) => {
        setSelectedSizes((prev) =>
            prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
        );
    };

    const toggleColor = (color: string) => {
        setSelectedColors((prev) =>
            prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
        );
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setSelectedBrands([]);
        setSelectedSizes([]);
        setSelectedColors([]);
        setMinRating(0);
        setPriceRange([0, 20000]);
    };

    // Extract unique values for filters
    const allCategories = Array.from(new Set(products.map((p) => p.category)));
    const allBrands = Array.from(new Set(products.map((p) => p.brand)));
    const allSizes = Array.from(new Set(products.flatMap((p) => p.variants.map((v) => v.size)))).sort();
    const allColors = Array.from(new Set(products.flatMap((p) => p.variants.map((v) => v.color)))).sort();

    return (
        <div className="products-page">
            <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
                <div className="products-page__header">
                    <div>
                        <h1>
                            {searchParam ? `Search Results for "${searchParam}"` : categoryParam || 'All Products'}
                        </h1>
                        <p style={{ color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
                            {filteredProducts.length} products found
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="form-select"
                            style={{ width: 'auto', minWidth: '200px' }}
                        >
                            <option value="popularity">Most Popular</option>
                            <option value="bestsellers">Best Sellers</option>
                            <option value="newest">Newest First</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                        </select>
                        <Button
                            variant="outline"
                            onClick={() => setShowFilters(!showFilters)}
                            className="mobile-filter-btn"
                        >
                            <SlidersHorizontal size={20} />
                            Filters
                        </Button>
                    </div>
                </div>

                <div className="products-page__content" style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
                    {/* Filters Sidebar */}
                    <aside
                        className={`filters-sidebar ${showFilters ? 'filters-sidebar--open' : ''}`}
                        style={{
                            width: '280px',
                            flexShrink: 0,
                        }}
                    >
                        <div className="card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h3 style={{ margin: 0 }}>Filters</h3>
                                <button
                                    onClick={() => setShowFilters(false)}
                                    className="mobile-filter-close"
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: 'var(--color-text)',
                                    }}
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {(selectedCategories.length > 0 || selectedBrands.length > 0 || selectedSizes.length > 0 || selectedColors.length > 0 || minRating > 0) && (
                                <Button variant="ghost" size="sm" onClick={clearFilters} fullWidth>
                                    Clear All Filters
                                </Button>
                            )}

                            {/* Category Filter */}
                            <div style={{ marginTop: '1.5rem' }}>
                                <h4 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Category</h4>
                                {allCategories.map((category) => (
                                    <label
                                        key={category}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            marginBottom: '0.75rem',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(category)}
                                            onChange={() => toggleCategory(category)}
                                            className="form-checkbox"
                                        />
                                        {category}
                                    </label>
                                ))}
                            </div>

                            {/* Brand Filter */}
                            <div style={{ marginTop: '1.5rem' }}>
                                <h4 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Brand</h4>
                                {allBrands.map((brand) => (
                                    <label
                                        key={brand}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            marginBottom: '0.75rem',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedBrands.includes(brand)}
                                            onChange={() => toggleBrand(brand)}
                                            className="form-checkbox"
                                        />
                                        {brand}
                                    </label>
                                ))}
                            </div>

                            {/* Size Filter */}
                            <div style={{ marginTop: '1.5rem' }}>
                                <h4 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Size</h4>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {allSizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => toggleSize(size)}
                                            style={{
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: 'var(--radius-sm)',
                                                border: selectedSizes.includes(size) ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                                                background: selectedSizes.includes(size) ? 'var(--color-primary)' : 'transparent',
                                                color: selectedSizes.includes(size) ? 'white' : 'var(--color-text)',
                                                cursor: 'pointer',
                                                fontSize: '0.875rem',
                                            }}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Color Filter */}
                            <div style={{ marginTop: '1.5rem' }}>
                                <h4 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Color</h4>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {allColors.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => toggleColor(color)}
                                            style={{
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: 'var(--radius-sm)',
                                                border: selectedColors.includes(color) ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                                                background: selectedColors.includes(color) ? 'var(--color-primary)' : 'transparent',
                                                color: selectedColors.includes(color) ? 'white' : 'var(--color-text)',
                                                cursor: 'pointer',
                                                fontSize: '0.875rem',
                                            }}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Rating Filter */}
                            <div style={{ marginTop: '1.5rem' }}>
                                <h4 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Rating</h4>
                                {[4, 3, 2, 1].map((rating) => (
                                    <label
                                        key={rating}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            marginBottom: '0.75rem',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <input
                                            type="radio"
                                            name="rating"
                                            checked={minRating === rating}
                                            onChange={() => setMinRating(rating)}
                                            className="form-radio"
                                        />
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                            {rating}+ Stars
                                        </span>
                                    </label>
                                ))}
                            </div>

                            {/* Price Range */}
                            <div style={{ marginTop: '1.5rem' }}>
                                <h4 style={{ fontSize: '1rem', marginBottom: '1rem' }}>
                                    Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                                </h4>
                                <input
                                    type="range"
                                    min="0"
                                    max="20000"
                                    step="500"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                    style={{ width: '100%' }}
                                />
                            </div>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <div style={{ flex: 1 }}>
                        <ProductGrid products={filteredProducts} />
                    </div>
                </div>
            </div>

            <style>{`
        .products-page__header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .filters-sidebar {
          position: sticky;
          top: 100px;
          height: fit-content;
          max-height: calc(100vh - 120px);
          overflow-y: auto;
        }

        .mobile-filter-btn,
        .mobile-filter-close {
          display: none;
        }

        @media (max-width: 1024px) {
          .mobile-filter-btn {
            display: inline-flex;
          }

          .filters-sidebar {
            position: fixed;
            top: 0;
            left: -100%;
            height: 100vh;
            max-height: 100vh;
            width: 320px;
            max-width: 90vw;
            background: var(--color-surface);
            z-index: var(--z-modal);
            padding: 2rem;
            transition: left var(--transition-slow);
            box-shadow: var(--shadow-2xl);
          }

          .filters-sidebar--open {
            left: 0;
          }

          .mobile-filter-close {
            display: block;
          }
        }
      `}</style>
        </div>
    );
};

export default Products;
