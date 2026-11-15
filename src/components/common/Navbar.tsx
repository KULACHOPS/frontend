import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShoppingBag,
  Wallet,
  Flame,
  Clock,
  LogIn,
  LogOut,
  X,
  ChevronRight,
  User,
  ShieldCheck,
  Compass,
  Search,
  Receipt,
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
    activeTab,
    setActiveTab,
  } = useApp();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Check if there is an active (in-progress) order
  const activeOrder = orders.find(
    (o) => o.status !== 'delivered' && o.status !== 'cancelled'
  );

  return (
    <>
      <header className="kula-nav-header">
        <div className="kula-nav-capsule">
          {/* Left: Brand Logo */}
          <div
            onClick={() => {
              setSelectedVendorForMenu(null);
              if (isAuthenticated) {
                setActiveTab('explore');
              }
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              userSelect: 'none',
              flexShrink: 0,
            }}
          >
            <div
              className="kula-nav-logo-box"
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <Flame size={18} fill="#FFC501" color="#FFC501" />
            </div>
            <span className="kula-nav-logo-text">
              KULA<span style={{ color: '#FF5500' }}>CHOP</span>
            </span>
          </div>

          {/* Right Actions: Auth / Wallet, Cart & 2-Bar Menu Button */}
          <div className="kula-nav-actions">
            {!isAuthenticated ? (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="kula-nav-btn-signin hidden-sm"
                type="button"
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
                <LogIn size={13} />
                <span>Sign In</span>
              </button>
            ) : (
              <>
                {/* Active order live tracking pill if present */}
                {activeOrder && (
                  <button
                    onClick={() => {
                      setSelectedVendorForMenu(null);
                      setActiveTab('orders');
                      setActiveTrackingOrderId(activeOrder.id);
                    }}
                    className="kula-nav-btn-track"
                    type="button"
                    title="Track active order"
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
                  onClick={() => {
                    setSelectedVendorForMenu(null);
                    setActiveTab('wallet');
                  }}
                  className="kula-nav-btn-wallet"
                  title="Wallet balance"
                  type="button"
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
                      flexShrink: 0,
                    }}
                  >
                    <Wallet size={11} />
                  </div>
                  <span>₦{student.walletBalance.toLocaleString()}</span>
                </button>

                {/* Sign out button (visible on desktop, in drawer on mobile) */}
                <button
                  onClick={logout}
                  title="Sign out"
                  type="button"
                  className="kula-nav-btn-signout"
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
                    flexShrink: 0,
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
              className="kula-nav-btn-cart"
              title="View Cart"
              type="button"
              style={{
                background: totalCartItems > 0 ? '#FF5500' : '#F5F7F6',
                color: totalCartItems > 0 ? '#FFFFFF' : '#090C0B',
                border: totalCartItems > 0 ? 'none' : '1px solid #E5EAE7',
                boxShadow: totalCartItems > 0 ? '0 4px 14px rgba(255, 85, 0, 0.35)' : 'none',
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
              <ShoppingBag size={16} />
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

            {/* 2-Bar Quick Menu Button (UI reference concept) */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="kula-nav-btn-menu"
              title="Menu"
              type="button"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.borderColor = '#FF5500';
                e.currentTarget.style.color = '#FF5500';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#F5F7F6';
                e.currentTarget.style.borderColor = '#E5EAE7';
                e.currentTarget.style.color = '#090C0B';
              }}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              >
                <line x1="4" y1="9" x2="20" y2="9" />
                <line x1="4" y1="15" x2="20" y2="15" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / Slide-Out Navigation Drawer */}
      {isMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          {/* Backdrop Overlay */}
          <div
            onClick={() => setIsMenuOpen(false)}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(9, 12, 11, 0.5)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              animation: 'fadeIn 0.2s ease',
            }}
          />

          {/* Drawer Body */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '340px',
              height: '100%',
              background: '#FFFFFF',
              boxShadow: '-8px 0 32px rgba(9, 12, 11, 0.16)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 1001,
              animation: 'slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              overflowY: 'auto',
              boxSizing: 'border-box',
              padding: '24px 20px',
            }}
          >
            {/* Drawer Top Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '1px solid #E5EAE7',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #FF5500 0%, #FF7700 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFC501',
                  }}
                >
                  <Flame size={17} fill="#FFC501" color="#FFC501" />
                </div>
                <span style={{ fontWeight: 900, fontSize: '18px', color: '#090C0B' }}>
                  KULA<span style={{ color: '#FF5500' }}>CHOP</span>
                </span>
              </div>

              <button
                onClick={() => setIsMenuOpen(false)}
                type="button"
                title="Close menu"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: '#F5F7F6',
                  border: '1px solid #E5EAE7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#525C57',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#FFEAE0';
                  e.currentTarget.style.color = '#FF5500';
                  e.currentTarget.style.borderColor = '#FFC9B3';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#F5F7F6';
                  e.currentTarget.style.color = '#525C57';
                  e.currentTarget.style.borderColor = '#E5EAE7';
                }}
              >
                <X size={17} />
              </button>
            </div>

            {/* Student Profile / Auth Card */}
            {isAuthenticated ? (
              <div
                style={{
                  background: '#F8FAF9',
                  borderRadius: '18px',
                  border: '1px solid #E5EAE7',
                  padding: '16px',
                  marginBottom: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #FF5500 0%, #FF7700 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      fontSize: '17px',
                    }}
                  >
                    {student.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <strong style={{ fontSize: '14px', fontWeight: 900, color: '#090C0B', display: 'block' }}>
                      {student.name}
                    </strong>
                    <span style={{ fontSize: '12px', color: '#525C57' }}>{student.phone}</span>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#0C513F',
                    background: '#E2F7EE',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    width: 'fit-content',
                  }}
                >
                  <ShieldCheck size={13} />
                  <span>Verified Campus Student</span>
                </div>
              </div>
            ) : (
              <div
                style={{
                  background: 'linear-gradient(135deg, #FFF7F2 0%, #FFF0E8 100%)',
                  borderRadius: '18px',
                  border: '1px solid #FFD9C7',
                  padding: '18px',
                  marginBottom: '16px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#FF5500',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 10px',
                  }}
                >
                  <User size={20} />
                </div>
                <h4 style={{ fontSize: '15px', fontWeight: 900, color: '#090C0B', marginBottom: '4px' }}>
                  Student Sign In
                </h4>
                <p style={{ fontSize: '12px', color: '#68726D', marginBottom: '14px' }}>
                  Sign in or create an account to order hot meals and earn student points.
                </p>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  type="button"
                  style={{
                    width: '100%',
                    padding: '10px 16px',
                    background: '#FF5500',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: 800,
                    fontSize: '13px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(255, 85, 0, 0.25)',
                  }}
                >
                  Sign In / Register
                </button>
              </div>
            )}

            {/* Wallet Card (when authenticated) */}
            {isAuthenticated && (
              <div
                style={{
                  background: 'linear-gradient(135deg, #090C0B 0%, #171E1B 100%)',
                  color: '#FFFFFF',
                  borderRadius: '18px',
                  padding: '16px 18px',
                  marginBottom: '16px',
                  boxShadow: '0 8px 24px -4px rgba(9, 12, 11, 0.2)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '6px',
                        background: '#FFC501',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#090C0B',
                      }}
                    >
                      <Wallet size={12} />
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#A1ADA7' }}>Kulachop Wallet</span>
                  </div>
                  <span style={{ fontSize: '10px', background: 'rgba(255, 255, 255, 0.12)', padding: '2px 8px', borderRadius: '9999px' }}>
                    Active
                  </span>
                </div>
                <div style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: '12px' }}>
                  ₦{student.walletBalance.toLocaleString()}
                </div>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsWalletModalOpen(true);
                  }}
                  type="button"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: '#FF5500',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: 800,
                    fontSize: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  Fund Wallet
                </button>
              </div>
            )}

            {/* Active Order Banner if running */}
            {activeOrder && (
              <div
                onClick={() => {
                  setIsMenuOpen(false);
                  setActiveTrackingOrderId(activeOrder.id);
                }}
                style={{
                  background: '#FFF0E8',
                  border: '1.5px solid #FF5500',
                  borderRadius: '16px',
                  padding: '14px',
                  marginBottom: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: '#FF5500',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Clock size={16} />
                  </div>
                  <div>
                    <strong style={{ fontSize: '13px', fontWeight: 900, color: '#FF5500', display: 'block' }}>
                      Order in Progress
                    </strong>
                    <span style={{ fontSize: '11px', color: '#525C57' }}>Tap to view live courier map</span>
                  </div>
                </div>
                <ChevronRight size={16} color="#FF5500" />
              </div>
            )}

            {/* Quick Links Menu List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: 'auto' }}>
              {isAuthenticated && (
                <>
                  <button
                    onClick={() => {
                      setSelectedVendorForMenu(null);
                      setActiveTab('explore');
                      setIsMenuOpen(false);
                    }}
                    type="button"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      background: activeTab === 'explore' ? '#FFF5EE' : '#F8FAF9',
                      border: activeTab === 'explore' ? '1.5px solid #FF5500' : '1px solid #E5EAE7',
                      borderRadius: '14px',
                      cursor: 'pointer',
                      color: activeTab === 'explore' ? '#FF5500' : '#090C0B',
                      fontSize: '13px',
                      fontWeight: 800,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Compass size={16} color="#FF5500" />
                      <span>Chops & Canteens</span>
                    </div>
                    <ChevronRight size={15} color="#8E9993" />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedVendorForMenu(null);
                      setActiveTab('search');
                      setIsMenuOpen(false);
                    }}
                    type="button"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      background: activeTab === 'search' ? '#FFF5EE' : '#F8FAF9',
                      border: activeTab === 'search' ? '1.5px solid #FF5500' : '1px solid #E5EAE7',
                      borderRadius: '14px',
                      cursor: 'pointer',
                      color: activeTab === 'search' ? '#FF5500' : '#090C0B',
                      fontSize: '13px',
                      fontWeight: 800,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Search size={16} color="#FF5500" />
                      <span>Search & Browse</span>
                    </div>
                    <ChevronRight size={15} color="#8E9993" />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedVendorForMenu(null);
                      setActiveTab('orders');
                      setIsMenuOpen(false);
                    }}
                    type="button"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      background: activeTab === 'orders' ? '#FFF5EE' : '#F8FAF9',
                      border: activeTab === 'orders' ? '1.5px solid #FF5500' : '1px solid #E5EAE7',
                      borderRadius: '14px',
                      cursor: 'pointer',
                      color: activeTab === 'orders' ? '#FF5500' : '#090C0B',
                      fontSize: '13px',
                      fontWeight: 800,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Receipt size={16} color="#FF5500" />
                      <span>My Orders</span>
                    </div>
                    {activeOrder && (
                      <span style={{ fontSize: '10px', background: '#FF5500', color: '#FFF', padding: '2px 6px', borderRadius: '6px', fontWeight: 900 }}>
                        1 Active
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setSelectedVendorForMenu(null);
                      setActiveTab('wallet');
                      setIsMenuOpen(false);
                    }}
                    type="button"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      background: activeTab === 'wallet' ? '#FFF5EE' : '#F8FAF9',
                      border: activeTab === 'wallet' ? '1.5px solid #FF5500' : '1px solid #E5EAE7',
                      borderRadius: '14px',
                      cursor: 'pointer',
                      color: activeTab === 'wallet' ? '#FF5500' : '#090C0B',
                      fontSize: '13px',
                      fontWeight: 800,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Wallet size={16} color="#FF5500" />
                      <span>Campus Wallet</span>
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 900, color: '#090C0B' }}>
                      ₦{student.walletBalance.toLocaleString()}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedVendorForMenu(null);
                      setActiveTab('profile');
                      setIsMenuOpen(false);
                    }}
                    type="button"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      background: activeTab === 'profile' ? '#FFF5EE' : '#F8FAF9',
                      border: activeTab === 'profile' ? '1.5px solid #FF5500' : '1px solid #E5EAE7',
                      borderRadius: '14px',
                      cursor: 'pointer',
                      color: activeTab === 'profile' ? '#FF5500' : '#090C0B',
                      fontSize: '13px',
                      fontWeight: 800,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <User size={16} color="#FF5500" />
                      <span>Student Profile</span>
                    </div>
                    <ChevronRight size={15} color="#8E9993" />
                  </button>
                </>
              )}

              {/* Cart Drawer Row */}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsCartOpen(true);
                }}
                type="button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  background: '#F8FAF9',
                  border: '1px solid #E5EAE7',
                  borderRadius: '14px',
                  cursor: 'pointer',
                  color: '#090C0B',
                  fontSize: '13px',
                  fontWeight: 700,
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShoppingBag size={16} color="#FF5500" />
                  <span>My Food Cart</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {totalCartItems > 0 && (
                    <span
                      style={{
                        background: '#FF5500',
                        color: '#FFFFFF',
                        fontSize: '11px',
                        fontWeight: 800,
                        padding: '1px 7px',
                        borderRadius: '9999px',
                      }}
                    >
                      {totalCartItems}
                    </span>
                  )}
                  <ChevronRight size={15} color="#8E9993" />
                </div>
              </button>
            </div>

            {/* Drawer Bottom Actions */}
            <div style={{ paddingTop: '20px', borderTop: '1px solid #E5EAE7', marginTop: '16px' }}>
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    logout();
                  }}
                  type="button"
                  style={{
                    width: '100%',
                    padding: '11px 16px',
                    background: '#FEF2F2',
                    border: '1px solid #FCA5A5',
                    borderRadius: '12px',
                    color: '#E80B2E',
                    fontWeight: 800,
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <LogOut size={15} />
                  <span>Sign Out</span>
                </button>
              ) : (
                <div style={{ textAlign: 'center', fontSize: '11.5px', color: '#8E9993' }}>
                  Kulachop • Campus Food Delivery
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
