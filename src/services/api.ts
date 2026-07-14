/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, User, Order, Coupon, Review, FAQItem } from '../types';
import { PRODUCTS } from '../data/products';
import { FAQS } from '../data/faqs';

// Simulates network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock database for coupons
const AVAILABLE_COUPONS: Coupon[] = [
  { code: 'VICESH20', discountType: 'percent', value: 20, minPurchase: 50 },
  { code: 'ORGANIC10', discountType: 'percent', value: 10, minPurchase: 0 },
  { code: 'ECOGOLD', discountType: 'fixed', value: 15, minPurchase: 60 }
];

export const api = {
  products: {
    getAll: async (): Promise<Product[]> => {
      await delay(500);
      return PRODUCTS;
    },
    submitReview: async (productId: string, reviewData: Omit<Review, 'id' | 'date'>): Promise<Review> => {
      await delay(500);
      return {
        id: `rev-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        ...reviewData
      };
    }
  },

  faqs: {
    getAll: async (): Promise<FAQItem[]> => {
      await delay(500);
      return FAQS;
    }
  },

  auth: {
    login: async (email: string, password?: string): Promise<User> => {
      await delay(800);
      const name = email.split('@')[0];
      const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
      
      return {
        id: `usr-${Date.now()}`,
        name: formattedName,
        email: email,
        phone: '+233 24 4123 456',
        loyaltyPoints: 120,
        shippingAddress: {
          fullName: formattedName + ' Mensah',
          addressLine1: '34 Liberation Road',
          addressLine2: 'Airport Residential Area',
          city: 'Accra',
          state: 'Greater Accra',
          country: 'Ghana',
          phone: '+233 24 4123 456'
        }
      };
    },
    register: async (name: string, email: string, password?: string): Promise<User> => {
      await delay(800);
      return {
        id: `usr-${Date.now()}`,
        name: name,
        email: email,
        loyaltyPoints: 50,
      };
    }
  },

  orders: {
    create: async (orderData: Partial<Order>): Promise<Order> => {
      await delay(1000);
      return {
        ...orderData,
        id: `VC-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toISOString().split('T')[0],
        trackingNumber: `TRACK-${Math.floor(10000000 + Math.random() * 90000000)}`,
        status: 'processing'
      } as Order;
    }
  },

  coupons: {
    verify: async (code: string): Promise<Coupon | null> => {
      await delay(300);
      const coupon = AVAILABLE_COUPONS.find((c) => c.code.toUpperCase() === code.toUpperCase());
      return coupon || null;
    }
  }
};
