import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PROMO_CODES } from '../../data/mockData';
import { X, Trash2, Plus, Minus, Tag, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartVendor,
    cartSubtotal,
    removeFromCart,
    updateCartQuantity,
    setIsCheckoutOpen,
    showToast,
    isAuthenticated,
    setIsAuthModalOpen,
  } = useApp();

  const [promoInput, setPromoInput] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);

  if (!isCartOpen) return null;

  const packagingFee = cartVendor?.packagingFee || 150;
  const deliveryFee = cartVendor?.deliveryFee || 250;
  const serviceFee = 100;

  const discountAmount = appliedPromo ? appliedPromo.discount : 0;
  const finalTotal = Math.max(0, cartSubtotal + packagingFee + deliveryFee + serviceFee - discountAmount);

  const handleApplyPromo = () => {
    const cleanCode = promoInput.trim().toUpperCase();
    const found = PROMO_CODES.find((p) => p.code === cleanCode);

    if (found) {
      const discount = found.discountType === 'fixed'
        ? found.value
        : Math.round((cartSubtotal * found.value) / 100);
      setAppliedPromo({ code: found.code, discount });
      showToast(`Promo ${found.code} applied! Saved ₦${discount.toLocaleString()}`, 'success');
      setPromoInput('');
    } else {
      showToast('Invalid promo code. Try CHOPLIFE or EXAMRUSH', 'error');
    }
  };

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      showToast('Please sign in to your student account to place your order', 'info');
      setIsAuthModalOpen(true);
      return;
    }
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="drawer-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #E5EAE7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#FFF0E8',
                color: '#FF5500',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShoppingBag size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#090C0B' }}>Your Food Bag</h3>
              {cartVendor && (
                <p style={{ fontSize: '12px', color: '#525C57', fontWeight: 600 }}>{cartVendor.name}</p>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
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

        {/* Drawer Body: Items or Empty state */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: '#F0F3F1',
                  color: '#8E9993',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <ShoppingBag size={32} />
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#090C0B' }}>Your food bag is empty</h4>
              <p style={{ fontSize: '13px', color: '#525C57', marginTop: '4px', maxWidth: '240px', margin: '4px auto 20px' }}>
                Add hot party jollof, crunchy shawarmas or cold chillers to get started!
              </p>
              <button onClick={() => setIsCartOpen(false)} className="btn-secondary">
                Explore Canteens
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '14px',
                    border: '1px solid #E5EAE7',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#090C0B' }}>{item.menuItem.name}</h4>
                      {item.selectedOptions.length > 0 && (
                        <div style={{ marginTop: '4px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          {item.selectedOptions.map((opt) => (
                            <span
                              key={opt.optionId}
                              style={{
                                fontSize: '11px',
                                background: '#F0F3F1',
                                color: '#525C57',
                                border: '1px solid #E5EAE7',
                                padding: '1px 6px',
                                borderRadius: '4px',
                              }}
                            >
                              {opt.optionName} {opt.price > 0 ? `(+₦${opt.price})` : ''}
                            </span>
                          ))}
                        </div>
                      )}
                      {item.specialInstructions && (
                        <p style={{ fontSize: '11px', color: '#FF5500', fontStyle: 'italic', marginTop: '4px' }}>
                          "{item.specialInstructions}"
                        </p>
                      )}
                    </div>

                    <div style={{ fontSize: '14px', fontWeight: 900, color: '#090C0B' }}>
                      ₦{item.totalPrice.toLocaleString()}
                    </div>
                  </div>

                  {/* Quantity & Delete Controls */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px dashed #E5EAE7' }}>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '12px',
                        color: '#E80B2E',
                        fontWeight: 700,
                      }}
                    >
                      <Trash2 size={13} /> Remove
                    </button>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: '#F0F3F1',
                        padding: '4px 10px',
                        borderRadius: '99px',
                      }}
                    >
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          background: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#090C0B',
                        }}
                      >
                        <Minus size={11} />
                      </button>
                      <span style={{ fontSize: '13px', fontWeight: 800, minWidth: '16px', textAlign: 'center', color: '#090C0B' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          background: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#090C0B',
                        }}
                      >
                        <Plus size={11} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Promo Code Input Box */}
              <div
                style={{
                  background: '#F0F3F1',
                  borderRadius: '14px',
                  padding: '12px',
                  border: '1px solid #E5EAE7',
                  marginTop: '8px',
                }}
              >
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#FFFFFF',
                      borderRadius: '10px',
                      padding: '8px 12px',
                      border: '1px solid #E5EAE7',
                    }}
                  >
                    <Tag size={15} color="#8E9993" />
                    <input
                      type="text"
                      placeholder="Enter promo code (e.g. CHOPLIFE)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                      style={{
                        border: 'none',
                        outline: 'none',
                        width: '100%',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#090C0B',
                        fontFamily: 'inherit',
                      }}
                    />
                  </div>
                  <button
                    onClick={handleApplyPromo}
                    style={{
                      background: '#FF5500',
                      color: '#FFFFFF',
                      padding: '8px 14px',
                      borderRadius: '10px',
                      fontSize: '12px',
                      fontWeight: 800,
                    }}
                  >
                    Apply
                  </button>
                </div>

                {appliedPromo && (
                  <div
                    style={{
                      marginTop: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '12px',
                      color: '#FF5500',
                      fontWeight: 800,
                    }}
                  >
                    <span>✓ Code {appliedPromo.code} applied</span>
                    <button
                      onClick={() => setAppliedPromo(null)}
                      style={{ color: '#E80B2E', fontSize: '11px', textDecoration: 'underline' }}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Breakdown Table */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '16px',
                  border: '1px solid #E5EAE7',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  fontSize: '13px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#525C57' }}>
                  <span>Food Items Subtotal</span>
                  <span style={{ fontWeight: 700, color: '#090C0B' }}>₦{cartSubtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#525C57' }}>
                  <span>Campus Packaging Fee</span>
                  <span style={{ fontWeight: 700, color: '#090C0B' }}>₦{packagingFee.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#525C57' }}>
                  <span>Hostel Delivery Fee</span>
                  <span style={{ fontWeight: 700, color: '#090C0B' }}>₦{deliveryFee.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#525C57' }}>
                  <span>Student Service Fee</span>
                  <span style={{ fontWeight: 700, color: '#090C0B' }}>₦{serviceFee.toLocaleString()}</span>
                </div>

                {appliedPromo && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#FF5500', fontWeight: 800 }}>
                    <span>Promo Discount ({appliedPromo.code})</span>
                    <span>-₦{appliedPromo.discount.toLocaleString()}</span>
                  </div>
                )}

                <div
                  style={{
                    paddingTop: '10px',
                    marginTop: '4px',
                    borderTop: '1.5px solid #E5EAE7',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: '15px', fontWeight: 900, color: '#090C0B' }}>Total Amount</span>
                  <span style={{ fontSize: '19px', fontWeight: 900, color: '#FF5500' }}>
                    ₦{finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Sticky Footer Checkout CTA */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '16px 24px',
              borderTop: '1px solid #E5EAE7',
              background: '#FFFFFF',
              boxShadow: '0 -4px 12px rgba(9,12,11,0.04)',
            }}
          >
            <button
              onClick={handleProceedToCheckout}
              className="btn-yellow"
              style={{ width: '100%', padding: '14px', borderRadius: '16px', fontSize: '15px' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                marginTop: '10px',
                fontSize: '11px',
                color: '#525C57',
              }}
            >
              <ShieldCheck size={14} color="#FF5500" />
              <span>Safe student payment with 4-digit handover verification</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
