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
  // Wallet,
  RotateCcw,
  Sparkles,
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
    // topUpWallet,
    showToast,
    logout,
    openRatingForOrder,
  } = useApp();

  // Local State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [vendorFilter, setVendorFilter] = useState<'all' | 'open' | 'fast' | 'topRated'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  // const [walletTopUpInput, setWalletTopUpInput] = useState<string>('2500');
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
    { id: 'all', name: 'All', emoji: '🍽️' },
    { id: 'Rice Dishes', name: 'Rice & Bowls', emoji: '🍚' },
    { id: 'Grills & Shawarma', name: 'Shawarma & Grills', emoji: '🌯' },
    { id: 'Swallow', name: 'Swallow & Soups', emoji: '🍲' },
    { id: 'Late Night', name: 'Late Night (2AM)', emoji: '🌙' },
    { id: 'Chillers', name: 'Drinks & Chillers', emoji: '🧋' },
    { id: 'Quick Bites', name: 'Quick Snacks', emoji: '🥪' },
  ];

  // Filtered vendors for Explore tab
  const filteredVendors = useMemo(() => {
    return vendors.filter((v) => {
      if (selectedCategory !== 'all') {
        const matchesCat = v.cuisineTypes.some((c) =>
          c.toLowerCase().includes(selectedCategory.toLowerCase())
        );
        if (!matchesCat) return false;
      }
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
    showToast(`Added to your bag! 🛍️`, 'success');
  };

  /*
  // Wallet Top-up Handler (commented out)
  const handleTopUp = (amount: number) => {
    if (isNaN(amount) || amount <= 0) {
      showToast('Please enter a valid amount', 'error');
      return;
    }
    topUpWallet(amount);
    showToast(`₦${amount.toLocaleString()} credited to your wallet! 🎉`, 'success');
  };
  */

  return (
    <div className="kula-dashboard-wrapper" style={{ maxWidth: '1160px', margin: '0 auto', padding: '20px 24px 80px' }}>
      {/* =========================================================================
          MOBILE-ONLY TOP STATUS CAPSULE (Hidden on desktop where sidebar exists)
          ========================================================================= */}
      <div
        className="kula-mobile-only-header"
        style={{
          background: '#FFFFFF',
          border: '1.5px solid #E5E7EB',
          borderRadius: '16px',
          padding: '14px 16px',
          marginBottom: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            onClick={() => setActiveTab('profile')}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: '#FF5500',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            {student.name.charAt(0)}
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#111827' }}>
              Hey, {student.name.split(' ')[0]} 👋
            </div>
            <button
              type="button"
              onClick={() => setIsCampusModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: 'transparent',
                border: 'none',
                padding: 0,
                color: '#6B7280',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              <MapPin size={11} color="#FF5500" />
              <span>{defaultAddress?.hostelOrBuilding || 'Moremi Hall'}</span>
              <span style={{ color: '#FF5500', fontWeight: 700 }}>▾</span>
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/*
          <button
            type="button"
            onClick={() => setActiveTab('wallet')}
            style={{
              background: '#F9FAFB',
              border: '1px solid #E5E7EB',
              borderRadius: '10px',
              padding: '6px 10px',
              fontSize: '12px',
              fontWeight: 700,
              color: '#111827',
              cursor: 'pointer',
            }}
          >
            ₦{student.walletBalance.toLocaleString()}
          </button>
          */}
          {cartCount > 0 && (
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              style={{
                background: '#FF5500',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '10px',
                padding: '6px 10px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <ShoppingBag size={13} />
              <span>{cartCount}</span>
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          DESKTOP-ONLY CLEAN HEADER BAR
          ========================================================================= */}
      <div
        className="kula-desktop-only-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          marginBottom: '24px',
        }}
      >
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#111827', margin: '0 0 4px', letterSpacing: '-0.5px' }}>
            {activeTab === 'explore' && `Explore Canteens`}
            {activeTab === 'search' && `Search Food & Canteens`}
            {activeTab === 'orders' && `Your Orders`}
            {/* {activeTab === 'wallet' && `Campus Wallet`} */}
            {activeTab === 'profile' && `Student Profile`}
          </h1>
          <p style={{ margin: 0, fontSize: '13.5px', color: '#6B7280' }}>
            {activeTab === 'explore' && `Delivering to ${defaultAddress?.hostelOrBuilding || 'Moremi Hall'} at ${selectedCampus.shortName}`}
            {activeTab === 'search' && `Find anything you're craving across campus`}
            {activeTab === 'orders' && `Track active deliveries and view past meals`}
            {/* {activeTab === 'wallet' && `Manage funds, bank transfers, and student cashback`} */}
            {activeTab === 'profile' && `Account details, hostel address, and settings`}
          </p>
        </div>

        {/* Desktop Quick Search Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              position: 'relative',
              width: '280px',
            }}
          >
            <Search size={15} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '11px' }} />
            <input
              type="text"
              placeholder="Search dishes or canteens..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'search') setActiveTab('search');
              }}
              style={{
                width: '100%',
                padding: '9px 12px 9px 34px',
                borderRadius: '10px',
                border: '1px solid #E5E7EB',
                background: '#FFFFFF',
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
                color: '#111827',
              }}
            />
          </div>

          {cartCount > 0 && (
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              style={{
                background: '#FF5500',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '10px',
                padding: '9px 14px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
              }}
            >
              <ShoppingBag size={15} />
              <span>Bag ({cartCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          TAB 1: EXPLORE / CANTEENS PAGE
          ========================================================================= */}
      {activeTab === 'explore' && (
        <div className="animate-fade-in">
          {/* Active Order Banner (Clean, Minimal, Informative) */}
          {activeOrder && (
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderLeft: '4px solid #FF5500',
                borderRadius: '12px',
                padding: '14px 18px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: '#FFF5EE',
                    color: '#FF5500',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Bike size={18} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: '#FF5500',
                        display: 'inline-block',
                      }}
                    />
                    <strong style={{ fontSize: '13.5px', color: '#111827' }}>
                      Courier on the way from {activeOrder.vendorName}
                    </strong>
                  </div>
                  <span style={{ fontSize: '12px', color: '#6B7280' }}>
                    ETA: ~12 mins to {activeOrder.deliveryAddress?.hostelOrBuilding || 'Hostel'} • Delivery PIN:{' '}
                    <strong style={{ color: '#111827', fontFamily: 'monospace' }}>{activeOrder.deliveryCode}</strong>
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveTrackingOrderId(activeOrder.id)}
                style={{
                  background: '#111827',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '7px 14px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Track Live ➔
              </button>
            </div>
          )}

          {/* Slim Promo Strip (Replaces the giant screaming orange block) */}
          <div
            style={{
              background: '#FFF7ED',
              border: '1px solid #FFEDD5',
              borderRadius: '12px',
              padding: '10px 16px',
              marginBottom: '22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '10px',
              fontSize: '13px',
              color: '#9A3412',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} color="#EA580C" />
              <span>
                Use code <strong style={{ color: '#C2410C' }}>KULAWEB</strong> for ₦300 off your food order today!
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText('KULAWEB');
                showToast('Code KULAWEB copied! 🎁', 'success');
              }}
              style={{
                background: '#FFFFFF',
                border: '1px solid #FDBA74',
                color: '#C2410C',
                borderRadius: '6px',
                padding: '4px 10px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Copy Code
            </button>
          </div>

          {/* Categories Horizontal Scroll */}
          <div style={{ marginBottom: '22px' }}>
            <div
              style={{
                display: 'flex',
                gap: '8px',
                overflowX: 'auto',
                paddingBottom: '4px',
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
                      background: isSelected ? '#111827' : '#FFFFFF',
                      color: isSelected ? '#FFFFFF' : '#4B5563',
                      border: isSelected ? '1px solid #111827' : '1px solid #E5E7EB',
                      borderRadius: '99px',
                      padding: '7px 14px',
                      fontWeight: 600,
                      fontSize: '12.5px',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span>{cat.emoji}</span>
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filter Chips Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '10px',
              marginBottom: '18px',
            }}
          >
            <div style={{ display: 'flex', gap: '6px' }}>
              {[
                { id: 'all', label: 'All Canteens' },
                { id: 'open', label: 'Open Now' },
                { id: 'fast', label: 'Under 20m' },
                { id: 'topRated', label: 'Top Rated (4.8+)' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setVendorFilter(f.id as any)}
                  style={{
                    background: vendorFilter === f.id ? '#111827' : '#FFFFFF',
                    color: vendorFilter === f.id ? '#FFFFFF' : '#4B5563',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    padding: '5px 10px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>
              {filteredVendors.length} canteens available
            </span>
          </div>

          {/* Clean Canteen Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '18px',
              marginBottom: '36px',
            }}
          >
            {filteredVendors.map((vendor) => (
              <div
                key={vendor.id}
                onClick={() => setSelectedVendorForMenu(vendor)}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#D1D5DB';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
                }}
              >
                {/* Banner Image */}
                <div style={{ position: 'relative', height: '145px', width: '100%', background: '#F3F4F6' }}>
                  <img
                    src={vendor.bannerImage}
                    alt={vendor.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                  {!vendor.isOpen && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        background: 'rgba(17,24,39,0.85)',
                        color: '#FFFFFF',
                        fontSize: '10.5px',
                        fontWeight: 700,
                        padding: '2px 7px',
                        borderRadius: '6px',
                      }}
                    >
                      Closed
                    </span>
                  )}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '8px',
                      right: '8px',
                      background: 'rgba(255,255,255,0.92)',
                      backdropFilter: 'blur(4px)',
                      color: '#111827',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '2px 7px',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                    }}
                  >
                    <Star size={11} fill="#F59E0B" color="#F59E0B" />
                    <span>{vendor.rating}</span>
                  </span>
                </div>

                {/* Content */}
                <div style={{ padding: '14px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#111827', margin: '0 0 3px' }}>
                    {vendor.name}
                  </h4>
                  <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 10px', lineClamp: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {vendor.tagline}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '11.5px',
                      color: '#4B5563',
                      fontWeight: 600,
                      borderTop: '1px solid #F3F4F6',
                      paddingTop: '8px',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} color="#9CA3AF" />
                      <span>{vendor.prepTimeEstimate}</span>
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Bike size={12} color="#9CA3AF" />
                      <span>₦{vendor.deliveryFee}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Popular Campus Dishes */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#111827', margin: 0 }}>
                Popular on Campus
              </h3>
              <span style={{ fontSize: '12px', color: '#6B7280' }}>Quick add</span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '14px',
              }}
            >
              {menuItems.slice(0, 4).map((item) => {
                const itemVendor = vendors.find((v) => v.id === item.vendorId);
                return (
                  <div
                    key={item.id}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '14px',
                      padding: '10px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '10px',
                        objectFit: 'cover',
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h5 style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: '0 0 1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.name}
                      </h5>
                      <span style={{ fontSize: '11px', color: '#9CA3AF', display: 'block' }}>
                        {itemVendor?.name.split(' ')[0]}
                      </span>
                      <strong style={{ fontSize: '12.5px', color: '#111827', fontWeight: 800 }}>
                        ₦{item.price.toLocaleString()}
                      </strong>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleQuickAdd(item)}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        background: '#F3F4F6',
                        color: '#111827',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'background 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#FF5500';
                        e.currentTarget.style.color = '#FFFFFF';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#F3F4F6';
                        e.currentTarget.style.color = '#111827';
                      }}
                    >
                      <Plus size={15} />
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
          {/* Main Search Input */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '14px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '18px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            }}
          >
            <Search size={18} color="#9CA3AF" />
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
                fontSize: '14px',
                fontWeight: 600,
                color: '#111827',
                fontFamily: 'inherit',
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  background: '#F3F4F6',
                  border: 'none',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '11px',
                  color: '#6B7280',
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Trending Chips */}
          <div style={{ marginBottom: '20px' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#6B7280', display: 'block', marginBottom: '8px' }}>
              POPULAR SEARCHES
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {['Shawarma', 'Party Jollof', 'Peppered Chicken', 'Amala', 'Chillers', 'Suya Box'].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setSearchQuery(chip)}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    padding: '5px 10px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#374151',
                    cursor: 'pointer',
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Search Results */}
          {searchQuery ? (
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#111827', marginBottom: '14px' }}>
                Results for "{searchQuery}"
              </h3>

              {searchResults.matchingVendors.length === 0 && searchResults.matchingItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '36px 20px', background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '14px' }}>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>No dishes found matching "{searchQuery}"</p>
                  <p style={{ fontSize: '12px', color: '#6B7280' }}>Try Shawarma, Jollof, or Drinks!</p>
                </div>
              ) : (
                <>
                  {searchResults.matchingVendors.length > 0 && (
                    <div style={{ marginBottom: '22px' }}>
                      <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#6B7280', marginBottom: '8px' }}>
                        Canteens ({searchResults.matchingVendors.length})
                      </h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
                        {searchResults.matchingVendors.map((v) => (
                          <div
                            key={v.id}
                            onClick={() => setSelectedVendorForMenu(v)}
                            style={{
                              background: '#FFFFFF',
                              border: '1px solid #E5E7EB',
                              borderRadius: '12px',
                              padding: '10px 12px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                            }}
                          >
                            <img src={v.logo} alt={v.name} style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover' }} />
                            <div>
                              <strong style={{ fontSize: '13.5px', color: '#111827', display: 'block' }}>{v.name}</strong>
                              <span style={{ fontSize: '11px', color: '#6B7280' }}>⭐ {v.rating} • {v.prepTimeEstimate}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {searchResults.matchingItems.length > 0 && (
                    <div>
                      <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#6B7280', marginBottom: '8px' }}>
                        Dishes ({searchResults.matchingItems.length})
                      </h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
                        {searchResults.matchingItems.map((item) => {
                          const v = vendors.find((vend) => vend.id === item.vendorId);
                          return (
                            <div
                              key={item.id}
                              style={{
                                background: '#FFFFFF',
                                border: '1px solid #E5E7EB',
                                borderRadius: '12px',
                                padding: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                              }}
                            >
                              <img src={item.image} alt={item.name} style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover' }} />
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <strong style={{ fontSize: '13px', color: '#111827', display: 'block' }}>{item.name}</strong>
                                <span style={{ fontSize: '11px', color: '#6B7280' }}>{v?.name}</span>
                                <div style={{ marginTop: '2px', fontSize: '12.5px', fontWeight: 800, color: '#111827' }}>
                                  ₦{item.price.toLocaleString()}
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleQuickAdd(item)}
                                style={{
                                  background: '#111827',
                                  color: '#FFFFFF',
                                  border: 'none',
                                  borderRadius: '6px',
                                  padding: '6px 10px',
                                  fontWeight: 700,
                                  fontSize: '11.5px',
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
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#111827', marginBottom: '10px' }}>
                Browse by Category
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '10px' }}>
                {categories.slice(1).map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setActiveTab('explore');
                    }}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '12px',
                      padding: '14px 10px',
                      textAlign: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ fontSize: '26px', display: 'block', marginBottom: '4px' }}>{cat.emoji}</span>
                    <strong style={{ fontSize: '12px', color: '#111827' }}>{cat.name}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 3: ORDERS PAGE
          ========================================================================= */}
      {activeTab === 'orders' && (
        <div className="animate-fade-in">
          {/* Header & Sub-filters */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '14px',
              padding: '14px 18px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#111827', margin: 0 }}>
                Orders
              </h3>
              <p style={{ fontSize: '12px', color: '#6B7280', margin: '2px 0 0' }}>
                Track live deliveries and re-order previous meals.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              {[
                { id: 'all', label: `All (${orders.length})` },
                { id: 'active', label: `Active (${activeOrder ? 1 : 0})` },
                { id: 'completed', label: 'Delivered' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setOrdersSubFilter(f.id as any)}
                  style={{
                    background: ordersSubFilter === f.id ? '#111827' : '#F9FAFB',
                    color: ordersSubFilter === f.id ? '#FFFFFF' : '#374151',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    padding: '5px 10px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Orders List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                      border: '1px solid #E5E7EB',
                      borderRadius: '16px',
                      padding: '18px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img
                          src={order.vendorImage}
                          alt={order.vendorName}
                          style={{ width: '40px', height: '40px', borderRadius: '10px', objectFit: 'cover' }}
                        />
                        <div>
                          <strong style={{ fontSize: '15px', fontWeight: 800, color: '#111827', display: 'block' }}>
                            {order.vendorName}
                          </strong>
                          <span style={{ fontSize: '11.5px', color: '#6B7280' }}>
                            Order #{order.orderNumber}
                          </span>
                        </div>
                      </div>

                      <span
                        style={{
                          background: isActive ? '#FFF7ED' : '#F0FDF4',
                          color: isActive ? '#C2410C' : '#15803D',
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '6px',
                        }}
                      >
                        {isActive ? '🛵 On The Way' : 'Delivered'}
                      </span>
                    </div>

                    {isActive && (
                      <div
                        style={{
                          background: '#FFF7ED',
                          border: '1px solid #FFEDD5',
                          borderRadius: '10px',
                          padding: '10px 14px',
                          marginBottom: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '8px',
                        }}
                      >
                        <div>
                          <span style={{ fontSize: '11px', color: '#9A3412', display: 'block' }}>
                            DELIVERY PIN:
                          </span>
                          <strong style={{ fontSize: '18px', fontWeight: 900, fontFamily: 'monospace', color: '#9A3412' }}>
                            {order.deliveryCode}
                          </strong>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveTrackingOrderId(order.id)}
                          style={{
                            background: '#111827',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '6px 12px',
                            fontWeight: 700,
                            fontSize: '12px',
                            cursor: 'pointer',
                          }}
                        >
                          Live Map ➔
                        </button>
                      </div>
                    )}

                    {/* Items List */}
                    <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '10px', marginBottom: '12px' }}>
                      {order.items.map((it, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', margin: '3px 0', color: '#374151' }}>
                          <span>
                            <strong>{it.quantity}x</strong> {it.menuItem.name}
                          </span>
                          <span style={{ fontWeight: 600 }}>₦{it.totalPrice.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderTop: '1px solid #F3F4F6',
                        paddingTop: '10px',
                        flexWrap: 'wrap',
                        gap: '8px',
                      }}
                    >
                      <div>
                        <span style={{ fontSize: '11px', color: '#6B7280' }}>Total Paid</span>
                        <strong style={{ fontSize: '15px', color: '#111827', display: 'block', fontWeight: 800 }}>
                          ₦{order.totalAmount.toLocaleString()}
                        </strong>
                      </div>

                      <div style={{ display: 'flex', gap: '6px' }}>
                        {order.status === 'delivered' && (
                          <button
                            type="button"
                            onClick={() => openRatingForOrder(order)}
                            style={{
                              background: '#F9FAFB',
                              border: '1px solid #E5E7EB',
                              borderRadius: '8px',
                              padding: '6px 12px',
                              fontSize: '12px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              color: '#374151',
                            }}
                          >
                            Rate Meal
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleReorder(order)}
                          style={{
                            background: '#111827',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '6px 12px',
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                          }}
                        >
                          <RotateCcw size={12} />
                          <span>Re-order</span>
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
          TAB 4: WALLET PAGE (commented out)
          ========================================================================= */}
      {/*
      {activeTab === 'wallet' && (
        <div className="animate-fade-in">
          ...
        </div>
      )}
      */}

      {/* =========================================================================
          TAB 5: PROFILE PAGE
          ========================================================================= */}
      {activeTab === 'profile' && (
        <div className="animate-fade-in">
          {/* Student Info Card */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '18px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: '#F3F4F6',
                  color: '#111827',
                  fontWeight: 900,
                  fontSize: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {student.name.charAt(0)}
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', margin: '0 0 2px' }}>
                  {student.name}
                </h3>
                <span style={{ fontSize: '12.5px', color: '#6B7280' }}>
                  {student.phone} • {student.email}
                </span>
              </div>
            </div>

            {/* Saved Hostel Delivery Point */}
            <div
              style={{
                background: '#F9FAFB',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <div>
                <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase' }}>
                  DEFAULT HOSTEL DROP-OFF
                </span>
                <strong style={{ fontSize: '13px', color: '#111827', display: 'block', marginTop: '2px' }}>
                  {defaultAddress?.hostelOrBuilding || 'Moremi Hall'}, {defaultAddress?.blockOrFloor || 'Block B'}, {defaultAddress?.roomOrNumber || 'Room 214'}
                </strong>
              </div>

              <button
                type="button"
                onClick={() => setIsCampusModalOpen(true)}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #D1D5DB',
                  borderRadius: '6px',
                  padding: '5px 10px',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Change
              </button>
            </div>
          </div>

          {/* Referral Card */}
          <div
            style={{
              background: '#FFF7ED',
              border: '1px solid #FFEDD5',
              borderRadius: '14px',
              padding: '16px',
              marginBottom: '18px',
            }}
          >
            <strong style={{ fontSize: '14px', fontWeight: 800, color: '#9A3412', display: 'block', marginBottom: '4px' }}>
              Refer a Roommate, Get ₦500
            </strong>
            <p style={{ margin: '0 0 10px', fontSize: '12px', color: '#C2410C' }}>
              Share code <strong style={{ fontFamily: 'monospace' }}>TOBI-KULA</strong>. Both get ₦500 on their first order.
            </p>

            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText('TOBI-KULA');
                showToast('Code TOBI-KULA copied! 🎁', 'success');
              }}
              style={{
                background: '#FFFFFF',
                border: '1px solid #FDBA74',
                color: '#C2410C',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Copy Code
            </button>
          </div>

          {/* Sign Out Button */}
          <button
            type="button"
            onClick={logout}
            style={{
              width: '100%',
              background: '#FEF2F2',
              color: '#DC2626',
              border: '1px solid #FCA5A5',
              borderRadius: '12px',
              padding: '12px',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};
