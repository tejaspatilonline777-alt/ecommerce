// Core Types for E-Commerce Application

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  createdAt: Date;
}

export interface Address {
  id: string;
  userId: string;
  type: 'home' | 'work' | 'other';
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
}

export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  sku: string;
  stock: number;
  price: number;
  images: string[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  brand: string;
  category: string;
  subcategory?: string;
  basePrice: number;
  salePrice?: number;
  discount?: number;
  images: string[];
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  tags: string[];
  isFeatured: boolean;
  isNew: boolean;
  isBestseller: boolean;
  createdAt: Date;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  helpful: number;
  verified: boolean;
  createdAt: Date;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;
  product: Product;
  variant: ProductVariant;
}

export interface PromoCode {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrder: number;
  maxDiscount?: number;
  expiresAt: Date;
  isActive: boolean;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  tax: number;
  total: number;
  status: OrderStatus;
  shippingAddress: Address;
  billingAddress: Address;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
  promoCode?: string;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface WishlistItem {
  id: string;
  productId: string;
  userId: string;
  addedAt: Date;
}

export interface FilterOptions {
  categories: string[];
  brands: string[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  minRating?: number;
}

export interface SortOption {
  label: string;
  value: 'popularity' | 'price-asc' | 'price-desc' | 'newest' | 'rating';
}

export type Language = 'en' | 'hi' | 'mr';

export interface AppSettings {
  theme: 'light' | 'dark';
  language: Language;
  currency: string;
}
