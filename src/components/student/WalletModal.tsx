import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Wallet, Plus, Copy } from 'lucide-react';

export const WalletModal: React.FC = () => {
  const { isWalletModalOpen, setIsWalletModalOpen, student, topUpWallet, showToast } = useApp();
  const [topUpAmount, setTopUpAmount] = useState<number>(2000);
  const [fundingMethod, setFundingMethod] = useState<'transfer' | 'card'>('transfer');

  if (!isWalletModalOpen) return null;

  const handleTopUp = () => {
    topUpWallet(topUpAmount);
    showToast(`Wallet successfully funded with ₦${topUpAmount.toLocaleString()}`, 'success');
  };

  return (
    <div className="modal-overlay" onClick={() => setIsWalletModalOpen(false)}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '480px', padding: 0 }}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid #DDD6CA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Wallet size={20} color="#D9381E" />
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#241A17' }}>Student Food Wallet</h3>
          </div>
          <button
            onClick={() => setIsWalletModalOpen(false)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#F8F5EF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#8C7B74',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {/* Balance Card */}
          <div
            style={{
              background: 'linear-gradient(135deg, #241A17 0%, #3D2D28 100%)',
              borderRadius: '20px',
              padding: '24px',
              color: '#FFFFFF',
              boxShadow: '0 8px 20px rgba(36, 26, 23, 0.2)',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: '24px',
            }}
          >
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#B59A68', textTransform: 'uppercase' }}>
              Available Balance
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#FFFFFF', marginTop: '4px' }}>
              ₦{student.walletBalance.toLocaleString()}
            </h2>
            <p style={{ fontSize: '12px', color: '#E9E3D8', marginTop: '4px' }}>
              For instant 1-click campus food orders with zero bank delays.
            </p>
          </div>

          {/* Quick Top-up Amount Chips */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#241A17', display: 'block', marginBottom: '8px' }}>
              Select Top-Up Amount
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {[1000, 2000, 5000].map((amt) => {
                const isSelected = topUpAmount === amt;
                return (
                  <button
                    key={amt}
                    onClick={() => setTopUpAmount(amt)}
                    style={{
                      padding: '10px',
                      borderRadius: '12px',
                      border: isSelected ? '2px solid #D9381E' : '1px solid #DDD6CA',
                      background: isSelected ? '#FDF1EE' : '#FFFFFF',
                      color: isSelected ? '#D9381E' : '#241A17',
                      fontWeight: 800,
                      fontSize: '14px',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    +₦{amt.toLocaleString()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Funding Method Toggle */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#241A17', display: 'block', marginBottom: '8px' }}>
              Payment Channel
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setFundingMethod('transfer')}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px',
                  border: fundingMethod === 'transfer' ? '2px solid #D9381E' : '1px solid #DDD6CA',
                  background: fundingMethod === 'transfer' ? '#FDF1EE' : '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: fundingMethod === 'transfer' ? '#D9381E' : '#574640',
                }}
              >
                🏦 Bank Transfer
              </button>
              <button
                onClick={() => setFundingMethod('card')}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px',
                  border: fundingMethod === 'card' ? '2px solid #D9381E' : '1px solid #DDD6CA',
                  background: fundingMethod === 'card' ? '#FDF1EE' : '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: fundingMethod === 'card' ? '#D9381E' : '#574640',
                }}
              >
                💳 Debit Card
              </button>
            </div>
          </div>

          {/* Dedicated Virtual Account Details */}
          {fundingMethod === 'transfer' && (
            <div
              style={{
                background: '#F8F5EF',
                borderRadius: '14px',
                padding: '14px',
                border: '1px dashed #DDD6CA',
                marginBottom: '20px',
                fontSize: '12px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#574640' }}>Bank Name:</span>
                <strong style={{ color: '#241A17' }}>Wema Bank (Kulachops)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', alignItems: 'center' }}>
                <span style={{ color: '#574640' }}>Virtual Account:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <strong style={{ fontSize: '13px', color: '#D9381E' }}>9823 481 029</strong>
                  <Copy
                    size={12}
                    style={{ cursor: 'pointer', color: '#8C7B74' }}
                    onClick={() => showToast('Virtual account number copied!', 'info')}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#574640' }}>Beneficiary:</span>
                <strong style={{ color: '#241A17' }}>KC - {student.name}</strong>
              </div>
            </div>
          )}

          {/* Top up CTA button */}
          <button
            onClick={handleTopUp}
            className="btn-primary"
            style={{ width: '100%', padding: '14px', borderRadius: '14px', fontSize: '15px' }}
          >
            <Plus size={18} /> Top-Up ₦{topUpAmount.toLocaleString()} Now
          </button>
        </div>
      </div>
    </div>
  );
};
