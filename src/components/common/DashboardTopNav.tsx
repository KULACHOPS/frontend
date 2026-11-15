import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Search,
  ShoppingBag,
  Bike,
  ChevronDown,
} from 'lucide-react';

export const DashboardTopNav: React.FC = () => {
  const {
    student,
    selectedCampus,
    setIsCampusModalOpen,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    orders,
    setActiveTrackingOrderId,
    cart,
    cartSubtotal,
    setIsCartOpen,
    setSelectedVendorForMenu,
  } = useApp();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const activeOrder = orders.find((o) => o.status !== 'delivered' && o.status !== 'cancelled');
  const defaultAddress = student.savedAddresses.find((a) => a.isDefault) || student.savedAddresses[0];

  const handleSearchFocus = () => {
    if (activeTab !== 'search') {
      setSelectedVendorForMenu(null);
      setActiveTab('search');
    }
  };

  return (
    <header
      className="kula-dashboard-top-nav"
      style={{
        height: '62px',
        position: 'sticky',
        top: 0,
        zIndex: 30,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid #E5E7EB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        boxSizing: 'border-box',
        gap: '16px',
      }}
    >
      {/* Left: Campus & Hostel Delivery Address Pill */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
        <button
          type="button"
          onClick={() => setIsCampusModalOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#F9FAFB',
            border: '1px solid #E5E7EB',
            borderRadius: '10px',
            padding: '6px 12px',
            cursor: 'pointer',
            fontSize: '12.5px',
            color: '#374151',
            transition: 'background 0.15s ease, border-color 0.15s ease',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#F3F4F6';
            e.currentTarget.style.borderColor = '#D1D5DB';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#F9FAFB';
            e.currentTarget.style.borderColor = '#E5E7EB';
          }}
        >
          <MapPin size={14} color="#FF5500" style={{ flexShrink: 0 }} />
          <span style={{ color: '#6B7280' }}>Delivering to:</span>
          <strong style={{ color: '#111827', fontWeight: 800 }}>
            {defaultAddress?.hostelOrBuilding || 'Moremi Hall'} ({defaultAddress?.roomOrNumber || 'Room 214'})
          </strong>
          <span style={{ fontSize: '11px', color: '#9CA3AF', margin: '0 2px' }}>•</span>
          <span style={{ color: '#6B7280', fontSize: '12px' }}>{selectedCampus.shortName}</span>
          <ChevronDown size={13} color="#9CA3AF" />
        </button>
      </div>

      {/* Center: Global Search Bar */}
      <div style={{ flex: 1, maxWidth: '440px', position: 'relative' }}>
        <Search
          size={15}
          color="#9CA3AF"
          style={{ position: 'absolute', left: '12px', top: '10px', pointerEvents: 'none' }}
        />
        <input
          type="text"
          placeholder="Search dishes, canteens, drinks..."
          value={searchQuery}
          onFocus={handleSearchFocus}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (activeTab !== 'search') {
              setSelectedVendorForMenu(null);
              setActiveTab('search');
            }
          }}
          style={{
            width: '100%',
            padding: '8px 12px 8px 34px',
            borderRadius: '10px',
            border: '1px solid #E5E7EB',
            background: '#F9FAFB',
            fontSize: '13px',
            fontWeight: 500,
            outline: 'none',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
            color: '#111827',
            transition: 'background 0.15s ease, border-color 0.15s ease',
          }}
          onFocusCapture={(e) => {
            e.currentTarget.style.background = '#FFFFFF';
            e.currentTarget.style.borderColor = '#FF5500';
          }}
          onBlurCapture={(e) => {
            e.currentTarget.style.background = '#F9FAFB';
            e.currentTarget.style.borderColor = '#E5E7EB';
          }}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            style={{
              position: 'absolute',
              right: '8px',
              top: '8px',
              background: '#E5E7EB',
              border: 'none',
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '10px',
              color: '#4B5563',
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Right: Quick Status & Cart Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        {/* Active Order Pill (if in progress) */}
        {activeOrder && (
          <button
            type="button"
            onClick={() => {
              setSelectedVendorForMenu(null);
              setActiveTab('orders');
              setActiveTrackingOrderId(activeOrder.id);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#FFF7ED',
              border: '1px solid #FFEDD5',
              borderRadius: '99px',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 700,
              color: '#C2410C',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#FF5500',
                display: 'inline-block',
                animation: 'pulseGlow 1.5s infinite',
              }}
            />
            <Bike size={13} color="#FF5500" />
            <span>Courier on the way</span>
          </button>
        )}

        {/* Food Bag Button */}
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: cartCount > 0 ? '#111827' : '#FFFFFF',
            color: cartCount > 0 ? '#FFFFFF' : '#374151',
            border: cartCount > 0 ? '1px solid #111827' : '1px solid #E5E7EB',
            borderRadius: '10px',
            padding: '7px 14px',
            fontSize: '12.5px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            if (cartCount === 0) {
              e.currentTarget.style.background = '#F9FAFB';
              e.currentTarget.style.borderColor = '#D1D5DB';
            }
          }}
          onMouseLeave={(e) => {
            if (cartCount === 0) {
              e.currentTarget.style.background = '#FFFFFF';
              e.currentTarget.style.borderColor = '#E5E7EB';
            }
          }}
        >
          <ShoppingBag size={14} color={cartCount > 0 ? '#FF5500' : '#4B5563'} />
          <span>Bag</span>
          {cartCount > 0 && (
            <span
              style={{
                background: '#FF5500',
                color: '#FFFFFF',
                borderRadius: '6px',
                padding: '1px 6px',
                fontSize: '11px',
                fontWeight: 800,
              }}
            >
              {cartCount}
            </span>
          )}
          {cartCount > 0 && (
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#D1D5DB' }}>
              • ₦{cartSubtotal.toLocaleString()}
            </span>
          )}
        </button>

        {/* Student Mini Avatar Pill */}
        <div
          onClick={() => {
            setSelectedVendorForMenu(null);
            setActiveTab('profile');
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            padding: '4px 6px',
            borderRadius: '8px',
            transition: 'background 0.15s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#F3F4F6')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#F3F4F6',
              color: '#111827',
              border: '1px solid #E5E7EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '13px',
            }}
          >
            {student.name.charAt(0)}
          </div>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>
            {student.name.split(' ')[0]}
          </span>
        </div>
      </div>
    </header>
  );
};
