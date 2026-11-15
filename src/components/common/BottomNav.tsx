import React from 'react';
import { useApp } from '../../context/AppContext';
import { Compass, ShoppingBag, Receipt, Wallet } from 'lucide-react';

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
        height: '66px',
        background: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid #E5EAE7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 45,
        boxShadow: '0 -4px 20px rgba(9, 12, 11, 0.05)',
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
          color: activeTab === 'explore' ? '#FF5500' : '#8E9993',
          fontSize: '11px',
          fontWeight: activeTab === 'explore' ? 800 : 600,
        }}
      >
        <Compass size={20} strokeWidth={activeTab === 'explore' ? 2.5 : 2} />
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
          color: activeOrder ? '#FF5500' : '#8E9993',
          fontSize: '11px',
          fontWeight: activeOrder ? 800 : 600,
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
              background: '#FFC501',
              borderRadius: '50%',
              boxShadow: '0 0 0 2px #FFFFFF',
            }}
          />
        )}
      </button>

      {/* Cart Center Floating Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          color: cartCount > 0 ? '#FF5500' : '#8E9993',
          fontSize: '11px',
          fontWeight: cartCount > 0 ? 800 : 600,
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
                background: '#FFC501',
                color: '#090C0B',
                fontSize: '10px',
                fontWeight: 900,
                padding: '1px 5px',
                borderRadius: '99px',
                minWidth: '16px',
                textAlign: 'center',
                boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
              }}
            >
              {cartCount}
            </span>
          )}
        </div>
        <span>Bag</span>
      </button>

      {/* Wallet */}
      <button
        onClick={() => setIsWalletModalOpen(true)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          color: '#8E9993',
          fontSize: '11px',
          fontWeight: 600,
        }}
      >
        <Wallet size={20} />
        <span>Wallet</span>
      </button>
    </nav>
  );
};
