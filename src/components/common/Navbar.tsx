import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, ShoppingBag, Wallet, Flame, ChevronDown, Clock, LogIn, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    selectedCampus,
    setIsCampusModalOpen,
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

  const scrollToSection = (id: string) => {
    setSelectedVendorForMenu(null);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: '#FFFFFF',
        borderBottom: '1px solid #DDD6CA',
        boxShadow: '0 2px 10px rgba(36,26,23,0.03)',
      }}
    >
      <div
        className="app-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '72px',
          gap: '12px',
        }}
      >
        {/* Brand Logo & Campus Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            onClick={() => setSelectedVendorForMenu(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #D9381E 0%, #B59A68 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                boxShadow: '0 4px 12px rgba(217, 56, 30, 0.3)',
              }}
            >
              <Flame size={22} fill="#FFFFFF" color="#FFFFFF" />
            </div>
            <div>
              <span
                style={{
                  fontWeight: 900,
                  fontSize: '20px',
                  letterSpacing: '-0.5px',
                  color: '#241A17',
                }}
              >
                KULA<span style={{ color: '#D9381E' }}>CHOPS</span>
              </span>
              <span
                style={{
                  display: 'block',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: '#8C7B74',
                  letterSpacing: '0.4px',
                  textTransform: 'uppercase',
                  marginTop: '-4px',
                }}
              >
                Campus Food Delivery
              </span>
            </div>
          </div>

          {/* Campus Location Dropdown Pill */}
          <button
            onClick={() => setIsCampusModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              background: '#F8F5EF',
              border: '1.5px solid #DDD6CA',
              borderRadius: '999px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 700,
              color: '#241A17',
            }}
          >
            <MapPin size={14} color="#D9381E" />
            <span style={{ maxWidth: '140px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {selectedCampus.shortName}
            </span>
            <ChevronDown size={14} color="#8C7B74" />
          </button>
        </div>

        {/* Center Nav Links (Chowdeck Style) */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '8px',
            background: '#F8F5EF',
            padding: '4px 8px',
            borderRadius: '999px',
            border: '1px solid #DDD6CA',
          }}
          className="desktop-nav"
        >
          <button
            onClick={() => scrollToSection('campus-canteens-section')}
            style={{
              padding: '6px 14px',
              borderRadius: '99px',
              fontSize: '13px',
              fontWeight: 700,
              color: '#241A17',
            }}
          >
            Canteens
          </button>
          <button
            onClick={() => setIsCampusModalOpen(true)}
            style={{
              padding: '6px 14px',
              borderRadius: '99px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#574640',
            }}
          >
            Campuses
          </button>
          {isAuthenticated && (
            <button
              onClick={() => setIsWalletModalOpen(true)}
              style={{
                padding: '6px 14px',
                borderRadius: '99px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#574640',
              }}
            >
              Student Wallet
            </button>
          )}
        </nav>

        {/* Right Actions: Auth, Active Order pill, Wallet & Cart */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {!isAuthenticated ? (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              style={{
                background: '#D9381E',
                color: '#FFFFFF',
                padding: '8px 18px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 10px rgba(217, 56, 30, 0.35)',
              }}
            >
              <LogIn size={15} />
              <span>Sign In</span>
            </button>
          ) : (
            <>
              {/* Active order live pill if present */}
              {activeOrder && (
                <button
                  onClick={() => setActiveTrackingOrderId(activeOrder.id)}
                  className="pulse-indicator"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 14px',
                    background: '#FDF1EE',
                    border: '1.5px solid #F8C3B9',
                    borderRadius: '999px',
                    color: '#D9381E',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  <Clock size={15} />
                  <span>Track Order</span>
                  <span style={{ background: '#D9381E', color: '#fff', fontSize: '10px', padding: '1px 6px', borderRadius: '99px' }}>
                    Active
                  </span>
                </button>
              )}

              {/* Wallet Balance Pill */}
              <button
                onClick={() => setIsWalletModalOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  background: '#E9E3D8',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#241A17',
                  border: '1px solid #DDD6CA',
                }}
              >
                <Wallet size={16} color="#B59A68" />
                <span>₦{student.walletBalance.toLocaleString()}</span>
              </button>

              {/* Sign out */}
              <button
                onClick={logout}
                title="Sign out"
                style={{
                  fontSize: '12px',
                  color: '#8C7B74',
                  background: '#F8F5EF',
                  border: '1px solid #DDD6CA',
                  padding: '7px 12px',
                  borderRadius: '999px',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <LogOut size={13} />
                <span className="hidden-sm">Sign Out</span>
              </button>
            </>
          )}

          {/* Cart Tray Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: totalCartItems > 0 ? '#D9381E' : '#E9E3D8',
              color: totalCartItems > 0 ? '#FFFFFF' : '#241A17',
              border: 'none',
              boxShadow: totalCartItems > 0 ? '0 4px 12px rgba(217, 56, 30, 0.35)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <ShoppingBag size={18} />
            {totalCartItems > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: '#241A17',
                  color: '#FFFFFF',
                  fontSize: '11px',
                  fontWeight: 800,
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #FFFFFF',
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
