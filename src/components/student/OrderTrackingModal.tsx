import React from 'react';
import { useApp } from '../../context/AppContext';
import type { OrderStatus } from '../../types';
import {
  X,
  Clock,
  Phone,
  CheckCircle2,
  Bike,
  KeyRound,
  Download,
  Star,
  MapPin,
} from 'lucide-react';

export const OrderTrackingModal: React.FC = () => {
  const {
    activeTrackingOrderId,
    setActiveTrackingOrderId,
    orders,
    cancelOrder,
    openRatingForOrder,
    showToast,
  } = useApp();

  if (!activeTrackingOrderId) return null;

  const order = orders.find((o) => o.id === activeTrackingOrderId);
  if (!order) return null;

  const stages: { key: OrderStatus; label: string; desc: string }[] = [
    { key: 'paid_awaiting_vendor', label: 'Order Confirmed', desc: 'Sent to kitchen for acceptance' },
    { key: 'accepted', label: 'Accepted by Kitchen', desc: 'Queued for cooking' },
    { key: 'preparing', label: 'Cooking in Kitchen', desc: 'Fresh ingredients on the fire' },
    { key: 'ready_for_pickup', label: 'Food Ready', desc: 'Campus rider dispatched' },
    { key: 'picked_up_on_way', label: 'Rider on the Way', desc: 'Heading to your hostel' },
    { key: 'delivered', label: 'Delivered', desc: 'Chop life enjoy your meal!' },
  ];

  const getStageIndex = (status: OrderStatus) => {
    switch (status) {
      case 'pending_payment':
      case 'paid_awaiting_vendor':
        return 0;
      case 'accepted':
        return 1;
      case 'preparing':
        return 2;
      case 'ready_for_pickup':
        return 3;
      case 'rider_assigned':
      case 'picked_up_on_way':
      case 'arrived_at_hostel':
        return 4;
      case 'delivered':
        return 5;
      case 'cancelled':
        return -1;
      default:
        return 0;
    }
  };

  const currentStageIndex = getStageIndex(order.status);
  const isDelivered = order.status === 'delivered';
  const isCancelled = order.status === 'cancelled';

  return (
    <div className="modal-overlay" onClick={() => setActiveTrackingOrderId(null)}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '600px', padding: 0 }}
      >
        {/* Top Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #DDD6CA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#FFFFFF',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                background: '#D9381E',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '6px',
              }}
            >
              LIVE TRACKING
            </span>
            <span style={{ fontSize: '14px', fontWeight: 800, color: '#241A17' }}>
              Order #{order.orderNumber}
            </span>
          </div>

          <button
            onClick={() => setActiveTrackingOrderId(null)}
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

        {/* Scrollable Tracking Body */}
        <div style={{ padding: '20px', maxHeight: '72vh', overflowY: 'auto' }}>
          {/* Main Status Hero Card */}
          <div
            style={{
              background: isCancelled
                ? 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)'
                : isDelivered
                ? 'linear-gradient(135deg, #7A8469 0%, #575E4B 100%)'
                : 'linear-gradient(135deg, #D9381E 0%, #A92610 100%)',
              borderRadius: '20px',
              padding: '20px',
              color: '#FFFFFF',
              boxShadow: '0 8px 24px rgba(217, 56, 30, 0.25)',
              marginBottom: '20px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.9 }}>
                  Estimated Arrival
                </p>
                <h3 style={{ fontSize: '24px', fontWeight: 900, marginTop: '2px' }}>
                  {isDelivered ? 'Order Delivered 🎉' : isCancelled ? 'Order Cancelled' : order.estimatedDeliveryTime}
                </h3>
                <p style={{ fontSize: '13px', opacity: 0.95, marginTop: '4px' }}>
                  {isDelivered
                    ? 'Delivered to your room! Hope you enjoyed the meal.'
                    : isCancelled
                    ? order.cancelReason || 'Order was cancelled and refunded.'
                    : `Your hot food from ${order.vendorName} is on campus!`}
                </p>
              </div>

              {!isDelivered && !isCancelled && (
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Bike size={24} color="#FFFFFF" className="pulse-indicator" />
                </div>
              )}
            </div>

            {/* 4-DIGIT CONFIRMATION CODE BANNER (PRD OM-06) */}
            {!isDelivered && !isCancelled && (
              <div
                style={{
                  marginTop: '16px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '14px',
                  padding: '12px 16px',
                  color: '#241A17',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 12px rgba(36,26,23,0.1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: '#FDF1EE',
                      color: '#D9381E',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <KeyRound size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#8C7B74', textTransform: 'uppercase' }}>
                      Delivery Handover Code
                    </span>
                    <p style={{ fontSize: '11px', color: '#574640' }}>
                      Show this 4-digit PIN to the rider to collect food
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 900,
                    letterSpacing: '4px',
                    color: '#D9381E',
                    background: '#FDF1EE',
                    padding: '4px 12px',
                    borderRadius: '8px',
                    border: '1.5px dashed #D9381E',
                  }}
                >
                  {order.deliveryCode}
                </div>
              </div>
            )}
          </div>

          {/* Interactive Campus Route Map Simulation */}
          {!isCancelled && (
            <div
              style={{
                borderRadius: '18px',
                border: '1px solid #DDD6CA',
                background: '#F8F5EF',
                padding: '16px',
                marginBottom: '20px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#241A17', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={14} color="#D9381E" /> Campus Route Live View
                </span>
                <span style={{ fontSize: '11px', color: '#7A8469', fontWeight: 700 }}>
                  ● GPS Signal Active
                </span>
              </div>

              {/* Simulated Campus SVG Map */}
              <div
                style={{
                  height: '110px',
                  background: '#E9E3D8',
                  borderRadius: '14px',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 24px',
                }}
              >
                {/* SVG Route Line */}
                <svg
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 50 55 Q 160 20, 280 55 T 480 55"
                    fill="none"
                    stroke="#DDD6CA"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 50 55 Q 160 20, 280 55 T 480 55"
                    fill="none"
                    stroke="#D9381E"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="12 6"
                  />
                </svg>

                {/* Point A: Canteen */}
                <div style={{ position: 'absolute', left: '30px', textAlign: 'center', zIndex: 2 }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: '#241A17',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                      margin: '0 auto 4px',
                    }}
                  >
                    🍳
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#574640' }}>Canteen</span>
                </div>

                {/* Point B: Rider Location (Simulated moving position) */}
                <div
                  style={{
                    position: 'absolute',
                    left: currentStageIndex >= 4 ? '60%' : currentStageIndex >= 3 ? '35%' : '15%',
                    transform: 'translateX(-50%)',
                    textAlign: 'center',
                    zIndex: 3,
                    transition: 'left 1s ease',
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: '#D9381E',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(217, 56, 30, 0.4)',
                      margin: '0 auto 2px',
                    }}
                  >
                    <Bike size={18} />
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: '#D9381E', background: '#fff', padding: '1px 6px', borderRadius: '4px' }}>
                    Rider
                  </span>
                </div>

                {/* Point C: Student Hostel */}
                <div style={{ position: 'absolute', right: '30px', textAlign: 'center', zIndex: 2 }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: '#7A8469',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                      margin: '0 auto 4px',
                    }}
                  >
                    🏢
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#574640' }}>
                    {order.deliveryAddress?.hostelOrBuilding || 'Your Hostel'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Stepper Timeline */}
          {!isCancelled && (
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#241A17', marginBottom: '16px' }}>
                Order Lifecycle Progress
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {stages.map((stage, idx) => {
                  const isCompleted = currentStageIndex >= idx;
                  const isCurrent = currentStageIndex === idx;

                  return (
                    <div key={stage.key} style={{ display: 'flex', gap: '14px', position: 'relative' }}>
                      {/* Connecting vertical line */}
                      {idx < stages.length - 1 && (
                        <div
                          style={{
                            position: 'absolute',
                            left: '13px',
                            top: '26px',
                            bottom: '-12px',
                            width: '2px',
                            background: isCompleted && currentStageIndex > idx ? '#D9381E' : '#DDD6CA',
                          }}
                        />
                      )}

                      {/* Step Circle */}
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: isCompleted ? '#D9381E' : '#E9E3D8',
                          color: isCompleted ? '#FFFFFF' : '#8C7B74',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 2,
                          boxShadow: isCurrent ? '0 0 0 4px rgba(217, 56, 30, 0.2)' : 'none',
                        }}
                      >
                        {isCompleted ? <CheckCircle2 size={16} strokeWidth={2.5} /> : <Clock size={14} />}
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <h5
                            style={{
                              fontSize: '13px',
                              fontWeight: isCurrent ? 800 : 600,
                              color: isCurrent ? '#D9381E' : isCompleted ? '#241A17' : '#8C7B74',
                            }}
                          >
                            {stage.label}
                          </h5>
                          {isCurrent && (
                            <span
                              style={{
                                fontSize: '10px',
                                background: '#FDF1EE',
                                color: '#D9381E',
                                fontWeight: 800,
                                padding: '1px 6px',
                                borderRadius: '4px',
                              }}
                            >
                              Current Stage
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: '12px', color: '#574640', marginTop: '2px' }}>
                          {stage.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Assigned Rider Information Card */}
          {order.riderName && !isCancelled && (
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '14px 16px',
                border: '1px solid #DDD6CA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src={order.riderAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'}
                  alt={order.riderName}
                  style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <strong style={{ fontSize: '14px', color: '#241A17' }}>{order.riderName}</strong>
                    <span style={{ fontSize: '10px', background: 'rgba(122, 132, 105, 0.12)', color: '#7A8469', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                      Campus Rider
                    </span>
                  </div>
                  <p style={{ fontSize: '11px', color: '#574640', marginTop: '2px' }}>
                    Verified student courier • UNILAG Fleet
                  </p>
                </div>
              </div>

              <a
                href={`tel:${order.riderPhone}`}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: '#7A8469',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(122, 132, 105, 0.3)',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  showToast(`Calling rider: ${order.riderPhone}`, 'info');
                }}
              >
                <Phone size={18} />
              </a>
            </div>
          )}

          {/* Ordered Food Items Summary */}
          <div
            style={{
              background: '#F8F5EF',
              borderRadius: '16px',
              padding: '16px',
              border: '1px solid #DDD6CA',
              marginBottom: '16px',
            }}
          >
            <h5 style={{ fontSize: '13px', fontWeight: 800, color: '#241A17', marginBottom: '10px' }}>
              Order Receipt ({order.items.length} items)
            </h5>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              {order.items.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', color: '#574640' }}>
                  <span>
                    {item.quantity}x {item.menuItem.name}
                  </span>
                  <span style={{ fontWeight: 700, color: '#241A17' }}>₦{item.totalPrice.toLocaleString()}</span>
                </div>
              ))}

              <div
                style={{
                  borderTop: '1px solid #DDD6CA',
                  paddingTop: '8px',
                  marginTop: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: 800,
                  fontSize: '13px',
                  color: '#241A17',
                }}
              >
                <span>Paid via {order.paymentMethod === 'wallet' ? 'Student Wallet' : order.paymentMethod.toUpperCase()}</span>
                <span style={{ color: '#D9381E' }}>₦{order.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Actions: Rate Order if delivered, or Cancel order if pending */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {isDelivered && (
              <button
                onClick={() => openRatingForOrder(order)}
                className="btn-primary"
                style={{ flex: 1, padding: '12px' }}
              >
                <Star size={16} /> Rate Meal & Delivery Rider
              </button>
            )}

            {currentStageIndex < 2 && !isCancelled && (
              <button
                onClick={() => {
                  const conf = window.confirm('Are you sure you want to cancel this order? Full refund will be added to your Kulachops wallet.');
                  if (conf) cancelOrder(order.id, 'Student cancelled order');
                }}
                className="btn-secondary"
                style={{ flex: 1, color: '#EF4444', borderColor: '#FECACA' }}
              >
                Cancel Order & Refund
              </button>
            )}

            <button
              onClick={() => showToast('E-Receipt downloaded as PDF (Simulated)', 'success')}
              className="btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Download size={15} /> Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
