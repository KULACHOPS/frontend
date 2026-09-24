import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  MapPin,
  CreditCard,
  Building2,
  Wallet,
  Phone,
  CheckCircle2,
  Copy,
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartVendor,
    cartSubtotal,
    student,
    createOrder,
    showToast,
  } = useApp();

  const [deliveryType, setDeliveryType] = useState<'campus_delivery' | 'self_pickup'>('campus_delivery');
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    student.savedAddresses[0]?.id || ''
  );
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'bank_transfer' | 'card'>('wallet');
  const [riderInstruction, setRiderInstruction] = useState<string>('Please call my phone as soon as you reach the hostel gate.');
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);

  if (!isCheckoutOpen || !cartVendor || cart.length === 0) return null;

  const currentAddress = student.savedAddresses.find((a) => a.id === selectedAddressId);
  const packagingFee = cartVendor.packagingFee || 150;
  const deliveryFee = deliveryType === 'campus_delivery' ? (cartVendor.deliveryFee || 350) : 0;
  const serviceFee = 100;
  const discountAmount = 0; // any cart discount
  const finalTotal = cartSubtotal + packagingFee + deliveryFee + serviceFee - discountAmount;

  const handlePlaceOrder = () => {
    if (deliveryType === 'campus_delivery' && !currentAddress) {
      showToast('Please select or add a delivery address', 'error');
      return;
    }

    if (paymentMethod === 'wallet' && student.walletBalance < finalTotal) {
      showToast('Insufficient wallet balance. Please choose Card or Bank Transfer', 'error');
      return;
    }

    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);
      const newOrder = createOrder({
        deliveryType,
        address: currentAddress,
        paymentMethod,
        discountAmount,
      });

      if (newOrder) {
        showToast('Payment confirmed! Your order has been placed.', 'success');
      }
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsCheckoutOpen(false)}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '580px', padding: 0, background: '#F8F5EF' }}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid #DDD6CA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#FFFFFF',
          }}
        >
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#241A17' }}>Checkout</h3>
            <p style={{ fontSize: '12px', color: '#8C7B74', marginTop: '2px' }}>
              From <strong style={{ color: '#241A17' }}>{cartVendor.name}</strong>
            </p>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#E9E3D8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#574640',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div style={{ padding: '20px 24px', maxHeight: '68vh', overflowY: 'auto' }}>
          {/* Delivery vs Pickup Toggle */}
          <div
            style={{
              display: 'flex',
              background: '#E9E3D8',
              padding: '4px',
              borderRadius: '14px',
              marginBottom: '20px',
            }}
          >
            <button
              onClick={() => setDeliveryType('campus_delivery')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 700,
                background: deliveryType === 'campus_delivery' ? '#FFFFFF' : 'transparent',
                color: deliveryType === 'campus_delivery' ? '#241A17' : '#8C7B74',
                boxShadow: deliveryType === 'campus_delivery' ? '0 2px 6px rgba(36,26,23,0.08)' : 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              🚴 Campus Delivery (₦{cartVendor.deliveryFee})
            </button>
            <button
              onClick={() => setDeliveryType('self_pickup')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 700,
                background: deliveryType === 'self_pickup' ? '#FFFFFF' : 'transparent',
                color: deliveryType === 'self_pickup' ? '#241A17' : '#8C7B74',
                boxShadow: deliveryType === 'self_pickup' ? '0 2px 6px rgba(36,26,23,0.08)' : 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              🥡 Self-Pickup (Free)
            </button>
          </div>

          {/* Delivery Address Section */}
          {deliveryType === 'campus_delivery' && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#241A17' }}>Delivery Location on Campus</h4>
                <span
                  style={{
                    fontSize: '11px',
                    color: '#7A8469',
                    fontWeight: 700,
                    background: 'rgba(122, 132, 105, 0.12)',
                    padding: '2px 8px',
                    borderRadius: '99px',
                  }}
                >
                  Hostel Drop-off
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {student.savedAddresses.map((addr) => {
                  const isSelected = selectedAddressId === addr.id;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      style={{
                        padding: '14px',
                        borderRadius: '14px',
                        border: isSelected ? '2px solid #D9381E' : '1px solid #DDD6CA',
                        background: isSelected ? 'rgba(217, 56, 30, 0.04)' : '#FFFFFF',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <MapPin size={18} color={isSelected ? '#D9381E' : '#8C7B74'} style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <strong style={{ fontSize: '13px', color: '#241A17' }}>{addr.label}</strong>
                          {addr.isDefault && (
                            <span style={{ fontSize: '10px', background: '#E9E3D8', color: '#574640', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>
                              Default
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: '12px', color: '#574640', marginTop: '2px' }}>
                          {addr.hostelOrBuilding} • {addr.blockOrFloor} • {addr.roomOrNumber}
                        </p>
                        <p style={{ fontSize: '11px', color: '#8C7B74', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Phone size={10} /> {addr.phoneNumber}
                        </p>
                      </div>
                      {isSelected && <CheckCircle2 size={18} color="#D9381E" />}
                    </div>
                  );
                })}
              </div>

              {/* Rider Note */}
              <div style={{ marginTop: '12px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#574640', display: 'block', marginBottom: '4px' }}>
                  Delivery Instructions for Rider
                </label>
                <input
                  type="text"
                  value={riderInstruction}
                  onChange={(e) => setRiderInstruction(e.target.value)}
                  placeholder="e.g. Call my phone when at gate, meet at common room..."
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '10px',
                    border: '1px solid #DDD6CA',
                    background: '#FFFFFF',
                    color: '#241A17',
                    fontSize: '12px',
                    fontFamily: 'inherit',
                    outline: 'none',
                  }}
                />
              </div>
            </div>
          )}

          {/* Payment Method Section */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#241A17', marginBottom: '10px' }}>
              Choose Payment Method
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* Option 1: Kulachops Wallet */}
              <div
                onClick={() => setPaymentMethod('wallet')}
                style={{
                  padding: '14px',
                  borderRadius: '14px',
                  border: paymentMethod === 'wallet' ? '2px solid #D9381E' : '1px solid #DDD6CA',
                  background: paymentMethod === 'wallet' ? 'rgba(217, 56, 30, 0.04)' : '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: 'rgba(217, 56, 30, 0.1)',
                      color: '#D9381E',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Wallet size={18} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <strong style={{ fontSize: '13px', color: '#241A17' }}>In-App Student Wallet</strong>
                      <span
                        style={{
                          fontSize: '10px',
                          background: 'rgba(122, 132, 105, 0.12)',
                          color: '#7A8469',
                          padding: '1px 6px',
                          borderRadius: '4px',
                          fontWeight: 700,
                        }}
                      >
                        Fastest • Zero Failure
                      </span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#8C7B74', marginTop: '2px' }}>
                      Available Balance: <strong style={{ color: '#241A17' }}>₦{student.walletBalance.toLocaleString()}</strong>
                      {student.walletBalance < finalTotal && (
                        <span style={{ color: '#D9381E', marginLeft: '6px', fontWeight: 700 }}>(Insufficient)</span>
                      )}
                    </p>
                  </div>
                </div>
                {paymentMethod === 'wallet' && <CheckCircle2 size={18} color="#D9381E" />}
              </div>

              {/* Option 2: Instant Bank Transfer */}
              <div
                onClick={() => setPaymentMethod('bank_transfer')}
                style={{
                  padding: '14px',
                  borderRadius: '14px',
                  border: paymentMethod === 'bank_transfer' ? '2px solid #D9381E' : '1px solid #DDD6CA',
                  background: paymentMethod === 'bank_transfer' ? 'rgba(217, 56, 30, 0.04)' : '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: 'rgba(181, 154, 104, 0.15)',
                      color: '#B59A68',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Building2 size={18} />
                  </div>
                  <div>
                    <strong style={{ fontSize: '13px', color: '#241A17' }}>Bank Transfer (Virtual Account)</strong>
                    <p style={{ fontSize: '12px', color: '#8C7B74', marginTop: '2px' }}>
                      Dynamic virtual account with instant confirmation
                    </p>
                  </div>
                </div>
                {paymentMethod === 'bank_transfer' && <CheckCircle2 size={18} color="#D9381E" />}
              </div>

              {/* Option 3: Debit Card */}
              <div
                onClick={() => setPaymentMethod('card')}
                style={{
                  padding: '14px',
                  borderRadius: '14px',
                  border: paymentMethod === 'card' ? '2px solid #D9381E' : '1px solid #DDD6CA',
                  background: paymentMethod === 'card' ? 'rgba(217, 56, 30, 0.04)' : '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: '#E9E3D8',
                      color: '#241A17',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CreditCard size={18} />
                  </div>
                  <div>
                    <strong style={{ fontSize: '13px', color: '#241A17' }}>Debit Card (Mastercard / Visa / Verve)</strong>
                    <p style={{ fontSize: '12px', color: '#8C7B74', marginTop: '2px' }}>
                      Secured via licensed PCI-DSS payment gateway
                    </p>
                  </div>
                </div>
                {paymentMethod === 'card' && <CheckCircle2 size={18} color="#D9381E" />}
              </div>
            </div>

            {/* Virtual Account Detail Preview if Bank Transfer Selected */}
            {paymentMethod === 'bank_transfer' && (
              <div
                style={{
                  marginTop: '12px',
                  padding: '14px',
                  borderRadius: '12px',
                  background: '#FFFFFF',
                  border: '1px dashed #B59A68',
                  fontSize: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: '#8C7B74' }}>Bank:</span>
                  <strong style={{ color: '#241A17' }}>Wema Bank / Providus</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', alignItems: 'center' }}>
                  <span style={{ color: '#8C7B74' }}>Account Number:</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <strong style={{ fontSize: '14px', letterSpacing: '1px', color: '#D9381E' }}>
                      8291 049 281
                    </strong>
                    <Copy
                      size={12}
                      style={{ cursor: 'pointer', color: '#8C7B74' }}
                      onClick={() => showToast('Account number copied!', 'info')}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#8C7B74' }}>Account Name:</span>
                  <strong style={{ color: '#241A17' }}>KULACHOPS - Tobi Adeleke</strong>
                </div>
              </div>
            )}
          </div>

          {/* Price Summary */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '14px',
              padding: '14px',
              border: '1px solid #DDD6CA',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              fontSize: '12px',
              color: '#574640',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Items Total:</span>
              <span style={{ color: '#241A17', fontWeight: 600 }}>₦{cartSubtotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Packaging & Delivery:</span>
              <span style={{ color: '#241A17', fontWeight: 600 }}>₦{(packagingFee + deliveryFee).toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Platform Service Fee:</span>
              <span style={{ color: '#241A17', fontWeight: 600 }}>₦{serviceFee.toLocaleString()}</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '8px',
                marginTop: '4px',
                borderTop: '1px solid #E9E3D8',
                fontSize: '14px',
                fontWeight: 800,
                color: '#241A17',
              }}
            >
              <span>Amount to Pay:</span>
              <span style={{ color: '#D9381E', fontSize: '16px' }}>₦{finalTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid #DDD6CA',
            background: '#FFFFFF',
          }}
        >
          <button
            onClick={handlePlaceOrder}
            disabled={isProcessingPayment}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '16px',
              fontSize: '15px',
              background: '#D9381E',
              color: '#FFFFFF',
              boxShadow: '0 4px 14px rgba(217, 56, 30, 0.35)',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 700,
            }}
          >
            {isProcessingPayment ? (
              <span>Confirming Payment & Sending to Kitchen...</span>
            ) : (
              <span>Pay ₦{finalTotal.toLocaleString()} & Place Order</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
