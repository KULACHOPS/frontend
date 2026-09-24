import React, { createContext, useContext, useState } from 'react';
import type {
  Role,
  Campus,
  Vendor,
  MenuItem,
  CartItem,
  CartItemOptionSelected,
  Order,
  StudentProfile,
  SavedAddress,
} from '../types';
import { CAMPUSES, VENDORS, MENU_ITEMS, INITIAL_STUDENT, INITIAL_ORDERS } from '../data/mockData';

interface AppContextType {
  // Roles & View
  currentRole: Role;
  setCurrentRole: (role: Role) => void;

  // Campus
  campuses: Campus[];
  selectedCampus: Campus;
  setSelectedCampus: (campus: Campus) => void;
  isCampusModalOpen: boolean;
  setIsCampusModalOpen: (open: boolean) => void;

  // Vendors & Menus
  vendors: Vendor[];
  menuItems: MenuItem[];
  selectedVendorForMenu: Vendor | null;
  setSelectedVendorForMenu: (vendor: Vendor | null) => void;
  selectedItemForModal: MenuItem | null;
  setSelectedItemForModal: (item: MenuItem | null) => void;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (
    item: MenuItem,
    vendor: Vendor,
    selectedOptions: CartItemOptionSelected[],
    quantity: number,
    instructions?: string
  ) => boolean;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartVendor: Vendor | null;
  cartSubtotal: number;

  // Checkout & Orders
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  orders: Order[];
  activeTrackingOrderId: string | null;
  setActiveTrackingOrderId: (id: string | null) => void;
  createOrder: (params: {
    deliveryType: 'campus_delivery' | 'self_pickup';
    address?: SavedAddress;
    paymentMethod: 'card' | 'bank_transfer' | 'wallet';
    discountAmount: number;
    promoCode?: string;
  }) => Order | null;
  cancelOrder: (orderId: string, reason?: string) => void;

  // Modals
  isWalletModalOpen: boolean;
  setIsWalletModalOpen: (open: boolean) => void;
  isOrderHistoryOpen: boolean;
  setIsOrderHistoryOpen: (open: boolean) => void;
  isRatingModalOpen: boolean;
  setIsRatingModalOpen: (open: boolean) => void;
  ratingOrder: Order | null;
  openRatingForOrder: (order: Order) => void;
  submitOrderRating: (orderId: string, vendorRating: number, riderRating: number, comment: string) => void;

  // Student Profile & Wallet
  student: StudentProfile;
  topUpWallet: (amount: number) => void;

  // Vendor Portal Actions
  activeVendorId: string;
  setActiveVendorId: (id: string) => void;
  vendorAcceptOrder: (orderId: string) => void;
  vendorStartPreparing: (orderId: string) => void;
  vendorMarkReady: (orderId: string) => void;
  toggleItemAvailability: (itemId: string) => void;
  toggleVendorStatus: (vendorId: string) => void;

  // Rider Portal Actions
  isRiderOnline: boolean;
  setIsRiderOnline: (online: boolean) => void;
  riderAcceptOrder: (orderId: string) => void;
  riderConfirmPickup: (orderId: string) => void;
  riderConfirmDelivery: (orderId: string, inputCode: string) => { success: boolean; message: string };

  // Authentication
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  login: (phone: string, name?: string) => void;
  logout: () => void;

  // Toast
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Roles
  const [currentRole, setCurrentRole] = useState<Role>('student');

  // Campus
  const [campuses] = useState<Campus[]>(CAMPUSES);
  const [selectedCampus, setSelectedCampus] = useState<Campus>(CAMPUSES[0]);
  const [isCampusModalOpen, setIsCampusModalOpen] = useState(false);

  // Vendors & Menus
  const [vendors, setVendors] = useState<Vendor[]>(VENDORS);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [selectedVendorForMenu, setSelectedVendorForMenu] = useState<Vendor | null>(null);
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);

  // Cart
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modals & Tracking
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState<string | null>('ord_101');
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [ratingOrder, setRatingOrder] = useState<Order | null>(null);

  // Student Profile
  const [student, setStudent] = useState<StudentProfile>(INITIAL_STUDENT);

  // Vendor & Rider state
  const [activeVendorId, setActiveVendorId] = useState<string>('v1');
  const [isRiderOnline, setIsRiderOnline] = useState<boolean>(true);

  // Authentication state (Default false: clean landing page for visitors)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const login = (phone: string, name?: string) => {
    setIsAuthenticated(true);
    if (name) {
      setStudent((s) => ({ ...s, name, phone }));
    }
    setIsAuthModalOpen(false);
    showToast(`Welcome to Kulachops, ${name || 'Student'}!`, 'success');
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast('You have signed out of your Kulachops account', 'info');
  };

  // Toast notification
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  };

  // Cart Helpers
  const cartVendor = cart.length > 0 ? vendors.find((v) => v.id === cart[0].vendorId) || null : null;
  const cartSubtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  const addToCart = (
    item: MenuItem,
    vendor: Vendor,
    selectedOptions: CartItemOptionSelected[],
    quantity: number,
    instructions?: string
  ): boolean => {
    // If cart has items from another vendor, warn or clear
    if (cart.length > 0 && cart[0].vendorId !== vendor.id) {
      const confirmReplace = window.confirm(
        `Your cart contains items from ${cart[0].vendorName}. Starting a new order with ${vendor.name} will clear existing items. Do you want to proceed?`
      );
      if (!confirmReplace) return false;
      setCart([]);
    }

    const optionsPrice = selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
    const unitPrice = item.price + optionsPrice;
    const totalPrice = unitPrice * quantity;

    const newCartItem: CartItem = {
      id: `cart_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      menuItem: item,
      vendorId: vendor.id,
      vendorName: vendor.name,
      quantity,
      selectedOptions,
      specialInstructions: instructions,
      unitPrice,
      totalPrice,
    };

    setCart((prev) => [...prev, newCartItem]);
    showToast(`Added ${quantity}x ${item.name} to your tray!`, 'success');
    return true;
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from tray', 'info');
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              totalPrice: item.unitPrice * newQty,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Order Placement
  const createOrder = ({
    deliveryType,
    address,
    paymentMethod,
    discountAmount,
    promoCode,
  }: {
    deliveryType: 'campus_delivery' | 'self_pickup';
    address?: SavedAddress;
    paymentMethod: 'card' | 'bank_transfer' | 'wallet';
    discountAmount: number;
    promoCode?: string;
  }): Order | null => {
    if (!cartVendor || cart.length === 0) return null;

    const subtotal = cartSubtotal;
    const packagingFee = cartVendor.packagingFee || 150;
    const deliveryFee = deliveryType === 'campus_delivery' ? (address ? 350 : cartVendor.deliveryFee) : 0;
    const serviceFee = 100; // PRD indicative student platform fee
    const grossTotal = subtotal + packagingFee + deliveryFee + serviceFee;
    const totalAmount = Math.max(0, grossTotal - discountAmount);

    // If wallet payment, check balance
    if (paymentMethod === 'wallet' && student.walletBalance < totalAmount) {
      showToast('Insufficient wallet balance. Please top up or choose card / bank transfer.', 'error');
      return null;
    }

    if (paymentMethod === 'wallet') {
      setStudent((prev) => ({
        ...prev,
        walletBalance: prev.walletBalance - totalAmount,
      }));
    }

    // Random 4-digit code (PRD OM-06)
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    const orderNum = `KC-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber: orderNum,
      studentId: student.id,
      studentName: student.name,
      studentPhone: student.phone,
      vendorId: cartVendor.id,
      vendorName: cartVendor.name,
      vendorImage: cartVendor.bannerImage,
      vendorPhone: cartVendor.phone,
      items: [...cart],
      subtotal,
      packagingFee,
      deliveryFee,
      serviceFee,
      discountAmount,
      promoCodeApplied: promoCode,
      totalAmount,
      status: 'paid_awaiting_vendor',
      deliveryType,
      deliveryAddress: address,
      paymentMethod,
      paymentReference: `KC_PAY_${Date.now()}`,
      deliveryCode: randomCode,
      estimatedDeliveryTime: '25-35 mins',
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setActiveTrackingOrderId(newOrder.id);
    showToast(`Order ${orderNum} confirmed! Waiting for restaurant to accept.`, 'success');

    // Simulate vendor accepting in 6 seconds for realistic demo!
    setTimeout(() => {
      setOrders((prev) =>
        prev.map((ord) => {
          if (ord.id === newOrder.id && ord.status === 'paid_awaiting_vendor') {
            return {
              ...ord,
              status: 'accepted',
              acceptedAt: new Date().toISOString(),
            };
          }
          return ord;
        })
      );
    }, 6000);

    return newOrder;
  };

  const cancelOrder = (orderId: string, reason?: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          // If paid from wallet, refund
          if (ord.paymentMethod === 'wallet') {
            setStudent((s) => ({
              ...s,
              walletBalance: s.walletBalance + ord.totalAmount,
            }));
            showToast(`Order cancelled. ₦${ord.totalAmount.toLocaleString()} refunded to your wallet!`, 'info');
          } else {
            showToast(`Order cancelled. Full refund will be credited.`, 'info');
          }
          return {
            ...ord,
            status: 'cancelled',
            cancelledAt: new Date().toISOString(),
            cancelReason: reason || 'Cancelled by user',
          };
        }
        return ord;
      })
    );
  };

  // Ratings
  const openRatingForOrder = (order: Order) => {
    setRatingOrder(order);
    setIsRatingModalOpen(true);
  };

  const submitOrderRating = (orderId: string, vendorRating: number, riderRating: number, comment: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            vendorRating,
            riderRating,
            ratingComment: comment,
          };
        }
        return ord;
      })
    );
    setIsRatingModalOpen(false);
    setRatingOrder(null);
    showToast('Thank you for rating your food and delivery!', 'success');
  };

  // Wallet
  const topUpWallet = (amount: number) => {
    setStudent((prev) => ({
      ...prev,
      walletBalance: prev.walletBalance + amount,
    }));
    showToast(`₦${amount.toLocaleString()} added to your Kulachops wallet!`, 'success');
  };

  // Vendor Portal Actions
  const vendorAcceptOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'accepted', acceptedAt: new Date().toISOString() } : o))
    );
    showToast('Order accepted! Sending notification to student.', 'success');
  };

  const vendorStartPreparing = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'preparing', preparingAt: new Date().toISOString() } : o))
    );
    showToast('Order status changed to "Preparing in kitchen".', 'info');
  };

  const vendorMarkReady = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: 'ready_for_pickup',
              readyAt: new Date().toISOString(),
              riderId: 'rd_emeka_01',
              riderName: 'Emeka Nwosu',
              riderPhone: '08098765432',
              riderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
            }
          : o
      )
    );
    showToast('Food marked ready! Dispatch alerted campus rider.', 'success');
  };

  const toggleItemAvailability = (itemId: string) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, isAvailable: !item.isAvailable } : item))
    );
  };

  const toggleVendorStatus = (vendorId: string) => {
    setVendors((prev) =>
      prev.map((v) => (v.id === vendorId ? { ...v, isOpen: !v.isOpen } : v))
    );
  };

  // Rider Portal Actions
  const riderAcceptOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: 'rider_assigned',
              riderId: 'rd_emeka_01',
              riderName: 'Emeka Nwosu (You)',
              riderPhone: '08098765432',
              riderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
            }
          : o
      )
    );
    showToast('Delivery job accepted! Navigate to the vendor.', 'success');
  };

  const riderConfirmPickup = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: 'picked_up_on_way',
              pickedUpAt: new Date().toISOString(),
            }
          : o
      )
    );
    showToast('Order picked up! Ride to student hostel.', 'info');
  };

  const riderConfirmDelivery = (orderId: string, inputCode: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return { success: false, message: 'Order not found' };

    if (order.deliveryCode.trim() !== inputCode.trim()) {
      return { success: false, message: 'Incorrect 4-digit student delivery code. Ask the student for the code on their screen.' };
    }

    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: 'delivered',
              deliveredAt: new Date().toISOString(),
            }
          : o
      )
    );
    showToast(`Order ${order.orderNumber} delivered successfully! Rider earnings credited.`, 'success');
    return { success: true, message: 'Delivery completed successfully!' };
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        campuses,
        selectedCampus,
        setSelectedCampus,
        isCampusModalOpen,
        setIsCampusModalOpen,
        vendors,
        menuItems,
        selectedVendorForMenu,
        setSelectedVendorForMenu,
        selectedItemForModal,
        setSelectedItemForModal,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartVendor,
        cartSubtotal,
        isCheckoutOpen,
        setIsCheckoutOpen,
        orders,
        activeTrackingOrderId,
        setActiveTrackingOrderId,
        createOrder,
        cancelOrder,
        isWalletModalOpen,
        setIsWalletModalOpen,
        isOrderHistoryOpen,
        setIsOrderHistoryOpen,
        isRatingModalOpen,
        setIsRatingModalOpen,
        ratingOrder,
        openRatingForOrder,
        submitOrderRating,
        student,
        topUpWallet,
        activeVendorId,
        setActiveVendorId,
        vendorAcceptOrder,
        vendorStartPreparing,
        vendorMarkReady,
        toggleItemAvailability,
        toggleVendorStatus,
        isRiderOnline,
        setIsRiderOnline,
        riderAcceptOrder,
        riderConfirmPickup,
        riderConfirmDelivery,
        toast,
        showToast,
        isAuthenticated,
        setIsAuthenticated,
        isAuthModalOpen,
        setIsAuthModalOpen,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
