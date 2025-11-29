import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, ProductVariant, PromoCode } from '../types';
import { validatePromoCode, calculateDiscount } from '../data/mockData';

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
    removeFromCart: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;
    subtotal: number;
    discount: number;
    tax: number;
    total: number;
    itemCount: number;
    promoCode: PromoCode | null;
    applyPromoCode: (code: string) => boolean;
    removePromoCode: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [promoCode, setPromoCode] = useState<PromoCode | null>(null);

    // Load cart from localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setItems(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to localStorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (product: Product, variant: ProductVariant, quantity: number = 1) => {
        setItems((currentItems) => {
            // Check if item already exists
            const existingItem = currentItems.find(
                (item) => item.productId === product.id && item.variantId === variant.id
            );

            if (existingItem) {
                // Update quantity
                return currentItems.map((item) =>
                    item.id === existingItem.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                // Add new item
                const newItem: CartItem = {
                    id: `cart-${Date.now()}-${Math.random()}`,
                    productId: product.id,
                    variantId: variant.id,
                    quantity,
                    product,
                    variant,
                };
                return [...currentItems, newItem];
            }
        });
    };

    const removeFromCart = (itemId: string) => {
        setItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
    };

    const updateQuantity = (itemId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(itemId);
            return;
        }

        setItems((currentItems) =>
            currentItems.map((item) =>
                item.id === itemId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
        setPromoCode(null);
    };

    // Calculate subtotal
    const subtotal = items.reduce((sum, item) => {
        const price = item.product.salePrice || item.product.basePrice;
        return sum + price * item.quantity;
    }, 0);

    // Calculate discount
    const discount = promoCode ? calculateDiscount(promoCode, subtotal) : 0;

    // Calculate tax (18% GST on subtotal after discount)
    const tax = Math.round((subtotal - discount) * 0.18);

    // Calculate total
    const total = subtotal - discount + tax;

    // Item count
    const itemCount = items.reduce((count, item) => count + item.quantity, 0);

    const applyPromoCode = (code: string): boolean => {
        const validatedPromo = validatePromoCode(code, subtotal);
        if (validatedPromo) {
            setPromoCode(validatedPromo);
            return true;
        }
        return false;
    };

    const removePromoCode = () => {
        setPromoCode(null);
    };

    const value = {
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        discount,
        tax,
        total,
        itemCount,
        promoCode,
        applyPromoCode,
        removePromoCode,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
