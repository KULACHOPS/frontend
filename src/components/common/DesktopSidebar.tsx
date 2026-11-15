import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Flame,
  MapPin,
  Compass,
  Search,
  Receipt,
  Wallet,
  User,
  ShoppingBag,
  LogOut,
  Clock,
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
    cartSubtotal,
    setIsCartOpen,
    setSelectedVendorForMenu,
    logout,
  } = useApp();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const activeOrder = orders.find((o) => o.status !== 'delivered' && o.status !== 'cancelled');
  const defaultAddress = student.savedAddresses.find((a) => a.isDefault) || student.savedAddresses[0];

  const navItems: { id: StudentTab; label: string; icon: React.ComponentType<any>; badge?: string | null }[] = [
    { id: 'explore', label: 'Chops & Canteens', icon: Compass },
    { id: 'search', label: 'Search & Browse', icon: Search },
    { id: 'orders', label: 'My Orders', icon: Receipt, badge: activeOrder ? '1 Active' : null },
    { id: 'wallet', label: 'Campus Wallet', icon: Wallet, badge: `₦${student.walletBalance.toLocaleString()}` },
    { id: 'profile', label: 'Student Profile', icon: User },
  ];

  const handleTabClick = (tabId: StudentTab) => {
    setSelectedVendorForMenu(null);
    setActiveTab(tabId);
  };

  return (
    <aside
      className="kula-desktop-sidebar"
      style={{
        width: '275px',
        minWidth: '275px',
        height: '100vh',
        position: 'sticky',
        top: 0,
        background: '#FFFFFF',
        borderRight: '3px solid #090C0B',
        boxShadow: '4px 0 0 rgba(9, 12, 11, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 18px',
        boxSizing: 'border-box',
        zIndex: 40,
        overflowY: 'auto',
      }}
    >
      {/* Top Part: Brand Logo & Campus Selector Card */}
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
            gap: '10px',
            cursor: 'pointer',
            padding: '4px 6px',
            marginBottom: '20px',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: '#FF5500',
              border: '2px solid #090C0B',
              boxShadow: '0 3px 0 #090C0B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFC501',
              flexShrink: 0,
            }}
          >
            <Flame size={20} fill="#FFC501" color="#FFC501" />
          </div>
          <div>
            <span style={{ fontSize: '20px', fontWeight: 900, color: '#090C0B', letterSpacing: '-0.5px' }}>
              KULA<span style={{ color: '#FF5500' }}>CHOP</span>
            </span>
            <span style={{ display: 'block', fontSize: '10.5px', fontWeight: 800, color: '#8E9993', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              Campus Food App
            </span>
          </div>
        </div>

        {/* Campus & Hostel Delivery Drop-off Pill */}
        <div
          style={{
            background: '#F8FAF9',
            border: '2px solid #090C0B',
            borderRadius: '16px',
            padding: '12px 14px',
            marginBottom: '24px',
            boxShadow: '0 3px 0 #090C0B',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontSize: '10px', fontWeight: 900, color: '#8E9993', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Delivering To
            </span>
            <button
              type="button"
              onClick={() => setIsCampusModalOpen(true)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#FF5500',
                fontSize: '11px',
                fontWeight: 900,
                cursor: 'pointer',
                padding: 0,
              }}
            >
              Change ▾
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={14} color="#FF5500" style={{ flexShrink: 0 }} />
            <strong style={{ fontSize: '12.5px', color: '#090C0B', fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {selectedCampus.shortName}
            </strong>
          </div>
          <div style={{ fontSize: '11px', color: '#525C57', fontWeight: 600, marginTop: '2px', paddingLeft: '20px' }}>
            {defaultAddress?.hostelOrBuilding || 'Moremi Hall'} ({defaultAddress?.roomOrNumber || 'Room 214'})
          </div>
        </div>

        {/* Main Navigation Menu Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
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
                  padding: '12px 14px',
                  borderRadius: '14px',
                  background: isActive ? '#FF5500' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#090C0B',
                  border: isActive ? '2px solid #090C0B' : '2px solid transparent',
                  boxShadow: isActive ? '0 4px 0 #090C0B' : 'none',
                  fontWeight: isActive ? 900 : 800,
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#FFF5EE';
                    e.currentTarget.style.borderColor = '#090C0B';
                    e.currentTarget.style.transform = 'translateX(2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={18} strokeWidth={isActive ? 2.6 : 2.2} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    style={{
                      background: isActive ? '#FFC501' : item.id === 'orders' ? '#FF5500' : '#F0F3F1',
                      color: isActive ? '#090C0B' : item.id === 'orders' ? '#FFFFFF' : '#090C0B',
                      border: '1px solid #090C0B',
                      fontSize: '11px',
                      fontWeight: 900,
                      padding: '2px 7px',
                      borderRadius: '8px',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Order Alert Card (if running) */}
        {activeOrder && (
          <div
            onClick={() => {
              setSelectedVendorForMenu(null);
              setActiveTab('orders');
            }}
            style={{
              marginTop: '18px',
              background: '#FFFAF0',
              border: '2px solid #090C0B',
              borderRadius: '16px',
              padding: '12px 14px',
              boxShadow: '0 3px 0 #090C0B',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Clock size={14} color="#FF5500" />
              <strong style={{ fontSize: '12px', color: '#FF5500', fontWeight: 900, textTransform: 'uppercase' }}>
                Delivery in Progress
              </strong>
            </div>
            <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#090C0B' }}>
              {activeOrder.vendorName}
            </div>
            <div style={{ fontSize: '11px', color: '#525C57', marginTop: '2px' }}>
              Secret PIN: <strong style={{ color: '#090C0B', fontFamily: 'monospace' }}>{activeOrder.deliveryCode}</strong>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Part: Food Bag Widget & Student Account Profile */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderTop: '2px solid #E5EAE7', paddingTop: '16px' }}>
        {/* Food Bag Sidebar Widget */}
        <div
          style={{
            background: '#FFF9E6',
            border: '2px solid #090C0B',
            borderRadius: '16px',
            padding: '12px 14px',
            boxShadow: '0 3px 0 #090C0B',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShoppingBag size={15} color="#FF5500" />
              <strong style={{ fontSize: '12.5px', color: '#090C0B' }}>My Campus Bag</strong>
            </div>
            <span
              style={{
                background: '#FF5500',
                color: '#FFFFFF',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 900,
              }}
            >
              {cartCount}
            </span>
          </div>

          <div style={{ fontSize: '12px', color: '#525C57', fontWeight: 600, marginBottom: '10px' }}>
            {cartCount === 0 ? 'Your bag is empty' : `Subtotal: ₦${cartSubtotal.toLocaleString()}`}
          </div>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            style={{
              width: '100%',
              padding: '8px 12px',
              background: '#090C0B',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <span>{cartCount > 0 ? 'Checkout Now' : 'View Bag'}</span>
            <span>➔</span>
          </button>
        </div>

        {/* Student Mini Profile & Sign Out Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#F8FAF9',
            border: '1.5px solid #090C0B',
            borderRadius: '14px',
            padding: '8px 10px',
          }}
        >
          <div
            onClick={() => handleTabClick('profile')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flex: 1, minWidth: 0 }}
          >
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: '#FF5500',
                border: '1.5px solid #090C0B',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '14px',
                flexShrink: 0,
              }}
            >
              {student.name.charAt(0)}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '13px', fontWeight: 900, color: '#090C0B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {student.name}
              </div>
              <div style={{ fontSize: '10px', color: '#087A4F', fontWeight: 800 }}>
                Verified Student
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            title="Sign Out"
            style={{
              background: '#FFF0F0',
              border: '1px solid #FCA5A5',
              borderRadius: '8px',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#E80B2E',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#FEE2E2')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#FFF0F0')}
          >
            <LogOut size={13} />
          </button>
        </div>
      </div>
    </aside>
  );
};
