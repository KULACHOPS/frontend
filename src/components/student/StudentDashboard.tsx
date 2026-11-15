import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  MapPin,
  Clock,
  Star,
  Bike,
  Plus,
  ShoppingBag,
  Wallet,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Copy,
  LogOut,
} from 'lucide-react';
import type { MenuItem } from '../../types';

export const StudentDashboard: React.FC = () => {
  const {
    student,
    selectedCampus,
    setIsCampusModalOpen,
    vendors,
    menuItems,
    setSelectedVendorForMenu,
    setSelectedItemForModal,
    activeTab,
    setActiveTab,
    orders,
    setActiveTrackingOrderId,
    cart,
    setIsCartOpen,
    addToCart,
    topUpWallet,
    showToast,
    logout,
    openRatingForOrder,
  } = useApp();

  // Local State for Explore & Search Tabs
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [vendorFilter, setVendorFilter] = useState<'all' | 'open' | 'fast' | 'topRated'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [walletTopUpInput, setWalletTopUpInput] = useState<string>('2500');
  const [ordersSubFilter, setOrdersSubFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Total cart items count
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Active (in-progress) order
  const activeOrder = orders.find(
    (o) => o.status !== 'delivered' && o.status !== 'cancelled'
  );

  // Default address
  const defaultAddress = student.savedAddresses.find((a) => a.isDefault) || student.savedAddresses[0];

  // Campus Categories
  const categories = [
    { id: 'all', name: 'All Chops', emoji: '🍽️' },
    { id: 'Rice Dishes', name: 'Rice & Jollof', emoji: '🍚' },
    { id: 'Grills & Shawarma', name: 'Grills & Shawarma', emoji: '🌯' },
    { id: 'Swallow', name: 'Swallow & Soups', emoji: '🍲' },
    { id: 'Late Night', name: 'Late Night (2AM)', emoji: '🌙' },
    { id: 'Chillers', name: 'Drinks & Chillers', emoji: '🧋' },
    { id: 'Quick Bites', name: 'Quick Snacks', emoji: '🥪' },
  ];

  // Filtered vendors for Explore tab
  const filteredVendors = useMemo(() => {
    return vendors.filter((v) => {
      // Category match
      if (selectedCategory !== 'all') {
        const matchesCat = v.cuisineTypes.some((c) =>
          c.toLowerCase().includes(selectedCategory.toLowerCase())
        );
        if (!matchesCat) return false;
      }
      // Pill filter
      if (vendorFilter === 'open' && !v.isOpen) return false;
      if (vendorFilter === 'topRated' && v.rating < 4.8) return false;
      if (vendorFilter === 'fast' && parseInt(v.prepTimeEstimate) > 20) return false;
      return true;
    });
  }, [vendors, selectedCategory, vendorFilter]);

  // Search Results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return { matchingVendors: [], matchingItems: [] };
    const q = searchQuery.toLowerCase().trim();

    const matchingVendors = vendors.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.tagline.toLowerCase().includes(q) ||
        v.cuisineTypes.some((c) => c.toLowerCase().includes(q))
    );

    const matchingItems = menuItems.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q)
    );

    return { matchingVendors, matchingItems };
  }, [vendors, menuItems, searchQuery]);

  // Quick Add Item to Cart
  const handleQuickAdd = (item: MenuItem) => {
    const vendor = vendors.find((v) => v.id === item.vendorId);
    if (!vendor) return;

    if (item.optionGroups && item.optionGroups.length > 0) {
      setSelectedItemForModal(item);
    } else {
      addToCart(item, vendor, [], 1);
    }
  };

  // Re-order a past order
  const handleReorder = (order: typeof orders[0]) => {
    const vendor = vendors.find((v) => v.id === order.vendorId);
    if (!vendor) return;

    order.items.forEach((item) => {
      addToCart(item.menuItem, vendor, item.selectedOptions, item.quantity, item.specialInstructions);
    });
    setIsCartOpen(true);
    showToast(`Items from Order #${order.orderNumber} added to your bag! 🛍️`, 'success');
  };

  // Wallet Top-up Handler
  const handleTopUp = (amount: number) => {
    if (isNaN(amount) || amount <= 0) {
      showToast('Please enter a valid amount', 'error');
      return;
    }
    topUpWallet(amount);
    showToast(`₦${amount.toLocaleString()} added to your Kulachop Wallet! 🎉`, 'success');
  };

  return (
    <div className="kula-dashboard-wrapper" style={{ maxWidth: '1240px', margin: '0 auto', padding: '16px 16px 90px' }}>
      {/* =========================================================================
          TOP STUDENT STATUS & HOSTEL CAPSULE (DESKTOP & MOBILE)
          ========================================================================= */}
      <div
        style={{
          background: '#FFFFFF',
          border: '3px solid #090C0B',
          borderRadius: '24px',
          boxShadow: '0 6px 0 #090C0B',
          padding: '16px 20px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        {/* Left: Greeting & Hostel Delivery Point */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            onClick={() => setActiveTab('profile')}
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: '#FF5500',
              border: '2px solid #090C0B',
              boxShadow: '0 3px 0 #090C0B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 900,
              fontSize: '18px',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            {student.name.charAt(0)}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#090C0B', margin: 0, letterSpacing: '-0.5px' }}>
                Hey, {student.name.split(' ')[0]} 👋
              </h2>
              <span
                style={{
                  background: '#E6F8F0',
                  color: '#087A4F',
                  border: '1.5px solid #087A4F',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '99px',
                }}
              >
                Verified Student
              </span>
            </div>

            {/* Hostel delivery point picker */}
            <button
              type="button"
              onClick={() => setIsCampusModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: 'transparent',
                border: 'none',
                padding: '2px 0 0',
                color: '#525C57',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <MapPin size={13} color="#FF5500" />
              <span>
                {selectedCampus.shortName} • {defaultAddress?.hostelOrBuilding || 'Moremi Hall'} ({defaultAddress?.roomOrNumber || 'Room 214'})
              </span>
              <span style={{ color: '#FF5500', fontWeight: 900, fontSize: '11px' }}>Change ▾</span>
            </button>
          </div>
        </div>

        {/* Right: Wallet Balance & Quick Bag Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            onClick={() => setActiveTab('wallet')}
            style={{
              background: '#FFF9E6',
              border: '2px solid #090C0B',
              borderRadius: '14px',
              boxShadow: '0 3px 0 #090C0B',
              padding: '8px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              color: '#090C0B',
              fontWeight: 800,
              fontSize: '13px',
              transition: 'transform 0.1s ease',
            }}
          >
            <div
              style={{
                width: '22px',
                height: '22px',
                borderRadius: '6px',
                background: '#FFC501',
                border: '1.5px solid #090C0B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Wallet size={12} />
            </div>
            <span>₦{student.walletBalance.toLocaleString()}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            style={{
              background: cartCount > 0 ? '#FF5500' : '#F5F7F6',
              color: cartCount > 0 ? '#FFFFFF' : '#090C0B',
              border: '2px solid #090C0B',
              borderRadius: '14px',
              boxShadow: '0 3px 0 #090C0B',
              padding: '8px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              fontWeight: 800,
              fontSize: '13px',
            }}
          >
            <ShoppingBag size={14} />
            <span className="hidden-sm">Bag</span>
            {cartCount > 0 && (
              <span
                style={{
                  background: '#FFC501',
                  color: '#090C0B',
                  fontWeight: 900,
                  fontSize: '11px',
                  padding: '1px 6px',
                  borderRadius: '99px',
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* =========================================================================
          TAB 1: EXPLORE / CHOPS PAGE
          ========================================================================= */}
      {activeTab === 'explore' && (
        <div className="animate-fade-in">
          {/* Active Order Live Tracker Banner (If in progress) */}
          {activeOrder && (
            <div
              style={{
                background: '#FFFAF0',
                border: '3px solid #090C0B',
                borderRadius: '22px',
                boxShadow: '0 6px 0 #090C0B',
                padding: '18px 20px',
                marginBottom: '24px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '14px',
                      background: '#FF5500',
                      border: '2px solid #090C0B',
                      boxShadow: '0 3px 0 #090C0B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                    }}
                  >
                    <Bike size={22} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          background: '#FF5500',
                          color: '#FFFFFF',
                          fontWeight: 900,
                          fontSize: '10px',
                          textTransform: 'uppercase',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          letterSpacing: '0.5px',
                        }}
                      >
                        Active Order
                      </span>
                      <strong style={{ fontSize: '15px', color: '#090C0B' }}>
                        {activeOrder.vendorName}
                      </strong>
                    </div>
                    <p style={{ margin: '3px 0 0', fontSize: '13px', color: '#525C57', fontWeight: 600 }}>
                      Courier on the way to {activeOrder.deliveryAddress?.hostelOrBuilding || 'Hostel'} • ETA: ~12 mins
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {/* Secret Student PIN */}
                  <div
                    style={{
                      background: '#FFC501',
                      border: '2px solid #090C0B',
                      borderRadius: '12px',
                      padding: '6px 12px',
                      textAlign: 'center',
                    }}
                  >
                    <span style={{ fontSize: '10px', fontWeight: 900, display: 'block', color: '#090C0B', textTransform: 'uppercase' }}>
                      Delivery PIN
                    </span>
                    <strong style={{ fontFamily: 'monospace', fontSize: '16px', fontWeight: 900, color: '#090C0B', letterSpacing: '1px' }}>
                      {activeOrder.deliveryCode}
                    </strong>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveTrackingOrderId(activeOrder.id)}
                    style={{
                      background: '#090C0B',
                      color: '#FFFFFF',
                      border: '2px solid #090C0B',
                      borderRadius: '12px',
                      padding: '10px 16px',
                      fontWeight: 800,
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>Track Live</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Promo & Daily Perks Banner */}
          <div
            style={{
              background: 'linear-gradient(135deg, #FF5500 0%, #E04400 100%)',
              border: '3px solid #090C0B',
              borderRadius: '24px',
              boxShadow: '0 8px 0 #090C0B',
              padding: '24px 22px',
              color: '#FFFFFF',
              marginBottom: '26px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ maxWidth: '640px', position: 'relative', zIndex: 2 }}>
              <span
                style={{
                  background: '#FFC501',
                  color: '#090C0B',
                  border: '1.5px solid #090C0B',
                  fontWeight: 900,
                  fontSize: '11px',
                  padding: '3px 10px',
                  borderRadius: '99px',
                  display: 'inline-block',
                  marginBottom: '10px',
                }}
              >
                ⚡ CAMPUS LUNCH SPECIAL
              </span>
              <h3 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 900, letterSpacing: '-1px', margin: '0 0 8px', lineHeight: 1.15 }}>
                Get ₦300 OFF hot canteens with code{' '}
                <span
                  onClick={() => {
                    navigator.clipboard?.writeText('KULAWEB');
                    showToast('Code KULAWEB copied! 🎁', 'success');
                  }}
                  title="Click to copy"
                  style={{
                    background: '#FFC501',
                    color: '#090C0B',
                    padding: '2px 8px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'inline-block',
                    border: '2px solid #090C0B',
                  }}
                >
                  KULAWEB
                </span>
              </h3>
              <p style={{ margin: 0, fontSize: '13.5px', fontWeight: 600, opacity: 0.95 }}>
                Order from Madam Kofo, Akoka Grill, Mama Put & more. Fast dispatch straight to your room!
              </p>
            </div>
          </div>

          {/* Search Shortcut Pill Bar */}
          <div
            onClick={() => setActiveTab('search')}
            style={{
              background: '#FFFFFF',
              border: '2.5px solid #090C0B',
              borderRadius: '16px',
              boxShadow: '0 4px 0 #090C0B',
              padding: '12px 18px',
              marginBottom: '22px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              color: '#8E9993',
            }}
          >
            <Search size={18} color="#FF5500" />
            <span style={{ fontSize: '14px', fontWeight: 700, flex: 1, color: '#525C57' }}>
              Craving Shawarma, Party Jollof, Asun, or Cold Drinks? Tap to search...
            </span>
            <span
              style={{
                background: '#FF5500',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 800,
                padding: '4px 10px',
                borderRadius: '8px',
              }}
            >
              Search
            </span>
          </div>

          {/* Category Horizontal Scroll Pills */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 900, color: '#090C0B', margin: 0 }}>
                Campus Food Categories
              </h3>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#FF5500' }}>
                {filteredVendors.length} spots open
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                gap: '10px',
                overflowX: 'auto',
                paddingBottom: '8px',
                scrollbarWidth: 'none',
              }}
            >
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      background: isSelected ? '#090C0B' : '#FFFFFF',
                      color: isSelected ? '#FFC501' : '#090C0B',
                      border: '2px solid #090C0B',
                      borderRadius: '999px',
                      padding: '8px 16px',
                      fontWeight: 800,
                      fontSize: '13px',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: isSelected ? '0 4px 0 #FF5500' : '0 2px 0 #090C0B',
                      transition: 'transform 0.1s ease',
                    }}
                  >
                    <span>{cat.emoji}</span>
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Filter Toggles */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'wrap',
              marginBottom: '20px',
            }}
          >
            {[
              { id: 'all', label: 'All Canteens' },
              { id: 'open', label: '🟢 Open Now' },
              { id: 'fast', label: '⚡ Under 20 min' },
              { id: 'topRated', label: '⭐ Top Rated (4.8+)' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setVendorFilter(f.id as any)}
                style={{
                  background: vendorFilter === f.id ? '#FF5500' : '#FFFFFF',
                  color: vendorFilter === f.id ? '#FFFFFF' : '#090C0B',
                  border: '2px solid #090C0B',
                  borderRadius: '10px',
                  padding: '5px 12px',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: vendorFilter === f.id ? '0 2px 0 #090C0B' : 'none',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Vendors Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
              gap: '20px',
              marginBottom: '36px',
            }}
          >
            {filteredVendors.map((vendor) => (
              <div
                key={vendor.id}
                onClick={() => setSelectedVendorForMenu(vendor)}
                style={{
                  background: '#FFFFFF',
                  border: '3px solid #090C0B',
                  borderRadius: '22px',
                  boxShadow: '0 6px 0 #090C0B',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 9px 0 #090C0B';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 0 #090C0B';
                }}
              >
                {/* Banner Image Container */}
                <div style={{ position: 'relative', height: '160px', width: '100%', background: '#F0F3F1' }}>
                  <img
                    src={vendor.bannerImage}
                    alt={vendor.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                  {/* Open / Closed pill */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      background: vendor.isOpen ? '#090C0B' : '#E80B2E',
                      color: vendor.isOpen ? '#FFC501' : '#FFFFFF',
                      border: '1.5px solid #090C0B',
                      fontSize: '10px',
                      fontWeight: 900,
                      padding: '3px 8px',
                      borderRadius: '8px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {vendor.isOpen ? '🟢 Open' : 'Closed'}
                  </span>

                  {/* Rating pill */}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10px',
                      background: '#FFFFFF',
                      color: '#090C0B',
                      border: '1.5px solid #090C0B',
                      fontSize: '11px',
                      fontWeight: 900,
                      padding: '3px 8px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <Star size={12} fill="#FFC501" color="#090C0B" />
                    <span>{vendor.rating}</span>
                    <span style={{ color: '#8E9993' }}>({vendor.reviewCount})</span>
                  </span>
                </div>

                {/* Content */}
                <div style={{ padding: '16px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 900, color: '#090C0B', margin: '0 0 4px' }}>
                    {vendor.name}
                  </h4>
                  <p style={{ fontSize: '12px', color: '#525C57', margin: '0 0 10px', fontWeight: 600, lineClamp: 1 }}>
                    {vendor.tagline}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '11.5px',
                      fontWeight: 800,
                      color: '#090C0B',
                      paddingTop: '10px',
                      borderTop: '1px solid #E5EAE7',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} color="#FF5500" />
                      <span>{vendor.prepTimeEstimate}</span>
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Bike size={13} color="#FF5500" />
                      <span>₦{vendor.deliveryFee} delivery</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Popular Student Dishes Quick-Add */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#090C0B', margin: 0 }}>
                Popular Campus Cravings 🍛
              </h3>
              <span style={{ fontSize: '12px', color: '#525C57', fontWeight: 700 }}>Quick 1-Tap Add</span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '16px',
              }}
            >
              {menuItems.slice(0, 4).map((item) => {
                const itemVendor = vendors.find((v) => v.id === item.vendorId);
                return (
                  <div
                    key={item.id}
                    style={{
                      background: '#FFFFFF',
                      border: '2.5px solid #090C0B',
                      borderRadius: '18px',
                      boxShadow: '0 4px 0 #090C0B',
                      padding: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '12px',
                        objectFit: 'cover',
                        border: '1.5px solid #090C0B',
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h5 style={{ fontSize: '13.5px', fontWeight: 800, color: '#090C0B', margin: '0 0 2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.name}
                      </h5>
                      <span style={{ fontSize: '11px', color: '#8E9993', fontWeight: 600, display: 'block' }}>
                        {itemVendor?.name.split(' ')[0]}
                      </span>
                      <strong style={{ fontSize: '13px', color: '#FF5500', fontWeight: 900 }}>
                        ₦{item.price.toLocaleString()}
                      </strong>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleQuickAdd(item)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '10px',
                        background: '#FF5500',
                        color: '#FFFFFF',
                        border: '2px solid #090C0B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 0 #090C0B',
                        flexShrink: 0,
                      }}
                    >
                      <Plus size={16} strokeWidth={3} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: SEARCH & BROWSE PAGE
          ========================================================================= */}
      {activeTab === 'search' && (
        <div className="animate-fade-in">
          {/* Large Sticky Search Input */}
          <div
            style={{
              background: '#FFFFFF',
              border: '3px solid #090C0B',
              borderRadius: '20px',
              boxShadow: '0 6px 0 #090C0B',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px',
            }}
          >
            <Search size={22} color="#FF5500" />
            <input
              type="text"
              placeholder="Search canteen, Shawarma, Jollof, Suya, Drinks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                fontSize: '15px',
                fontWeight: 700,
                color: '#090C0B',
                fontFamily: 'inherit',
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  background: '#F0F3F1',
                  border: '1px solid #090C0B',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 900,
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Trending Chips */}
          <div style={{ marginBottom: '24px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#525C57', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              🔥 Trending Campus Searches
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Shawarma', 'Party Jollof', 'Peppered Chicken', 'Amala & Gbegiri', 'Chillers & Parfait', 'Suya Box'].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setSearchQuery(chip)}
                  style={{
                    background: '#FFFFFF',
                    border: '2px solid #090C0B',
                    borderRadius: '10px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    boxShadow: '0 2px 0 #090C0B',
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Search Results Display */}
          {searchQuery ? (
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#090C0B', marginBottom: '16px' }}>
                Search Results for "{searchQuery}"
              </h3>

              {searchResults.matchingVendors.length === 0 && searchResults.matchingItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', background: '#FFFFFF', border: '2px dashed #DDD6CA', borderRadius: '18px' }}>
                  <p style={{ fontSize: '15px', fontWeight: 800, color: '#090C0B' }}>No dishes found matching "{searchQuery}"</p>
                  <p style={{ fontSize: '13px', color: '#8E9993' }}>Try searching for Shawarma, Jollof, Chicken, or Drinks!</p>
                </div>
              ) : (
                <>
                  {/* Matching Vendors */}
                  {searchResults.matchingVendors.length > 0 && (
                    <div style={{ marginBottom: '24px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#525C57', marginBottom: '10px' }}>
                        Matching Canteens ({searchResults.matchingVendors.length})
                      </h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
                        {searchResults.matchingVendors.map((v) => (
                          <div
                            key={v.id}
                            onClick={() => setSelectedVendorForMenu(v)}
                            style={{
                              background: '#FFFFFF',
                              border: '2px solid #090C0B',
                              borderRadius: '14px',
                              boxShadow: '0 4px 0 #090C0B',
                              padding: '12px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                            }}
                          >
                            <img src={v.logo} alt={v.name} style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover' }} />
                            <div>
                              <strong style={{ fontSize: '14px', color: '#090C0B', display: 'block' }}>{v.name}</strong>
                              <span style={{ fontSize: '11px', color: '#525C57' }}>⭐ {v.rating} • {v.prepTimeEstimate}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Matching Menu Items */}
                  {searchResults.matchingItems.length > 0 && (
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#525C57', marginBottom: '10px' }}>
                        Matching Dishes ({searchResults.matchingItems.length})
                      </h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
                        {searchResults.matchingItems.map((item) => {
                          const v = vendors.find((vend) => vend.id === item.vendorId);
                          return (
                            <div
                              key={item.id}
                              style={{
                                background: '#FFFFFF',
                                border: '2px solid #090C0B',
                                borderRadius: '16px',
                                boxShadow: '0 4px 0 #090C0B',
                                padding: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                              }}
                            >
                              <img src={item.image} alt={item.name} style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover' }} />
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <strong style={{ fontSize: '14px', color: '#090C0B', display: 'block' }}>{item.name}</strong>
                                <span style={{ fontSize: '11px', color: '#525C57' }}>{v?.name}</span>
                                <div style={{ marginTop: '4px', fontSize: '13px', fontWeight: 900, color: '#FF5500' }}>
                                  ₦{item.price.toLocaleString()}
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleQuickAdd(item)}
                                style={{
                                  background: '#FF5500',
                                  color: '#FFFFFF',
                                  border: '1.5px solid #090C0B',
                                  borderRadius: '8px',
                                  padding: '8px 12px',
                                  fontWeight: 800,
                                  fontSize: '12px',
                                  cursor: 'pointer',
                                }}
                              >
                                + Add
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 900, color: '#090C0B', marginBottom: '12px' }}>
                Browse by Category
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
                {categories.slice(1).map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setActiveTab('explore');
                    }}
                    style={{
                      background: '#FFFFFF',
                      border: '2px solid #090C0B',
                      borderRadius: '16px',
                      boxShadow: '0 4px 0 #090C0B',
                      padding: '16px 12px',
                      textAlign: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ fontSize: '32px', display: 'block', marginBottom: '6px' }}>{cat.emoji}</span>
                    <strong style={{ fontSize: '13px', color: '#090C0B' }}>{cat.name}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 3: ORDERS PAGE (DEDICATED FULL-PAGE SCREEN)
          ========================================================================= */}
      {activeTab === 'orders' && (
        <div className="animate-fade-in">
          {/* Header & Sub-filters */}
          <div
            style={{
              background: '#FFFFFF',
              border: '3px solid #090C0B',
              borderRadius: '20px',
              boxShadow: '0 5px 0 #090C0B',
              padding: '16px 20px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#090C0B', margin: 0 }}>
                My Campus Orders
              </h3>
              <p style={{ fontSize: '12px', color: '#525C57', margin: '2px 0 0' }}>
                Track live hostel deliveries and 1-click re-order your favorite combos.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { id: 'all', label: `All (${orders.length})` },
                { id: 'active', label: `Active (${activeOrder ? 1 : 0})` },
                { id: 'completed', label: 'Past Orders' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setOrdersSubFilter(f.id as any)}
                  style={{
                    background: ordersSubFilter === f.id ? '#090C0B' : '#F5F7F6',
                    color: ordersSubFilter === f.id ? '#FFC501' : '#090C0B',
                    border: '1.5px solid #090C0B',
                    borderRadius: '10px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Orders List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {orders
              .filter((o) => {
                if (ordersSubFilter === 'active') return o.status !== 'delivered' && o.status !== 'cancelled';
                if (ordersSubFilter === 'completed') return o.status === 'delivered';
                return true;
              })
              .map((order) => {
                const isActive = order.status !== 'delivered' && order.status !== 'cancelled';
                return (
                  <div
                    key={order.id}
                    style={{
                      background: '#FFFFFF',
                      border: '3px solid #090C0B',
                      borderRadius: '22px',
                      boxShadow: '0 6px 0 #090C0B',
                      padding: '20px',
                      position: 'relative',
                    }}
                  >
                    {/* Top Row: Vendor & Status */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                          src={order.vendorImage}
                          alt={order.vendorName}
                          style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover', border: '2px solid #090C0B' }}
                        />
                        <div>
                          <strong style={{ fontSize: '16px', fontWeight: 900, color: '#090C0B', display: 'block' }}>
                            {order.vendorName}
                          </strong>
                          <span style={{ fontSize: '12px', color: '#525C57', fontWeight: 600 }}>
                            Order #{order.orderNumber} • {order.items.length} item(s)
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          style={{
                            background: isActive ? '#FF5500' : '#E6F8F0',
                            color: isActive ? '#FFFFFF' : '#087A4F',
                            border: '1.5px solid #090C0B',
                            fontWeight: 900,
                            fontSize: '11px',
                            padding: '4px 10px',
                            borderRadius: '8px',
                            textTransform: 'uppercase',
                          }}
                        >
                          {isActive ? '🛵 On The Way' : '✅ Delivered'}
                        </span>
                      </div>
                    </div>

                    {/* Active Order Highlight with PIN */}
                    {isActive && (
                      <div
                        style={{
                          background: '#FFFAF0',
                          border: '2px solid #090C0B',
                          borderRadius: '14px',
                          padding: '12px 16px',
                          marginBottom: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '10px',
                        }}
                      >
                        <div>
                          <span style={{ fontSize: '11px', fontWeight: 800, color: '#525C57', display: 'block' }}>
                            YOUR SECRET DELIVERY CODE:
                          </span>
                          <strong style={{ fontSize: '20px', fontWeight: 900, fontFamily: 'monospace', letterSpacing: '2px', color: '#090C0B' }}>
                            {order.deliveryCode}
                          </strong>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveTrackingOrderId(order.id)}
                          style={{
                            background: '#FF5500',
                            color: '#FFFFFF',
                            border: '2px solid #090C0B',
                            borderRadius: '10px',
                            padding: '8px 16px',
                            fontWeight: 800,
                            fontSize: '13px',
                            cursor: 'pointer',
                          }}
                        >
                          Open Live Map ↗
                        </button>
                      </div>
                    )}

                    {/* Items List */}
                    <div style={{ borderTop: '1px solid #E5EAE7', paddingTop: '12px', marginBottom: '14px' }}>
                      {order.items.map((it, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', margin: '4px 0', color: '#090C0B' }}>
                          <span>
                            <strong>{it.quantity}x</strong> {it.menuItem.name}
                          </span>
                          <span style={{ fontWeight: 700 }}>₦{it.totalPrice.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Row: Total & Actions */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderTop: '2px solid #090C0B',
                        paddingTop: '12px',
                        flexWrap: 'wrap',
                        gap: '10px',
                      }}
                    >
                      <div>
                        <span style={{ fontSize: '11px', color: '#525C57', fontWeight: 700, display: 'block' }}>Total Paid</span>
                        <strong style={{ fontSize: '17px', color: '#090C0B', fontWeight: 900 }}>
                          ₦{order.totalAmount.toLocaleString()}
                        </strong>
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        {order.status === 'delivered' && (
                          <button
                            type="button"
                            onClick={() => openRatingForOrder(order)}
                            style={{
                              background: '#FFF9E6',
                              border: '1.5px solid #090C0B',
                              borderRadius: '10px',
                              padding: '8px 14px',
                              fontSize: '12px',
                              fontWeight: 800,
                              cursor: 'pointer',
                            }}
                          >
                            ⭐ Rate Meal
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleReorder(order)}
                          style={{
                            background: '#FF5500',
                            color: '#FFFFFF',
                            border: '2px solid #090C0B',
                            borderRadius: '10px',
                            padding: '8px 14px',
                            fontSize: '12px',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                        >
                          <RotateCcw size={13} />
                          <span>Re-order 1-Click</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: WALLET & ACTIVITY PAGE (DEDICATED FULL-PAGE SCREEN)
          ========================================================================= */}
      {activeTab === 'wallet' && (
        <div className="animate-fade-in">
          {/* Main Wallet Card */}
          <div
            style={{
              background: 'linear-gradient(135deg, #090C0B 0%, #1A1F1D 100%)',
              border: '3px solid #090C0B',
              borderRadius: '24px',
              boxShadow: '0 8px 0 #FF5500',
              padding: '28px 24px',
              color: '#FFFFFF',
              marginBottom: '26px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 900, color: '#FFC501', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  KULACHOP CAMPUS WALLET
                </span>
                <h2 style={{ fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 900, margin: '8px 0 0', letterSpacing: '-1.5px' }}>
                  ₦{student.walletBalance.toLocaleString()}
                </h2>
              </div>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '14px',
                  background: '#FF5500',
                  border: '2px solid #FFC501',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                }}
              >
                <Wallet size={22} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '16px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#E5EAE7' }}>
                Account Holder: <strong>{student.name}</strong>
              </span>
              <span style={{ fontSize: '12px', background: 'rgba(255,197,1,0.2)', color: '#FFC501', padding: '3px 10px', borderRadius: '8px', fontWeight: 800 }}>
                2% Instant Cashback Active
              </span>
            </div>
          </div>

          {/* Quick Top Up Box */}
          <div
            style={{
              background: '#FFFFFF',
              border: '3px solid #090C0B',
              borderRadius: '22px',
              boxShadow: '0 6px 0 #090C0B',
              padding: '22px',
              marginBottom: '24px',
            }}
          >
            <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#090C0B', margin: '0 0 12px' }}>
              Top Up Wallet (Instant Debit & Bank Transfer)
            </h3>

            {/* Quick Amount Buttons */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {[1000, 2500, 5000, 10000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setWalletTopUpInput(amt.toString())}
                  style={{
                    background: walletTopUpInput === amt.toString() ? '#FF5500' : '#F5F7F6',
                    color: walletTopUpInput === amt.toString() ? '#FFFFFF' : '#090C0B',
                    border: '2px solid #090C0B',
                    borderRadius: '12px',
                    padding: '8px 16px',
                    fontWeight: 900,
                    fontSize: '13px',
                    cursor: 'pointer',
                    boxShadow: walletTopUpInput === amt.toString() ? '0 2px 0 #090C0B' : 'none',
                  }}
                >
                  +₦{amt.toLocaleString()}
                </button>
              ))}
            </div>

            {/* Custom Amount Form */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: '180px' }}>
                <span style={{ position: 'absolute', left: '14px', top: '12px', fontWeight: 900, fontSize: '15px', color: '#090C0B' }}>
                  ₦
                </span>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={walletTopUpInput}
                  onChange={(e) => setWalletTopUpInput(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 34px',
                    borderRadius: '12px',
                    border: '2px solid #090C0B',
                    fontSize: '15px',
                    fontWeight: 900,
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <button
                type="button"
                onClick={() => handleTopUp(parseInt(walletTopUpInput))}
                style={{
                  background: '#FFC501',
                  color: '#090C0B',
                  border: '2px solid #090C0B',
                  borderRadius: '12px',
                  padding: '12px 24px',
                  fontWeight: 900,
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 0 #090C0B',
                }}
              >
                Top Up Now
              </button>
            </div>
          </div>

          {/* Virtual Account Bank Transfer Info */}
          <div
            style={{
              background: '#FFF9E6',
              border: '2px solid #090C0B',
              borderRadius: '18px',
              padding: '16px 20px',
              marginBottom: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <strong style={{ fontSize: '14px', color: '#090C0B', display: 'block' }}>
                  Dedicated Student Virtual Account
                </strong>
                <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#525C57' }}>
                  Transfer from any banking app (OPay, PalmPay, GTB, Kuda) to fund instantly.
                </p>
                <div style={{ marginTop: '8px', fontSize: '14px', fontWeight: 900, fontFamily: 'monospace' }}>
                  WEMA BANK • <strong>0123456789</strong> • KULACHOP-{student.name.split(' ')[0].toUpperCase()}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText('0123456789');
                  showToast('Virtual Account number copied! 📋', 'success');
                }}
                style={{
                  background: '#090C0B',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '8px 14px',
                  fontWeight: 800,
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Copy size={13} />
                <span>Copy</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: PROFILE & HOSTEL SETTINGS (DEDICATED FULL-PAGE SCREEN)
          ========================================================================= */}
      {activeTab === 'profile' && (
        <div className="animate-fade-in">
          {/* Student Profile Card */}
          <div
            style={{
              background: '#FFFFFF',
              border: '3px solid #090C0B',
              borderRadius: '24px',
              boxShadow: '0 6px 0 #090C0B',
              padding: '24px',
              marginBottom: '22px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#FF5500',
                  border: '3px solid #090C0B',
                  boxShadow: '0 4px 0 #090C0B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: 900,
                  fontSize: '26px',
                }}
              >
                {student.name.charAt(0)}
              </div>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#090C0B', margin: '0 0 4px' }}>
                  {student.name}
                </h3>
                <span style={{ fontSize: '13px', color: '#525C57', fontWeight: 600, display: 'block' }}>
                  {student.phone} • {student.email}
                </span>
                <span
                  style={{
                    background: '#E6F8F0',
                    color: '#087A4F',
                    border: '1.5px solid #087A4F',
                    fontWeight: 800,
                    fontSize: '11px',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    display: 'inline-block',
                    marginTop: '6px',
                  }}
                >
                  ✅ {selectedCampus.name}
                </span>
              </div>
            </div>

            {/* Saved Hostel Delivery Point */}
            <div
              style={{
                background: '#F8FAF9',
                border: '2px solid #090C0B',
                borderRadius: '16px',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#8E9993', textTransform: 'uppercase' }}>
                  DEFAULT HOSTEL DROP-OFF
                </span>
                <strong style={{ fontSize: '14px', color: '#090C0B', display: 'block', marginTop: '2px' }}>
                  {defaultAddress?.hostelOrBuilding || 'Moremi Hall'}, {defaultAddress?.blockOrFloor || 'Block B'}, {defaultAddress?.roomOrNumber || 'Room 214'}
                </strong>
                <span style={{ fontSize: '12px', color: '#525C57' }}>
                  Landmark: {defaultAddress?.landmark || 'Beside common room'}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsCampusModalOpen(true)}
                style={{
                  background: '#FFFFFF',
                  border: '1.5px solid #090C0B',
                  borderRadius: '10px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                Change ▾
              </button>
            </div>
          </div>

          {/* Referral & Rewards Card */}
          <div
            style={{
              background: '#FFF9E6',
              border: '3px solid #090C0B',
              borderRadius: '20px',
              boxShadow: '0 6px 0 #090C0B',
              padding: '20px',
              marginBottom: '22px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Sparkles size={18} color="#FF5500" />
              <strong style={{ fontSize: '15px', fontWeight: 900, color: '#090C0B' }}>
                Refer a Roommate, Get ₦500 Wallet Credit
              </strong>
            </div>
            <p style={{ margin: '0 0 12px', fontSize: '12.5px', color: '#525C57' }}>
              Share your personal student invite code. When your roommate places their first meal order, both of you get ₦500 instantly!
            </p>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div
                style={{
                  background: '#FFFFFF',
                  border: '2px dashed #090C0B',
                  borderRadius: '10px',
                  padding: '8px 16px',
                  fontWeight: 900,
                  fontSize: '16px',
                  fontFamily: 'monospace',
                  letterSpacing: '1px',
                }}
              >
                TOBI-KULA
              </div>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText('TOBI-KULA');
                  showToast('Referral code TOBI-KULA copied! 🎁', 'success');
                }}
                style={{
                  background: '#090C0B',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px 16px',
                  fontWeight: 800,
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Copy size={14} />
                <span>Copy Code</span>
              </button>
            </div>
          </div>

          {/* Sign Out Button */}
          <button
            type="button"
            onClick={logout}
            style={{
              width: '100%',
              background: '#FFF0F0',
              color: '#E80B2E',
              border: '2.5px solid #E80B2E',
              borderRadius: '16px',
              padding: '14px',
              fontWeight: 900,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 0 #E80B2E',
            }}
          >
            <LogOut size={16} />
            <span>Sign Out of Kulachops</span>
          </button>
        </div>
      )}
    </div>
  );
};
