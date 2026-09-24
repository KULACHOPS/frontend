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
            borderBottom: '1px solid #E9E3D8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #D9381E 0%, #B59A68 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
              }}
            >
              <Flame size={18} fill="#FFFFFF" color="#FFFFFF" />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#241A17' }}>
                Sign In to KULACHOPS
              </h3>
              <p style={{ fontSize: '11px', color: '#8C7B74' }}>Fast OTP login for students</p>
            </div>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(false)}
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
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px' }}>
          {step === 'phone' ? (
            <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#241A17', display: 'block', marginBottom: '6px' }}>
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
                    border: '1.5px solid #DDD6CA',
                    fontSize: '14px',
                    outline: 'none',
                    color: '#241A17',
                    fontFamily: 'inherit',
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#241A17', display: 'block', marginBottom: '6px' }}>
                  Phone Number (for Rider calls & OTP)
                </label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1.5px solid #DDD6CA',
                    borderRadius: '12px',
                    overflow: 'hidden',
                  }}
                >
                  <span
                    style={{
                      background: '#E9E3D8',
                      padding: '12px 14px',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#574640',
                      borderRight: '1px solid #DDD6CA',
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
                      color: '#241A17',
                      width: '100%',
                      fontFamily: 'inherit',
                    }}
                    required
                  />
                </div>
              </div>

              <div
                style={{
                  background: '#F8F5EF',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  fontSize: '11px',
                  color: '#574640',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: '1px solid #DDD6CA',
                }}
              >
                <ShieldCheck size={14} color="#7A8469" />
                <span>No password required. We send a quick 4-digit code.</span>
              </div>

              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #D9381E 0%, #B82E17 100%)',
                  color: '#FFFFFF',
                  padding: '14px',
                  borderRadius: '14px',
                  fontSize: '14px',
                  fontWeight: 800,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(217, 56, 30, 0.35)',
                }}
              >
                <span>Continue</span>
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                <p style={{ fontSize: '13px', color: '#574640' }}>
                  We sent a 4-digit verification code to <br />
                  <strong style={{ color: '#241A17' }}>{phone}</strong>
                </p>
                <span
                  style={{
                    display: 'inline-block',
                    marginTop: '6px',
                    fontSize: '11px',
                    background: '#FDF1EE',
                    color: '#D9381E',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '6px',
                    border: '1px solid #F8C3B9',
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
                    border: '2px solid #D9381E',
                    outline: 'none',
                    fontFamily: 'monospace',
                    background: '#FDF1EE',
                    color: '#241A17',
                  }}
                  autoFocus
                />
              </div>

              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #D9381E 0%, #B82E17 100%)',
                  color: '#FFFFFF',
                  padding: '14px',
                  borderRadius: '14px',
                  fontSize: '14px',
                  fontWeight: 800,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(217, 56, 30, 0.35)',
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
                  color: '#8C7B74',
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
