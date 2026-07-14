import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, User, Address, Coupon, Review } from '../types';
import { api } from '../services/api';

interface StoreContextType {
  products: Product[];
  isLoadingProducts: boolean;
  cart: CartItem[];
  wishlist: string[]; // array of product ids
  currentUser: User | null;
  orders: Order[];
  appliedCoupon: Coupon | null;
  quickViewProduct: Product | null;
  recentlyViewed: string[]; // array of product ids
  
  // Cart Actions
  addToCart: (product: Product, quantity: number, size: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartSubtotal: () => number;
  getShippingCost: () => number;
  
  // Wishlist Actions
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // User Profile & Auth
  loginUser: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  registerUser: (name: string, email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logoutUser: () => void;
  updateProfile: (name: string, phone: string) => void;
  updateAddresses: (shipping: Address, billing?: Address) => void;
  addLoyaltyPoints: (points: number) => void;
  
  // Order Actions
  placeOrder: (paymentMethod: string, shippingAddress: Address) => Promise<Order>;
  trackOrder: (orderId: string) => Order | undefined;
  
  // Coupon Actions
  applyCouponCode: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  
  // Quick View Modal Action
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  
  // Review Actions
  addProductReview: (productId: string, review: Omit<Review, 'id' | 'date'>) => Promise<void>;
  
  // Utility for recently viewed
  addRecentlyViewed: (productId: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('vicesh_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('vicesh_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('vicesh_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('vicesh_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    const saved = localStorage.getItem('vicesh_recent');
    return saved ? JSON.parse(saved) : [];
  });

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const productsData = await api.products.getAll();
        setProducts(productsData);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setIsLoadingProducts(false);
      }
    };
    loadData();
  }, []);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('vicesh_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('vicesh_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('vicesh_user', currentUser ? JSON.stringify(currentUser) : '');
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('vicesh_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('vicesh_recent', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  // Cart Actions
  const addToCart = (product: Product, quantity: number, size: string) => {
    const cartItemId = `${product.id}-${size}`;
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { id: cartItemId, product, quantity, selectedSize: size }];
      }
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const getCartSubtotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const getShippingCost = () => {
    const subtotal = getCartSubtotal();
    if (subtotal === 0) return 0;
    if (subtotal > 100) return 0; // Free shipping above $100
    return 10.00; // Flat-rate $10 / GHS equivalent
  };

  const getCartTotal = () => {
    const subtotal = getCartSubtotal();
    const shipping = getShippingCost();
    let discount = 0;

    if (appliedCoupon) {
      if (subtotal >= appliedCoupon.minPurchase) {
        if (appliedCoupon.discountType === 'percent') {
          discount = (subtotal * appliedCoupon.value) / 100;
        } else {
          discount = appliedCoupon.value;
        }
      }
    }

    return Math.max(0, subtotal - discount + shipping);
  };

  // Wishlist Actions
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  // Auth/User
  const loginUser = async (email: string, password?: string) => {
    try {
      const user = await api.auth.login(email, password);
      setCurrentUser(user);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const registerUser = async (name: string, email: string, password?: string) => {
    try {
      const user = await api.auth.register(name, email, password);
      setCurrentUser(user);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setAppliedCoupon(null);
  };

  const updateProfile = (name: string, phone: string) => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      name,
      phone
    });
  };

  const updateAddresses = (shipping: Address, billing?: Address) => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      shippingAddress: shipping,
      billingAddress: billing || shipping
    });
  };

  const addLoyaltyPoints = (points: number) => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      loyaltyPoints: currentUser.loyaltyPoints + points
    });
  };

  // Order Actions
  const placeOrder = async (paymentMethod: string, shippingAddress: Address) => {
    const subtotal = getCartSubtotal();
    const shipping = getShippingCost();
    let discount = 0;

    if (appliedCoupon && subtotal >= appliedCoupon.minPurchase) {
      if (appliedCoupon.discountType === 'percent') {
        discount = (subtotal * appliedCoupon.value) / 100;
      } else {
        discount = appliedCoupon.value;
      }
    }

    const orderData: Partial<Order> = {
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.image,
        price: item.product.price,
        quantity: item.quantity,
        selectedSize: item.selectedSize
      })),
      subtotal,
      discountAmount: discount,
      shippingCost: shipping,
      total: getCartTotal(),
      paymentMethod,
      shippingAddress,
      couponUsed: appliedCoupon?.code
    };

    const newOrder = await api.orders.create(orderData);
    
    setOrders((prev) => [newOrder, ...prev]);
    
    // Earn loyalty points: 1 point per $1 spent
    const pointsEarned = Math.floor(newOrder.total);
    addLoyaltyPoints(pointsEarned);
    
    // Deduct stock (if products are tracking stock properly, ideally backend handles this)
    setProducts((prevProducts) => {
      return prevProducts.map((p) => {
        const orderItem = cart.find((item) => item.product.id === p.id);
        if (orderItem) {
          return { ...p, stock: Math.max(0, p.stock - orderItem.quantity) };
        }
        return p;
      });
    });

    clearCart();
    return newOrder;
  };

  const trackOrder = (orderId: string) => {
    return orders.find((o) => o.id === orderId);
  };

  // Coupon Actions
  const applyCouponCode = async (code: string) => {
    try {
      const coupon = await api.coupons.verify(code);
      if (!coupon) {
        return { success: false, message: 'Invalid coupon code.' };
      }
      
      const subtotal = getCartSubtotal();
      if (subtotal < coupon.minPurchase) {
        return { 
          success: false, 
          message: `Minimum purchase of $${coupon.minPurchase.toFixed(2)} required for this coupon.` 
        };
      }

      setAppliedCoupon(coupon);
      return { success: true, message: `Coupon applied: ${coupon.value}% off your order!` };
    } catch (error) {
      return { success: false, message: 'Failed to apply coupon.' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Quick View Actions
  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  // Product Reviews
  const addProductReview = async (productId: string, reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview = await api.products.submitReview(productId, reviewData);

    setProducts((prevProducts) => {
      return prevProducts.map((p) => {
        if (p.id === productId) {
          const updatedReviews = [newReview, ...p.reviews];
          const averageRating = parseFloat(
            (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1)
          );
          return {
            ...p,
            reviews: updatedReviews,
            reviewsCount: updatedReviews.length,
            rating: averageRating
          };
        }
        return p;
      });
    });
  };

  // Recently Viewed
  const addRecentlyViewed = (productId: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, 5); // keep last 5 items
    });
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        isLoadingProducts,
        cart,
        wishlist,
        currentUser,
        orders,
        appliedCoupon,
        quickViewProduct,
        recentlyViewed,
        
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getCartTotal,
        getCartSubtotal,
        getShippingCost,
        
        toggleWishlist,
        isInWishlist,
        
        loginUser,
        registerUser,
        logoutUser,
        updateProfile,
        updateAddresses,
        addLoyaltyPoints,
        
        placeOrder,
        trackOrder,
        
        applyCouponCode,
        removeCoupon,
        
        openQuickView,
        closeQuickView,
        
        addProductReview,
        addRecentlyViewed
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
