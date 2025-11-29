import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';

interface WishlistContextType {
    items: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
    clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};

interface WishlistProviderProps {
    children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
    const [items, setItems] = useState<Product[]>([]);

    // Load wishlist from localStorage
    useEffect(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
            setItems(JSON.parse(savedWishlist));
        }
    }, []);

    // Save wishlist to localStorage
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(items));
    }, [items]);

    const addToWishlist = (product: Product) => {
        setItems((currentItems) => {
            // Check if already in wishlist
            if (currentItems.some((item) => item.id === product.id)) {
                return currentItems;
            }
            return [...currentItems, product];
        });
    };

    const removeFromWishlist = (productId: string) => {
        setItems((currentItems) => currentItems.filter((item) => item.id !== productId));
    };

    const isInWishlist = (productId: string): boolean => {
        return items.some((item) => item.id === productId);
    };

    const clearWishlist = () => {
        setItems([]);
    };

    const value = {
        items,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
    };

    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};
