import React from 'react';
import { useApp } from '../../context/AppContext';
import { Compass, Search, Receipt, Wallet, User } from 'lucide-react';
import type { StudentTab } from '../../types';

interface BottomNavProps {
  activeTab: StudentTab;
  setActiveTab: (tab: StudentTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const { cart, setIsCartOpen, orders, setSelectedVendorForMenu } = useApp();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const activeOrder = orders.find((o) => o.status !== 'delivered' && o.status !== 'cancelled');

  const navItems: { id: StudentTab; label: string; icon: React.ComponentType<any>; badge?: boolean }[] = [
    { id: 'explore', label: 'Chops', icon: Compass },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'orders', label: 'Orders', icon: Receipt, badge: !!activeOrder },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const handleTabClick = (tabId: StudentTab) => {
    setSelectedVendorForMenu(null);
    setActiveTab(tabId);
  };

  return (
    <>
      {/* Floating Mobile Cart Pill (docked right above the bottom nav when items are in cart) */}
      {cartCount > 0 && (
        <div
          style={{
            position: 'fixed',
            bottom: '78px',
            left: '16px',
            right: '16px',
            zIndex: 44,
            display: 'flex',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            style={{
              pointerEvents: 'auto',
              background: '#FF5500',
              color: '#FFFFFF',
              border: '2.5px solid #090C0B',
              borderRadius: '999px',
              boxShadow: '0 5px 0 #090C0B',
              padding: '10px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              fontWeight: 900,
              fontSize: '13.5px',
              cursor: 'pointer',
              width: '100%',
              maxWidth: '360px',
              animation: 'bounceIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  background: '#FFC501',
                  color: '#090C0B',
                  borderRadius: '50%',
                  width: '22px',
                  height: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 900,
                }}
              >
                {cartCount}
              </div>
              <span>View Cart</span>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 800 }}>Checkout ➔</span>
          </button>
        </div>
      )}

      {/* PWA Mobile Bottom Navigation Bar */}
      <nav
        className="kula-pwa-bottom-nav"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '66px',
          background: 'rgba(255, 255, 255, 0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '2.5px solid #090C0B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          zIndex: 45,
          boxShadow: '0 -4px 18px rgba(9, 12, 11, 0.08)',
          boxSizing: 'border-box',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleTabClick(item.id)}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px',
                background: 'transparent',
                border: 'none',
                color: isActive ? '#FF5500' : '#8E9993',
                fontSize: '11px',
                fontWeight: isActive ? 900 : 700,
                cursor: 'pointer',
                padding: '6px 12px',
                transition: 'color 0.15s ease',
                flex: 1,
              }}
            >
              <div style={{ position: 'relative' }}>
                <Icon size={20} strokeWidth={isActive ? 2.8 : 2} />
                {/* Active order pulsating notification dot */}
                {item.badge && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-2px',
                      right: '-4px',
                      width: '8px',
                      height: '8px',
                      background: '#FF5500',
                      borderRadius: '50%',
                      boxShadow: '0 0 0 2px #FFFFFF',
                      animation: 'pulseGlow 1.5s infinite',
                    }}
                  />
                )}
              </div>
              <span>{item.label}</span>
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '2px',
                    width: '16px',
                    height: '3px',
                    borderRadius: '2px',
                    background: '#FF5500',
                  }}
                />
              )}
            </button>
          );
        })}
      </nav>
    </>
  );
};
