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
  const deliveryFee = cartVendor?.deliveryFee || 350;
  const serviceFee = 100;

  const discountAmount = appliedPromo ? appliedPromo.discount : 0;
  const finalTotal = Math.max(0, cartSubtotal + packagingFee + deliveryFee + serviceFee - discountAmount);

  const handleApplyPromo = () => {
    const cleanCode = promoInput.trim().toUpperCase();
    const found = PROMO_CODES.find((p) => p.code === cleanCode);

    if (found) {
      let discount = 0;
      if (found.discountType === 'fixed') {
        discount = found.value;
      } else {
        discount = Math.round((cartSubtotal * found.value) / 100);
      }
      setAppliedPromo({ code: found.code, discount });
      showToast(`Promo ${found.code} applied! Saved ₦${discount.toLocaleString()}`, 'success');
      setPromoInput('');
    } else {
      showToast('Invalid promo code. Try CHOPLIFE50 or EXAMRUSH', 'error');
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
            borderBottom: '1px solid #DDD6CA',
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
                background: '#FDF1EE',
                color: '#D9381E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShoppingBag size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#241A17' }}>Your Food Tray</h3>
              {cartVendor && (
                <p style={{ fontSize: '12px', color: '#574640', fontWeight: 600 }}>{cartVendor.name}</p>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
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

        {/* Drawer Body: Items or Empty state */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: '#F8F5EF',
                  color: '#8C7B74',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <ShoppingBag size={32} />
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#241A17' }}>Your tray is empty</h4>
              <p style={{ fontSize: '13px', color: '#574640', marginTop: '4px', maxWidth: '240px', margin: '4px auto 20px' }}>
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
                    border: '1px solid #DDD6CA',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#241A17' }}>{item.menuItem.name}</h4>
                      {item.selectedOptions.length > 0 && (
                        <div style={{ marginTop: '4px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          {item.selectedOptions.map((opt) => (
                            <span
                              key={opt.optionId}
                              style={{
                                fontSize: '11px',
                                background: '#F8F5EF',
                                color: '#574640',
                                border: '1px solid #DDD6CA',
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
                        <p style={{ fontSize: '11px', color: '#B59A68', fontStyle: 'italic', marginTop: '4px' }}>
                          "{item.specialInstructions}"
                        </p>
                      )}
                    </div>

                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#241A17' }}>
                      ₦{item.totalPrice.toLocaleString()}
                    </div>
                  </div>

                  {/* Quantity & Delete Controls */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px dashed #DDD6CA' }}>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '12px',
                        color: '#D9381E',
                        fontWeight: 600,
                      }}
                    >
                      <Trash2 size={13} /> Remove
                    </button>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: '#E9E3D8',
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
                          color: '#241A17',
                        }}
                      >
                        <Minus size={11} />
                      </button>
                      <span style={{ fontSize: '13px', fontWeight: 800, minWidth: '16px', textAlign: 'center', color: '#241A17' }}>
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
                          color: '#241A17',
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
                  background: '#F8F5EF',
                  borderRadius: '14px',
                  padding: '12px',
                  border: '1px solid #DDD6CA',
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
                      border: '1px solid #DDD6CA',
                    }}
                  >
                    <Tag size={15} color="#8C7B74" />
                    <input
                      type="text"
                      placeholder="Enter promo code (e.g. CHOPLIFE50)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                      style={{
                        border: 'none',
                        outline: 'none',
                        width: '100%',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#241A17',
                        fontFamily: 'inherit',
                      }}
                    />
                  </div>
                  <button
                    onClick={handleApplyPromo}
                    style={{
                      background: '#241A17',
                      color: '#FFFFFF',
                      padding: '8px 14px',
                      borderRadius: '10px',
                      fontSize: '12px',
                      fontWeight: 700,
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
                      color: '#7A8469',
                      fontWeight: 700,
                    }}
                  >
                    <span>✓ Code {appliedPromo.code} applied</span>
                    <button
                      onClick={() => setAppliedPromo(null)}
                      style={{ color: '#D9381E', fontSize: '11px', textDecoration: 'underline' }}
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
                  border: '1px solid #DDD6CA',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  fontSize: '13px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#574640' }}>
                  <span>Food Items Subtotal</span>
                  <span style={{ fontWeight: 600, color: '#241A17' }}>₦{cartSubtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#574640' }}>
                  <span>Campus Packaging Fee</span>
                  <span style={{ fontWeight: 600, color: '#241A17' }}>₦{packagingFee.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#574640' }}>
                  <span>Hostel Delivery Fee</span>
                  <span style={{ fontWeight: 600, color: '#241A17' }}>₦{deliveryFee.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#574640' }}>
                  <span>Student Service Fee</span>
                  <span style={{ fontWeight: 600, color: '#241A17' }}>₦{serviceFee.toLocaleString()}</span>
                </div>

                {appliedPromo && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#7A8469', fontWeight: 700 }}>
                    <span>Promo Discount ({appliedPromo.code})</span>
                    <span>-₦{appliedPromo.discount.toLocaleString()}</span>
                  </div>
                )}

                <div
                  style={{
                    paddingTop: '10px',
                    marginTop: '4px',
                    borderTop: '1.5px solid #DDD6CA',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: '15px', fontWeight: 800, color: '#241A17' }}>Total Amount</span>
                  <span style={{ fontSize: '18px', fontWeight: 900, color: '#D9381E' }}>
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
              borderTop: '1px solid #DDD6CA',
              background: '#FFFFFF',
              boxShadow: '0 -4px 12px rgba(36,26,23,0.04)',
            }}
          >
            <button
              onClick={handleProceedToCheckout}
              className="btn-primary"
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
                color: '#574640',
              }}
            >
              <ShieldCheck size={14} color="#7A8469" />
              <span>Safe student payment with 4-digit handover verification</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
