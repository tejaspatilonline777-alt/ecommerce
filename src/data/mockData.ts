import { Product, Category, Review, PromoCode, ShippingMethod, PaymentMethod } from '../types';

// Categories
export const categories: Category[] = [
    {
        id: 'cat-1',
        name: 'Clothing',
        slug: 'clothing',
        description: 'Discover premium fashion for every occasion',
        image: '/images/fashion_product_2_1764410950457.png',
    },
    {
        id: 'cat-2',
        name: 'Shoes',
        slug: 'shoes',
        description: 'Step into style with our curated footwear collection',
        image: '/images/fashion_product_3_1764410985315.png',
    },
    {
        id: 'cat-3',
        name: 'Accessories',
        slug: 'accessories',
        description: 'Complete your look with elegant accessories',
        image: '/images/fashion_product_4_1764411001727.png',
    },
];

// Products
export const products: Product[] = [
    {
        id: 'prod-1',
        name: 'Classic Navy Blazer',
        slug: 'classic-navy-blazer',
        description: 'Elevate your professional wardrobe with this timeless navy blazer. Crafted from premium wool blend fabric, it features a modern slim fit, notched lapels, and functional pockets. Perfect for business meetings or formal events.',
        brand: 'Aarambh Luxury',
        category: 'Clothing',
        subcategory: 'Blazers',
        basePrice: 8999,
        salePrice: 6499,
        discount: 28,
        images: [
            '/images/fashion_product_1_1764410934878.png',
            '/images/fashion_product_1_1764410934878.png',
        ],
        variants: [
            {
                id: 'var-1-1',
                size: 'S',
                color: 'Navy',
                sku: 'BLZ-NAV-S',
                stock: 15,
                price: 6499,
                images: ['/images/fashion_product_1_1764410934878.png'],
            },
            {
                id: 'var-1-2',
                size: 'M',
                color: 'Navy',
                sku: 'BLZ-NAV-M',
                stock: 20,
                price: 6499,
                images: ['/images/fashion_product_1_1764410934878.png'],
            },
            {
                id: 'var-1-3',
                size: 'L',
                color: 'Navy',
                sku: 'BLZ-NAV-L',
                stock: 18,
                price: 6499,
                images: ['/images/fashion_product_1_1764410934878.png'],
            },
            {
                id: 'var-1-4',
                size: 'XL',
                color: 'Navy',
                sku: 'BLZ-NAV-XL',
                stock: 12,
                price: 6499,
                images: ['/images/fashion_product_1_1764410934878.png'],
            },
        ],
        rating: 4.7,
        reviewCount: 128,
        tags: ['formal', 'blazer', 'professional', 'premium'],
        isFeatured: true,
        isNew: false,
        isBestseller: true,
        createdAt: new Date('2024-10-15'),
    },
    {
        id: 'prod-2',
        name: 'Floral Embroidered Dress',
        slug: 'floral-embroidered-dress',
        description: 'Grace and elegance meet in this stunning white dress adorned with delicate floral embroidery. Made from breathable cotton fabric, it features a flattering A-line silhouette and subtle pleats. Ideal for summer parties and special occasions.',
        brand: 'Aarambh Collection',
        category: 'Clothing',
        subcategory: 'Dresses',
        basePrice: 5499,
        salePrice: 3999,
        discount: 27,
        images: [
            '/images/fashion_product_2_1764410950457.png',
            '/images/fashion_product_2_1764410950457.png',
        ],
        variants: [
            {
                id: 'var-2-1',
                size: 'S',
                color: 'White',
                sku: 'DRS-WHT-S',
                stock: 10,
                price: 3999,
                images: ['/images/fashion_product_2_1764410950457.png'],
            },
            {
                id: 'var-2-2',
                size: 'M',
                color: 'White',
                sku: 'DRS-WHT-M',
                stock: 15,
                price: 3999,
                images: ['/images/fashion_product_2_1764410950457.png'],
            },
            {
                id: 'var-2-3',
                size: 'L',
                color: 'White',
                sku: 'DRS-WHT-L',
                stock: 8,
                price: 3999,
                images: ['/images/fashion_product_2_1764410950457.png'],
            },
        ],
        rating: 4.9,
        reviewCount: 245,
        tags: ['dress', 'casual', 'embroidery', 'summer'],
        isFeatured: true,
        isNew: true,
        isBestseller: true,
        createdAt: new Date('2024-11-20'),
    },
    {
        id: 'prod-3',
        name: 'Premium Leather Sneakers',
        slug: 'premium-leather-sneakers',
        description: 'Step up your sneaker game with these contemporary black leather sneakers. Featuring genuine leather uppers, cushioned insoles, and durable rubber outsoles. The minimalist design pairs perfectly with both casual and semi-formal outfits.',
        brand: 'Urban Steps',
        category: 'Shoes',
        subcategory: 'Sneakers',
        basePrice: 7499,
        salePrice: 5999,
        discount: 20,
        images: [
            '/images/fashion_product_3_1764410985315.png',
            '/images/fashion_product_3_1764410985315.png',
        ],
        variants: [
            {
                id: 'var-3-1',
                size: '7',
                color: 'Black',
                sku: 'SNK-BLK-7',
                stock: 12,
                price: 5999,
                images: ['/images/fashion_product_3_1764410985315.png'],
            },
            {
                id: 'var-3-2',
                size: '8',
                color: 'Black',
                sku: 'SNK-BLK-8',
                stock: 20,
                price: 5999,
                images: ['/images/fashion_product_3_1764410985315.png'],
            },
            {
                id: 'var-3-3',
                size: '9',
                color: 'Black',
                sku: 'SNK-BLK-9',
                stock: 22,
                price: 5999,
                images: ['/images/fashion_product_3_1764410985315.png'],
            },
            {
                id: 'var-3-4',
                size: '10',
                color: 'Black',
                sku: 'SNK-BLK-10',
                stock: 15,
                price: 5999,
                images: ['/images/fashion_product_3_1764410985315.png'],
            },
            {
                id: 'var-3-5',
                size: '11',
                color: 'Black',
                sku: 'SNK-BLK-11',
                stock: 8,
                price: 5999,
                images: ['/images/fashion_product_3_1764410985315.png'],
            },
        ],
        rating: 4.6,
        reviewCount: 89,
        tags: ['sneakers', 'casual', 'leather', 'comfortable'],
        isFeatured: true,
        isNew: false,
        isBestseller: false,
        createdAt: new Date('2024-09-10'),
    },
    {
        id: 'prod-4',
        name: 'Designer Leather Handbag',
        slug: 'designer-leather-handbag',
        description: 'Sophistication meets functionality in this exquisite tan leather handbag. Handcrafted from genuine leather with elegant gold hardware, it features multiple compartments, adjustable straps, and a secure zip closure. The perfect statement piece for the modern woman.',
        brand: 'Luxe Carry',
        category: 'Accessories',
        subcategory: 'Handbags',
        basePrice: 12999,
        salePrice: 9999,
        discount: 23,
        images: [
            '/images/fashion_product_4_1764411001727.png',
            '/images/fashion_product_4_1764411001727.png',
        ],
        variants: [
            {
                id: 'var-4-1',
                size: 'One Size',
                color: 'Tan',
                sku: 'HBG-TAN-OS',
                stock: 25,
                price: 9999,
                images: ['/images/fashion_product_4_1764411001727.png'],
            },
        ],
        rating: 4.8,
        reviewCount: 156,
        tags: ['handbag', 'luxury', 'leather', 'designer'],
        isFeatured: true,
        isNew: true,
        isBestseller: true,
        createdAt: new Date('2024-11-15'),
    },
    {
        id: 'prod-5',
        name: 'Slim Fit Cotton Shirt',
        slug: 'slim-fit-cotton-shirt',
        description: 'A wardrobe essential, this crisp white cotton shirt offers a modern slim fit design. Made from 100% premium cotton with wrinkle-resistant finish. Features a spread collar, button-down front, and a curved hem. Versatile enough for office or casual outings.',
        brand: 'Aarambh Essentials',
        category: 'Clothing',
        subcategory: 'Shirts',
        basePrice: 2999,
        salePrice: 1999,
        discount: 33,
        images: [
            '/images/fashion_product_1_1764410934878.png',
        ],
        variants: [
            {
                id: 'var-5-1',
                size: 'S',
                color: 'White',
                sku: 'SHT-WHT-S',
                stock: 30,
                price: 1999,
                images: ['/images/fashion_product_1_1764410934878.png'],
            },
            {
                id: 'var-5-2',
                size: 'M',
                color: 'White',
                sku: 'SHT-WHT-M',
                stock: 45,
                price: 1999,
                images: ['/images/fashion_product_1_1764410934878.png'],
            },
            {
                id: 'var-5-3',
                size: 'L',
                color: 'White',
                sku: 'SHT-WHT-L',
                stock: 40,
                price: 1999,
                images: ['/images/fashion_product_1_1764410934878.png'],
            },
            {
                id: 'var-5-4',
                size: 'XL',
                color: 'White',
                sku: 'SHT-WHT-XL',
                stock: 25,
                price: 1999,
                images: ['/images/fashion_product_1_1764410934878.png'],
            },
        ],
        rating: 4.5,
        reviewCount: 312,
        tags: ['shirt', 'formal', 'cotton', 'everyday'],
        isFeatured: false,
        isNew: false,
        isBestseller: true,
        createdAt: new Date('2024-08-05'),
    },
    {
        id: 'prod-6',
        name: 'Denim Jeans - Dark Wash',
        slug: 'denim-jeans-dark-wash',
        description: 'Classic dark wash denim jeans with a comfortable regular fit. Crafted from premium stretch denim for all-day comfort. Features a five-pocket design, zip fly with button closure, and reinforced stitching. A timeless piece for any casual wardrobe.',
        brand: 'Denim Co.',
        category: 'Clothing',
        subcategory: 'Jeans',
        basePrice: 3999,
        salePrice: 2799,
        discount: 30,
        images: [
            '/images/fashion_product_1_1764410934878.png',
        ],
        variants: [
            {
                id: 'var-6-1',
                size: '30',
                color: 'Dark Blue',
                sku: 'JNS-DBL-30',
                stock: 18,
                price: 2799,
                images: ['/images/fashion_product_1_1764410934878.png'],
            },
            {
                id: 'var-6-2',
                size: '32',
                color: 'Dark Blue',
                sku: 'JNS-DBL-32',
                stock: 25,
                price: 2799,
                images: ['/images/fashion_product_1_1764410934878.png'],
            },
            {
                id: 'var-6-3',
                size: '34',
                color: 'Dark Blue',
                sku: 'JNS-DBL-34',
                stock: 22,
                price: 2799,
                images: ['/images/fashion_product_1_1764410934878.png'],
            },
            {
                id: 'var-6-4',
                size: '36',
                color: 'Dark Blue',
                sku: 'JNS-DBL-36',
                stock: 15,
                price: 2799,
                images: ['/images/fashion_product_1_1764410934878.png'],
            },
        ],
        rating: 4.4,
        reviewCount: 198,
        tags: ['jeans', 'denim', 'casual', 'everyday'],
        isFeatured: false,
        isNew: false,
        isBestseller: true,
        createdAt: new Date('2024-07-20'),
    },
];

// Reviews
export const reviews: Review[] = [
    {
        id: 'rev-1',
        productId: 'prod-1',
        userId: 'user-1',
        userName: 'Rajesh Kumar',
        rating: 5,
        title: 'Excellent quality blazer!',
        comment: 'The fit is perfect and the fabric feels premium. Received many compliments at work. Highly recommended!',
        helpful: 24,
        verified: true,
        createdAt: new Date('2024-11-10'),
    },
    {
        id: 'rev-2',
        productId: 'prod-2',
        userId: 'user-2',
        userName: 'Priya Sharma',
        rating: 5,
        title: 'Beautiful dress',
        comment: 'The embroidery work is stunning and the fit is flattering. Perfect for summer weddings!',
        helpful: 18,
        verified: true,
        createdAt: new Date('2024-11-22'),
    },
    {
        id: 'rev-3',
        productId: 'prod-3',
        userId: 'user-3',
        userName: 'Amit Patel',
        rating: 4,
        title: 'Comfortable sneakers',
        comment: 'Really comfortable for daily wear. The leather quality is good but they took a few days to break in.',
        helpful: 12,
        verified: true,
        createdAt: new Date('2024-11-05'),
    },
    {
        id: 'rev-4',
        productId: 'prod-4',
        userId: 'user-4',
        userName: 'Sneha Reddy',
        rating: 5,
        title: 'Luxurious handbag',
        comment: 'Absolutely love this bag! The leather is genuine and the design is elegant. Worth every rupee.',
        helpful: 31,
        verified: true,
        createdAt: new Date('2024-11-18'),
    },
];

// Promo Codes
export const promoCodes: PromoCode[] = [
    {
        code: 'WELCOME20',
        type: 'percentage',
        value: 20,
        minOrder: 2000,
        maxDiscount: 500,
        expiresAt: new Date('2024-12-31'),
        isActive: true,
    },
    {
        code: 'FLAT500',
        type: 'fixed',
        value: 500,
        minOrder: 3000,
        expiresAt: new Date('2024-12-31'),
        isActive: true,
    },
    {
        code: 'FIRSTBUY',
        type: 'percentage',
        value: 30,
        minOrder: 1500,
        maxDiscount: 1000,
        expiresAt: new Date('2024-12-31'),
        isActive: true,
    },
];

// Shipping Methods
export const shippingMethods: ShippingMethod[] = [
    {
        id: 'ship-1',
        name: 'Standard Delivery',
        description: 'Delivery within 5-7 business days',
        price: 99,
        estimatedDays: '5-7 days',
    },
    {
        id: 'ship-2',
        name: 'Express Delivery',
        description: 'Delivery within 2-3 business days',
        price: 199,
        estimatedDays: '2-3 days',
    },
    {
        id: 'ship-3',
        name: 'Same Day Delivery',
        description: 'Order before 12 PM for same day delivery',
        price: 299,
        estimatedDays: 'Same day',
    },
    {
        id: 'ship-4',
        name: 'Free Delivery',
        description: 'Free delivery on orders above ₹2000',
        price: 0,
        estimatedDays: '5-7 days',
    },
];

// Payment Methods
export const paymentMethods: PaymentMethod[] = [
    {
        id: 'pay-1',
        name: 'Credit/Debit Card',
        description: 'Visa, MasterCard, Amex, Rupay',
        icon: 'credit-card',
    },
    {
        id: 'pay-2',
        name: 'UPI',
        description: 'Google Pay, PhonePe, Paytm',
        icon: 'smartphone',
    },
    {
        id: 'pay-3',
        name: 'Net Banking',
        description: 'All major banks supported',
        icon: 'building',
    },
    {
        id: 'pay-4',
        name: 'Cash on Delivery',
        description: 'Pay when you receive',
        icon: 'banknote',
    },
    {
        id: 'pay-5',
        name: 'Wallet',
        description: 'Paytm, PhonePe, Amazon Pay',
        icon: 'wallet',
    },
];

// Helper Functions
export const getProductById = (id: string): Product | undefined => {
    return products.find((p) => p.id === id);
};

export const getProductBySlug = (slug: string): Product | undefined => {
    return products.find((p) => p.slug === slug);
};

export const getProductsByCategory = (category: string): Product[] => {
    return products.filter((p) => p.category === category);
};

export const getFeaturedProducts = (): Product[] => {
    return products.filter((p) => p.isFeatured);
};

export const getNewProducts = (): Product[] => {
    return products.filter((p) => p.isNew);
};

export const getBestsellerProducts = (): Product[] => {
    return products.filter((p) => p.isBestseller);
};

export const getReviewsByProductId = (productId: string): Review[] => {
    return reviews.filter((r) => r.productId === productId);
};

export const validatePromoCode = (code: string, orderTotal: number): PromoCode | null => {
    const promo = promoCodes.find(
        (p) => p.code.toUpperCase() === code.toUpperCase() && p.isActive
    );

    if (!promo) return null;
    if (orderTotal < promo.minOrder) return null;
    if (new Date() > promo.expiresAt) return null;

    return promo;
};

export const calculateDiscount = (promo: PromoCode, subtotal: number): number => {
    if (promo.type === 'fixed') {
        return promo.value;
    } else {
        const discount = (subtotal * promo.value) / 100;
        return promo.maxDiscount ? Math.min(discount, promo.maxDiscount) : discount;
    }
};
