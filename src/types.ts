/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Review {
  id: string;
  name: string;
  rating: number;
  title?: string;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[]; // for thumbnail gallery
  category: 'haircare' | 'pedicure' | 'manicure';
  shortDescription: string;
  description: string;
  ingredients: string[];
  benefits: string[];
  usage: string[];
  sizes: string[]; // e.g. ["250ml", "500ml"] or ["100g", "200g"]
  stock: number;
  reviews: Review[];
  featured?: boolean;
  bestSeller?: boolean;
  relatedIds?: string[];
  keyIngredients: string[]; // e.g. ["Rosemary", "Avocado"]
  suitableFor: string[]; // e.g. ["All hair types", "Dry scalp"]
}

export interface CartItem {
  id: string; // unique cart item id: product.id + '-' + selectedSize
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface Address {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode?: string;
  country: string;
  phone: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  shippingAddress?: Address;
  billingAddress?: Address;
  loyaltyPoints: number;
}

export interface Order {
  id: string;
  date: string;
  items: {
    productId: string;
    productName: string;
    productImage: string;
    price: number;
    quantity: number;
    selectedSize: string;
  }[];
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  total: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  shippingAddress: Address;
  trackingNumber: string;
  couponUsed?: string;
}

export interface Coupon {
  code: string;
  discountType: 'percent' | 'fixed';
  value: number;
  minPurchase: number;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
