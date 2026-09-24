import React from 'react';
import { useApp } from '../../context/AppContext';
import { Compass, ShoppingBag, Receipt, Wallet, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'explore' | 'search' | 'orders' | 'profile';
  setActiveTab: (tab: 'explore' | 'search' | 'orders' | 'profile') => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const { cart, setIsCartOpen, orders, setIsOrderHistoryOpen, setIsWalletModalOpen } = useApp();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const activeOrder = orders.find((o) => o.status !== 'delivered' && o.status !== 'cancelled');

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '64px',
        background: '#FFFFFF',
        borderTop: '1px solid #DDD6CA',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 35,
        boxShadow: '0 -2px 12px rgba(36,26,23,0.06)',
      }}
    >
      {/* Explore */}
      <button
        onClick={() => setActiveTab('explore')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          color: activeTab === 'explore' ? '#D9381E' : '#8C7B74',
          fontSize: '11px',
          fontWeight: activeTab === 'explore' ? 700 : 500,
        }}
      >
        <Compass size={20} />
        <span>Chops</span>
      </button>

      {/* Orders */}
      <button
        onClick={() => setIsOrderHistoryOpen(true)}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          color: activeOrder ? '#D9381E' : '#8C7B74',
          fontSize: '11px',
          fontWeight: activeOrder ? 700 : 500,
        }}
      >
        <Receipt size={20} />
        <span>Orders</span>
        {activeOrder && (
          <span
            style={{
              position: 'absolute',
              top: '-2px',
              right: '-4px',
              width: '8px',
              height: '8px',
              background: '#D9381E',
              borderRadius: '50%',
              boxShadow: '0 0 0 2px #FFFFFF',
            }}
          />
        )}
      </button>

      {/* Cart Center Floating / Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          color: cartCount > 0 ? '#D9381E' : '#8C7B74',
          fontSize: '11px',
          fontWeight: cartCount > 0 ? 700 : 500,
        }}
      >
        <div style={{ position: 'relative' }}>
          <ShoppingBag size={20} />
          {cartCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-6px',
                right: '-8px',
                background: '#D9381E',
                color: '#fff',
                fontSize: '10px',
                fontWeight: 800,
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {cartCount}
            </span>
          )}
        </div>
        <span>Tray</span>
      </button>

      {/* Wallet */}
      <button
        onClick={() => setIsWalletModalOpen(true)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          color: '#8C7B74',
          fontSize: '11px',
          fontWeight: 500,
        }}
      >
        <Wallet size={20} />
        <span>Wallet</span>
      </button>

      {/* Profile */}
      <button
        onClick={() => setActiveTab('profile')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          color: activeTab === 'profile' ? '#D9381E' : '#8C7B74',
          fontSize: '11px',
          fontWeight: activeTab === 'profile' ? 700 : 500,
        }}
      >
        <User size={20} />
        <span>Account</span>
      </button>
    </nav>
  );
};
