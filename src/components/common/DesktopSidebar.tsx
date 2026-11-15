import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Flame,
  MapPin,
  Compass,
  Search,
  Receipt,
  // Wallet,
  User,
  ShoppingBag,
  LogOut,
} from 'lucide-react';
import type { StudentTab } from '../../types';

export const DesktopSidebar: React.FC = () => {
  const {
    student,
    selectedCampus,
    setIsCampusModalOpen,
    activeTab,
    setActiveTab,
    orders,
    cart,
    setIsCartOpen,
    setSelectedVendorForMenu,
    logout,
  } = useApp();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const activeOrder = orders.find((o) => o.status !== 'delivered' && o.status !== 'cancelled');

  const navItems: { id: StudentTab; label: string; icon: React.ComponentType<any>; badge?: string | null }[] = [
    { id: 'explore', label: 'Canteens', icon: Compass },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'orders', label: 'Orders', icon: Receipt, badge: activeOrder ? '1' : null },
    // { id: 'wallet', label: 'Wallet', icon: Wallet, badge: `₦${student.walletBalance.toLocaleString()}` },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const handleTabClick = (tabId: StudentTab) => {
    setSelectedVendorForMenu(null);
    setActiveTab(tabId);
  };

  return (
    <aside
      className="kula-desktop-sidebar"
      style={{
        width: '240px',
        minWidth: '240px',
        height: '100vh',
        position: 'sticky',
        top: 0,
        background: '#FFFFFF',
        borderRight: '1px solid #E5E7EB',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px 14px',
        boxSizing: 'border-box',
        zIndex: 40,
        overflowY: 'auto',
      }}
    >
      {/* Top Part: Brand Logo & Campus Selector */}
      <div>
        {/* Brand Logo */}
        <div
          onClick={() => {
            setSelectedVendorForMenu(null);
            setActiveTab('explore');
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            padding: '4px 8px',
            marginBottom: '16px',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: '#FF5500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              flexShrink: 0,
            }}
          >
            <Flame size={18} fill="#FFFFFF" />
          </div>
          <span style={{ fontSize: '18px', fontWeight: 900, color: '#111827', letterSpacing: '-0.5px' }}>
            KULA<span style={{ color: '#FF5500' }}>CHOP</span>
          </span>
        </div>

        {/* Campus Location Row */}
        <div
          onClick={() => setIsCampusModalOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 10px',
            marginBottom: '20px',
            borderRadius: '10px',
            background: '#F9FAFB',
            cursor: 'pointer',
            fontSize: '12px',
            color: '#4B5563',
            transition: 'background 0.15s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#F3F4F6')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#F9FAFB')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden' }}>
            <MapPin size={13} color="#FF5500" style={{ flexShrink: 0 }} />
            <span style={{ fontWeight: 700, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {selectedCampus.shortName}
            </span>
          </div>
          <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: 600 }}>Change</span>
        </div>

        {/* Navigation Menu */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleTabClick(item.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 12px',
                  borderRadius: '10px',
                  background: isActive ? '#FFF5EE' : 'transparent',
                  color: isActive ? '#FF5500' : '#4B5563',
                  border: 'none',
                  fontWeight: isActive ? 800 : 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#F9FAFB';
                    e.currentTarget.style.color = '#111827';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#4B5563';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={17} strokeWidth={isActive ? 2.5 : 2} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    style={{
                      background: isActive ? '#FF5500' : item.id === 'orders' ? '#FF5500' : '#E5E7EB',
                      color: isActive ? '#FFFFFF' : item.id === 'orders' ? '#FFFFFF' : '#374151',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '1px 6px',
                      borderRadius: '6px',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Quick Bag Button */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '9px 12px',
              borderRadius: '10px',
              background: 'transparent',
              color: '#4B5563',
              border: 'none',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              textAlign: 'left',
              marginTop: '4px',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F9FAFB';
              e.currentTarget.style.color = '#111827';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#4B5563';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShoppingBag size={17} strokeWidth={2} />
              <span>Cart</span>
            </div>
            {cartCount > 0 && (
              <span
                style={{
                  background: '#FF5500',
                  color: '#FFFFFF',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '1px 6px',
                  borderRadius: '6px',
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Part: Clean Student Mini Profile & Sign Out */}
      <div
        style={{
          borderTop: '1px solid #E5E7EB',
          paddingTop: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
        }}
      >
        <div
          onClick={() => handleTabClick('profile')}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', flex: 1, minWidth: 0 }}
        >
          <div
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              background: '#F3F4F6',
              color: '#111827',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '12px',
              flexShrink: 0,
            }}
          >
            {student.name.charAt(0)}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {student.name}
            </div>
            <div style={{ fontSize: '11px', color: '#6B7280' }}>Student</div>
          </div>
        </div>

        <button
          type="button"
          onClick={logout}
          title="Sign Out"
          style={{
            background: 'transparent',
            border: 'none',
            borderRadius: '6px',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9CA3AF',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'color 0.15s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#EF4444')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
        >
          <LogOut size={14} />
        </button>
      </div>
    </aside>
  );
};
