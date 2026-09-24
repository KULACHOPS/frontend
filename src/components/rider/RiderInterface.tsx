import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bike,
  CheckCircle2,
  Navigation,
  KeyRound,
} from 'lucide-react';

export const RiderInterface: React.FC = () => {
  const {
    isRiderOnline,
    setIsRiderOnline,
    orders,
    riderAcceptOrder,
    riderConfirmPickup,
    riderConfirmDelivery,
    showToast,
  } = useApp();

  const [inputDeliveryCode, setInputDeliveryCode] = useState<Record<string, string>>({});

  // Orders that need a rider or are assigned to rider
  const availableJobOffers = orders.filter((o) => o.status === 'ready_for_pickup');
  const activeDeliveries = orders.filter(
    (o) => o.status === 'rider_assigned' || o.status === 'picked_up_on_way' || o.status === 'arrived_at_hostel'
  );
  const deliveredJobs = orders.filter((o) => o.status === 'delivered');

  const totalRiderEarnings = deliveredJobs.length * 450;

  const handleCompleteDelivery = (orderId: string) => {
    const code = inputDeliveryCode[orderId] || '';
    if (!code || code.length !== 4) {
      showToast('Please enter the 4-digit delivery PIN shown on the student’s phone', 'error');
      return;
    }

    const result = riderConfirmDelivery(orderId, code);
    if (!result.success) {
      showToast(result.message, 'error');
    } else {
      setInputDeliveryCode((prev) => ({ ...prev, [orderId]: '' }));
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '24px 0 80px' }}>
      {/* Rider Header Bar */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '20px 24px',
          border: '1px solid #DDD6CA',
          boxShadow: '0 4px 15px rgba(36,26,23,0.04)',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: 'rgba(122, 132, 105, 0.15)',
              color: '#7A8469',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Bike size={26} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#241A17' }}>Emeka Nwosu</h3>
              <span
                style={{
                  background: isRiderOnline ? 'rgba(122, 132, 105, 0.15)' : '#E9E3D8',
                  color: isRiderOnline ? '#7A8469' : '#8C7B74',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '99px',
                }}
              >
                {isRiderOnline ? 'ONLINE (ACTIVE)' : 'OFFLINE'}
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#8C7B74' }}>
              UNILAG Campus Dispatch Rider • Bicycle & Foot Courier
            </p>
          </div>
        </div>

        {/* Online / Offline Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => {
              setIsRiderOnline(!isRiderOnline);
              showToast(isRiderOnline ? 'Shift ended. You are now offline.' : 'Shift started! You are online for delivery requests.', 'info');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '999px',
              background: isRiderOnline ? '#7A8469' : '#8C7B74',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '13px',
              boxShadow: isRiderOnline ? '0 4px 12px rgba(122, 132, 105, 0.35)' : 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#FFFFFF',
              }}
            />
            <span>{isRiderOnline ? 'Go Offline' : 'Go Online'}</span>
          </button>
        </div>
      </div>

      {/* Rider Stats Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '14px',
          marginBottom: '24px',
        }}
      >
        <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '16px', border: '1px solid #DDD6CA' }}>
          <span style={{ fontSize: '12px', color: '#8C7B74', fontWeight: 600 }}>Today's Delivery Earnings</span>
          <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#7A8469', marginTop: '4px' }}>
            ₦{totalRiderEarnings.toLocaleString()}
          </h3>
        </div>
        <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '16px', border: '1px solid #DDD6CA' }}>
          <span style={{ fontSize: '12px', color: '#8C7B74', fontWeight: 600 }}>Completed Hostels Runs</span>
          <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#241A17', marginTop: '4px' }}>
            {deliveredJobs.length} drops
          </h3>
        </div>
        <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '16px', border: '1px solid #DDD6CA' }}>
          <span style={{ fontSize: '12px', color: '#8C7B74', fontWeight: 600 }}>Courier Rating</span>
          <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#B59A68', marginTop: '4px' }}>
            4.9 ★ (142 reviews)
          </h3>
        </div>
      </div>

      {/* Section 1: Active Deliveries in Progress */}
      {activeDeliveries.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#241A17', marginBottom: '14px' }}>
            Active Delivery in Progress ({activeDeliveries.length})
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {activeDeliveries.map((ord) => (
              <div
                key={ord.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '18px',
                  padding: '20px',
                  border: '2px solid #D9381E',
                  boxShadow: '0 6px 20px rgba(217, 56, 30, 0.1)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#D9381E', textTransform: 'uppercase' }}>
                      Current Mission
                    </span>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#241A17' }}>
                      Order #{ord.orderNumber}
                    </h3>
                  </div>

                  <span
                    style={{
                      background: 'rgba(122, 132, 105, 0.15)',
                      color: '#7A8469',
                      padding: '4px 12px',
                      borderRadius: '99px',
                      fontSize: '13px',
                      fontWeight: 800,
                    }}
                  >
                    +₦450 Payout
                  </span>
                </div>

                {/* Pickup & Dropoff details */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ background: '#F8F5EF', padding: '12px 14px', borderRadius: '12px', border: '1px solid #DDD6CA' }}>
                    <span style={{ fontSize: '11px', color: '#8C7B74', fontWeight: 700, textTransform: 'uppercase' }}>
                      Pickup Canteen:
                    </span>
                    <strong style={{ fontSize: '14px', color: '#241A17', display: 'block', marginTop: '2px' }}>
                      {ord.vendorName}
                    </strong>
                    <p style={{ fontSize: '11px', color: '#574640', marginTop: '2px' }}>
                      Items: {ord.items.map((i) => `${i.quantity}x ${i.menuItem.name}`).join(', ')}
                    </p>
                  </div>

                  <div style={{ background: '#F8F5EF', padding: '12px 14px', borderRadius: '12px', border: '1px solid #DDD6CA' }}>
                    <span style={{ fontSize: '11px', color: '#8C7B74', fontWeight: 700, textTransform: 'uppercase' }}>
                      Hostel Drop-off:
                    </span>
                    <strong style={{ fontSize: '14px', color: '#241A17', display: 'block', marginTop: '2px' }}>
                      {ord.deliveryAddress?.hostelOrBuilding || 'Campus Hostel'}
                    </strong>
                    <p style={{ fontSize: '11px', color: '#574640', marginTop: '2px' }}>
                      {ord.deliveryAddress?.blockOrFloor} • {ord.deliveryAddress?.roomOrNumber}
                    </p>
                    <p style={{ fontSize: '11px', color: '#B59A68', fontWeight: 700, marginTop: '2px' }}>
                      Contact: {ord.studentName} ({ord.studentPhone})
                    </p>
                  </div>
                </div>

                {/* Step Action 1: Confirm Pickup */}
                {ord.status === 'rider_assigned' && (
                  <button
                    onClick={() => riderConfirmPickup(ord.id)}
                    className="btn-primary"
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '12px',
                      fontSize: '14px',
                      background: '#D9381E',
                      color: '#FFFFFF',
                      border: 'none',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    <CheckCircle2 size={16} /> I Have Collected Food From {ord.vendorName}
                  </button>
                )}

                {/* Step Action 2: Enter Student's 4-digit code to complete delivery */}
                {ord.status === 'picked_up_on_way' && (
                  <div
                    style={{
                      background: 'rgba(217, 56, 30, 0.04)',
                      padding: '16px',
                      borderRadius: '14px',
                      border: '1.5px dashed #D9381E',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <KeyRound size={18} color="#D9381E" />
                      <strong style={{ fontSize: '14px', color: '#241A17' }}>
                        Enter Student's 4-Digit Handover Code
                      </strong>
                    </div>
                    <p style={{ fontSize: '12px', color: '#8C7B74', marginBottom: '12px' }}>
                      Ask {ord.studentName} at the hostel door for the 4-digit PIN on their Kulachops app to verify delivery.
                    </p>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        maxLength={4}
                        placeholder="e.g. 7492"
                        value={inputDeliveryCode[ord.id] || ''}
                        onChange={(e) =>
                          setInputDeliveryCode((prev) => ({ ...prev, [ord.id]: e.target.value.replace(/\D/g, '') }))
                        }
                        style={{
                          width: '140px',
                          textAlign: 'center',
                          fontSize: '20px',
                          fontWeight: 800,
                          letterSpacing: '4px',
                          padding: '10px',
                          borderRadius: '10px',
                          border: '2px solid #DDD6CA',
                          background: '#FFFFFF',
                          color: '#241A17',
                          outline: 'none',
                          fontFamily: 'monospace',
                        }}
                      />
                      <button
                        onClick={() => handleCompleteDelivery(ord.id)}
                        className="btn-primary"
                        style={{
                          flex: 1,
                          padding: '10px 16px',
                          borderRadius: '10px',
                          fontSize: '14px',
                          background: '#D9381E',
                          color: '#FFFFFF',
                          border: 'none',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        Confirm & Complete Delivery
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 2: Incoming Delivery Job Offers */}
      <div>
        <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#241A17', marginBottom: '14px' }}>
          Available Delivery Requests on Campus ({availableJobOffers.length})
        </h4>

        {availableJobOffers.length === 0 ? (
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '40px',
              textAlign: 'center',
              border: '1px solid #DDD6CA',
              color: '#8C7B74',
            }}
          >
            <Navigation size={32} style={{ margin: '0 auto 8px', color: '#B59A68' }} />
            <p style={{ fontSize: '14px', fontWeight: 600 }}>No pending pickup requests right now.</p>
            <p style={{ fontSize: '12px', color: '#8C7B74', marginTop: '2px' }}>
              Keep this screen open to receive instant alerts when campus kitchens finish cooking.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '14px' }}>
            {availableJobOffers.map((offer) => (
              <div
                key={offer.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '16px',
                  border: '1px solid #DDD6CA',
                  boxShadow: '0 2px 8px rgba(36,26,23,0.04)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <strong style={{ fontSize: '14px', color: '#241A17' }}>#{offer.orderNumber}</strong>
                  <span
                    style={{
                      background: 'rgba(122, 132, 105, 0.15)',
                      color: '#7A8469',
                      fontSize: '12px',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '99px',
                    }}
                  >
                    +₦450 Earnings
                  </span>
                </div>

                <div style={{ fontSize: '12px', color: '#574640', marginBottom: '12px' }}>
                  <p>
                    <strong>From:</strong> {offer.vendorName}
                  </p>
                  <p style={{ marginTop: '2px' }}>
                    <strong>To:</strong> {offer.deliveryAddress?.hostelOrBuilding || 'Campus hostel'}
                  </p>
                  <p style={{ fontSize: '11px', color: '#8C7B74', marginTop: '4px' }}>
                    Distance: ~0.8 km across campus • Ready now
                  </p>
                </div>

                <button
                  onClick={() => riderAcceptOrder(offer.id)}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '13px',
                    borderRadius: '10px',
                    background: '#D9381E',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Accept Delivery Job
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
