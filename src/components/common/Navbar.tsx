import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShoppingBag,
  Wallet,
  Flame,
  Clock,
  LogIn,
  LogOut,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    cart,
    setIsCartOpen,
    student,
    setIsWalletModalOpen,
    orders,
    setActiveTrackingOrderId,
    setSelectedVendorForMenu,
    isAuthenticated,
    setIsAuthModalOpen,
    logout,
  } = useApp();

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Check if there is an active (in-progress) order
  const activeOrder = orders.find(
    (o) => o.status !== 'delivered' && o.status !== 'cancelled'
  );

  return (
    <header
      style={{
        position: 'sticky',
        top: '14px',
        zIndex: 50,
        width: '100%',
        padding: '0 16px',
        display: 'flex',
        justifyContent: 'center',
        background: 'transparent',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          pointerEvents: 'auto',
          width: '100%',
          maxWidth: '1120px',
          background: '#FFFFFF',
          borderRadius: '9999px',
          border: '1.5px solid #E5EAE7',
          boxShadow: '0 6px 24px -4px rgba(9, 12, 11, 0.08), 0 2px 6px -1px rgba(9, 12, 11, 0.04)',
          padding: '8px 12px 8px 22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        {/* Left: Brand Logo */}
        <div
          onClick={() => setSelectedVendorForMenu(null)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '9px',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '11px',
              background: 'linear-gradient(135deg, #FF5500 0%, #FF7700 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFC501',
              boxShadow: '0 4px 12px rgba(255, 85, 0, 0.3)',
              transition: 'transform 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <Flame size={20} fill="#FFC501" color="#FFC501" />
          </div>
          <span
            style={{
              fontWeight: 900,
              fontSize: '20px',
              letterSpacing: '-0.6px',
              color: '#090C0B',
            }}
          >
            KULA<span style={{ color: '#FF5500' }}>CHOP</span>
          </span>
        </div>

        {/* Right Actions: Auth, Active Order Live Pill, Wallet & Cart */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {!isAuthenticated ? (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 18px',
                fontSize: '13px',
                fontWeight: 800,
                color: '#FFFFFF',
                background: '#090C0B',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 3px 10px rgba(9, 12, 11, 0.15)',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FF5500';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 5px 14px rgba(255, 85, 0, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#090C0B';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 3px 10px rgba(9, 12, 11, 0.15)';
              }}
            >
              <LogIn size={14} />
              <span>Sign In</span>
            </button>
          ) : (
            <>
              {/* Active order live tracking pill if present */}
              {activeOrder && (
                <button
                  onClick={() => setActiveTrackingOrderId(activeOrder.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    background: '#FFF0E8',
                    border: '1.5px solid #FF5500',
                    borderRadius: '9999px',
                    color: '#FF5500',
                    fontSize: '12px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <Clock size={13} />
                  <span className="hidden-sm">Track Order</span>
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#FF5500',
                      animation: 'pulseGlow 1.5s infinite',
                    }}
                  />
                </button>
              )}

              {/* Wallet Balance Pill */}
              <button
                onClick={() => setIsWalletModalOpen(true)}
                title="Wallet balance"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  background: '#F5F7F6',
                  borderRadius: '9999px',
                  fontSize: '12.5px',
                  fontWeight: 800,
                  color: '#090C0B',
                  border: '1px solid #E5EAE7',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#FF5500';
                  e.currentTarget.style.background = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E5EAE7';
                  e.currentTarget.style.background = '#F5F7F6';
                }}
              >
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '5px',
                    background: '#FFC501',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#090C0B',
                  }}
                >
                  <Wallet size={11} />
                </div>
                <span>₦{student.walletBalance.toLocaleString()}</span>
              </button>

              {/* Sign out */}
              <button
                onClick={logout}
                title="Sign out"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#F5F7F6',
                  border: '1px solid #E5EAE7',
                  color: '#525C57',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#E80B2E';
                  e.currentTarget.style.borderColor = '#FCA5A5';
                  e.currentTarget.style.background = '#FEF2F2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#525C57';
                  e.currentTarget.style.borderColor = '#E5EAE7';
                  e.currentTarget.style.background = '#F5F7F6';
                }}
              >
                <LogOut size={13} />
              </button>
            </>
          )}

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            title="View Cart"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: totalCartItems > 0 ? '7px 14px' : '7px 12px',
              height: '38px',
              borderRadius: '9999px',
              background: totalCartItems > 0 ? '#FF5500' : '#F5F7F6',
              color: totalCartItems > 0 ? '#FFFFFF' : '#090C0B',
              border: totalCartItems > 0 ? 'none' : '1px solid #E5EAE7',
              boxShadow: totalCartItems > 0 ? '0 4px 14px rgba(255, 85, 0, 0.35)' : 'none',
              transition: 'all 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
              cursor: 'pointer',
              fontWeight: 800,
              fontSize: '13px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.04)';
              if (totalCartItems === 0) {
                e.currentTarget.style.borderColor = '#FF5500';
                e.currentTarget.style.background = '#FFFFFF';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              if (totalCartItems === 0) {
                e.currentTarget.style.borderColor = '#E5EAE7';
                e.currentTarget.style.background = '#F5F7F6';
              }
            }}
          >
            <ShoppingBag size={17} />
            {totalCartItems > 0 && (
              <span
                style={{
                  background: '#FFC501',
                  color: '#090C0B',
                  fontSize: '11px',
                  fontWeight: 900,
                  padding: '1px 6px',
                  borderRadius: '9999px',
                  minWidth: '18px',
                  textAlign: 'center',
                }}
              >
                {totalCartItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
