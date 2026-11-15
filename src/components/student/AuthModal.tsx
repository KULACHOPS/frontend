import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ArrowRight, CheckCircle2, ShieldCheck, Flame } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, showToast } = useApp();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('0812 345 6789');
  const [name, setName] = useState('Tobi Adeleke');
  const [otp, setOtp] = useState('4821');

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 8) {
      showToast('Please enter a valid Nigerian phone number', 'error');
      return;
    }
    setStep('otp');
    showToast('4-digit OTP sent to ' + phone + ' (Code: 4821)', 'info');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 4) {
      showToast('Please enter the 4-digit OTP code', 'error');
      return;
    }
    login(phone, name);
    setStep('phone');
  };

  return (
    <div className="modal-overlay" onClick={() => setIsAuthModalOpen(false)}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '440px', padding: 0, overflow: 'hidden' }}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 24px 16px',
            borderBottom: '1px solid #E5EAE7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '12px',
                background: '#FF5500',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFC501',
              }}
            >
              <Flame size={20} fill="#FFC501" color="#FFC501" />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#090C0B' }}>
                Sign In to KULACHOP
              </h3>
              <p style={{ fontSize: '11px', color: '#525C57' }}>Fast OTP login for students</p>
            </div>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(false)}
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
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px' }}>
          {step === 'phone' ? (
            <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 800, color: '#090C0B', display: 'block', marginBottom: '6px' }}>
                  Your Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tobi Adeleke"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: '1.5px solid #E5EAE7',
                    fontSize: '14px',
                    outline: 'none',
                    color: '#090C0B',
                    fontFamily: 'inherit',
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 800, color: '#090C0B', display: 'block', marginBottom: '6px' }}>
                  Phone Number (for Courier calls & OTP)
                </label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1.5px solid #E5EAE7',
                    borderRadius: '12px',
                    overflow: 'hidden',
                  }}
                >
                  <span
                    style={{
                      background: '#F0F3F1',
                      padding: '12px 14px',
                      fontSize: '13px',
                      fontWeight: 800,
                      color: '#525C57',
                      borderRight: '1px solid #E5EAE7',
                    }}
                  >
                    🇳🇬 +234
                  </span>
                  <input
                    type="tel"
                    placeholder="812 345 6789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      border: 'none',
                      outline: 'none',
                      padding: '12px 14px',
                      fontSize: '14px',
                      color: '#090C0B',
                      width: '100%',
                      fontFamily: 'inherit',
                    }}
                    required
                  />
                </div>
              </div>

              <div
                style={{
                  background: '#FFF0E8',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  fontSize: '11px',
                  color: '#FF5500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: '1px solid #FFE0CC',
                }}
              >
                <ShieldCheck size={14} color="#FF5500" />
                <span>No password required. Instant 4-digit code.</span>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '14px',
                }}
              >
                <span>Continue</span>
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                <p style={{ fontSize: '13px', color: '#525C57' }}>
                  We sent a 4-digit verification code to <br />
                  <strong style={{ color: '#090C0B' }}>{phone}</strong>
                </p>
                <span
                  style={{
                    display: 'inline-block',
                    marginTop: '6px',
                    fontSize: '11px',
                    background: '#FFF9E6',
                    color: '#090C0B',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '6px',
                    border: '1px solid #FFE58F',
                  }}
                >
                  Demo Code: 4821
                </span>
              </div>

              <div>
                <input
                  type="text"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    fontSize: '28px',
                    fontWeight: 900,
                    letterSpacing: '8px',
                    padding: '12px',
                    borderRadius: '14px',
                    border: '2px solid #FF5500',
                    outline: 'none',
                    fontFamily: 'monospace',
                    background: '#FFF0E8',
                    color: '#090C0B',
                  }}
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="btn-yellow"
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '14px',
                }}
              >
                <CheckCircle2 size={16} />
                <span>Verify & Sign In</span>
              </button>

              <button
                type="button"
                onClick={() => setStep('phone')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '12px',
                  color: '#525C57',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Change Phone Number
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
