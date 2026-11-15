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
    setIsWalletModalOpen(false);
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
            borderBottom: '1px solid #E5EAE7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Wallet size={20} color="#FF5500" />
            <h3 style={{ fontSize: '17px', fontWeight: 900, color: '#090C0B' }}>Student Food Wallet</h3>
          </div>
          <button
            onClick={() => setIsWalletModalOpen(false)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#F0F3F1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#525C57',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {/* Balance Card - Vibrant Orange Style */}
          <div
            style={{
              background: 'linear-gradient(135deg, #FF5500 0%, #E04800 100%)',
              borderRadius: '20px',
              padding: '24px',
              color: '#FFFFFF',
              boxShadow: '0 8px 20px rgba(255, 85, 0, 0.35)',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: '24px',
            }}
          >
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#FFC501', textTransform: 'uppercase' }}>
              Available Balance
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#FFFFFF', marginTop: '4px' }}>
              ₦{student.walletBalance.toLocaleString()}
            </h2>
            <p style={{ fontSize: '12px', color: '#D1EBE3', marginTop: '4px' }}>
              For instant 1-click campus food orders with zero bank delays.
            </p>
          </div>

          {/* Quick Top-up Amount Chips */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '13px', fontWeight: 800, color: '#090C0B', display: 'block', marginBottom: '8px' }}>
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
                      border: isSelected ? '2px solid #FF5500' : '1px solid #E5EAE7',
                      background: isSelected ? '#FFF0E8' : '#FFFFFF',
                      color: isSelected ? '#FF5500' : '#090C0B',
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
            <label style={{ fontSize: '13px', fontWeight: 800, color: '#090C0B', display: 'block', marginBottom: '8px' }}>
              Payment Channel
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setFundingMethod('transfer')}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px',
                  border: fundingMethod === 'transfer' ? '2px solid #FF5500' : '1px solid #E5EAE7',
                  background: fundingMethod === 'transfer' ? '#FFF0E8' : '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: 800,
                  color: fundingMethod === 'transfer' ? '#FF5500' : '#525C57',
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
                  border: fundingMethod === 'card' ? '2px solid #FF5500' : '1px solid #E5EAE7',
                  background: fundingMethod === 'card' ? '#FFF0E8' : '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: 800,
                  color: fundingMethod === 'card' ? '#FF5500' : '#525C57',
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
                background: '#F0F3F1',
                borderRadius: '14px',
                padding: '14px',
                border: '1px dashed #FF5500',
                marginBottom: '20px',
                fontSize: '12px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#525C57' }}>Bank Name:</span>
                <strong style={{ color: '#090C0B' }}>Wema Bank (KulaChop)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', alignItems: 'center' }}>
                <span style={{ color: '#525C57' }}>Virtual Account:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <strong style={{ fontSize: '13px', color: '#FF5500' }}>9823 481 029</strong>
                  <Copy
                    size={12}
                    style={{ cursor: 'pointer', color: '#8E9993' }}
                    onClick={() => showToast('Virtual account number copied!', 'info')}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#525C57' }}>Beneficiary:</span>
                <strong style={{ color: '#090C0B' }}>KC - {student.name}</strong>
              </div>
            </div>
          )}

          {/* Top up CTA button */}
          <button
            onClick={handleTopUp}
            className="btn-yellow"
            style={{ width: '100%', padding: '14px', borderRadius: '14px', fontSize: '15px' }}
          >
            <Plus size={18} /> Top-Up ₦{topUpAmount.toLocaleString()} Now
          </button>
        </div>
      </div>
    </div>
  );
};
