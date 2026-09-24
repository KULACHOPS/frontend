// KULACHOPS Types - Aligned with PRD PTS/KULACHOPS/PRD/

export type Role = 'student' | 'vendor' | 'rider' | 'admin';

export interface Campus {
  id: string;
  name: string;
  shortName: string;
  city: string;
  state: string;
  deliveryZones: DeliveryZone[];
  operatingHours: string;
  isActive: boolean;
}

export interface DeliveryZone {
  id: string;
  name: string;
  type: 'hostel' | 'faculty' | 'gate' | 'commercial';
  baseDeliveryFee: number; // in NGN (₦)
  description?: string;
  popularSpots?: string[];
}

export interface SavedAddress {
  id: string;
  label: string; // e.g. "My Room", "Faculty Library"
  campusId: string;
  zoneId: string;
  hostelOrBuilding: string;
  blockOrFloor?: string;
  roomOrNumber: string;
  landmark?: string;
  phoneNumber: string;
  isDefault: boolean;
}

export interface MenuItemOption {
  id: string;
  name: string;
  price: number;
}

export interface MenuItemOptionGroup {
  id: string;
  title: string;
  required: boolean;
  minSelect?: number;
  maxSelect?: number;
  options: MenuItemOption[];
}

export interface MenuItem {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  price: number; // in NGN
  image: string;
  category: string;
  isAvailable: boolean;
  isPopular?: boolean;
  isSpicy?: boolean;
  prepTimeMinutes: number;
  optionGroups?: MenuItemOptionGroup[];
}

export interface Vendor {
  id: string;
  campusId: string;
  name: string;
  tagline: string;
  description: string;
  logo: string;
  bannerImage: string;
  rating: number;
  reviewCount: number;
  cuisineTypes: string[];
  prepTimeEstimate: string; // e.g. "15-25 min"
  deliveryFee: number;
  minOrderAmount: number;
  packagingFee: number;
  isOpen: boolean;
  isBusy?: boolean;
  isFeatured?: boolean;
  isCampusSpecial?: boolean;
  address: string;
  phone: string;
}

export interface CartItemOptionSelected {
  groupId: string;
  groupTitle: string;
  optionId: string;
  optionName: string;
  price: number;
}

export interface CartItem {
  id: string; // unique item instance id in cart
  menuItem: MenuItem;
  vendorId: string;
  vendorName: string;
  quantity: number;
  selectedOptions: CartItemOptionSelected[];
  specialInstructions?: string;
  unitPrice: number; // base + options
  totalPrice: number;
}

export type OrderStatus =
  | 'pending_payment'
  | 'paid_awaiting_vendor'
  | 'accepted'
  | 'preparing'
  | 'ready_for_pickup'
  | 'rider_assigned'
  | 'picked_up_on_way'
  | 'arrived_at_hostel'
  | 'delivered'
  | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string; // e.g. "KC-9482"
  studentId: string;
  studentName: string;
  studentPhone: string;
  vendorId: string;
  vendorName: string;
  vendorImage: string;
  vendorPhone: string;
  items: CartItem[];
  subtotal: number;
  packagingFee: number;
  deliveryFee: number;
  serviceFee: number;
  discountAmount: number;
  promoCodeApplied?: string;
  totalAmount: number;
  status: OrderStatus;
  deliveryType: 'campus_delivery' | 'self_pickup';
  deliveryAddress?: SavedAddress;
  deliveryNotes?: string;
  paymentMethod: 'card' | 'bank_transfer' | 'wallet';
  paymentReference: string;
  deliveryCode: string; // 4-digit verification code e.g. "7492" (PRD OM-06)
  riderId?: string;
  riderName?: string;
  riderPhone?: string;
  riderAvatar?: string;
  estimatedDeliveryTime: string;
  createdAt: string;
  acceptedAt?: string;
  preparingAt?: string;
  readyAt?: string;
  pickedUpAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;
  cancelReason?: string;
  vendorRating?: number;
  riderRating?: number;
  ratingComment?: string;
}

export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  reference: string;
  date: string;
  status: 'successful' | 'pending' | 'failed';
}

export interface StudentProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  selectedCampusId: string;
  walletBalance: number;
  savedAddresses: SavedAddress[];
}

// Runtime value exports for browser compatibility
export const Campus = {};
export const Vendor = {};
export const MenuItem = {};
export const StudentProfile = {};
export const Order = {};
export const Role = {};
export const OrderStatus = {};
export const CartItemOptionSelected = {};
export const SavedAddress = {};

