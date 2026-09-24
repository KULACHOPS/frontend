import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Receipt, RotateCcw } from 'lucide-react';

export const OrderHistoryModal: React.FC = () => {
  const { isOrderHistoryOpen, setIsOrderHistoryOpen, orders, setActiveTrackingOrderId, showToast } = useApp();

  if (!isOrderHistoryOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsOrderHistoryOpen(false)}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '540px', padding: 0, background: '#F8F5EF' }}
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
            <Receipt size={20} color="#D9381E" />
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#241A17' }}>Your Order History</h3>
          </div>
          <button
            onClick={() => setIsOrderHistoryOpen(false)}
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

        {/* Orders list */}
        <div style={{ padding: '20px 24px', maxHeight: '65vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {orders.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#8C7B74', padding: '40px 0', fontSize: '14px' }}>
              No orders yet. Place your first campus food order today!
            </p>
          ) : (
            orders.map((ord) => {
              const isDelivered = ord.status === 'delivered';
              const isCancelled = ord.status === 'cancelled';
              const isActive = !isDelivered && !isCancelled;

              return (
                <div
                  key={ord.id}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '16px',
                    border: '1px solid #DDD6CA',
                    boxShadow: '0 2px 8px rgba(36, 26, 23, 0.04)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#241A17' }}>
                          {ord.vendorName}
                        </h4>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: '99px',
                            background: isDelivered ? 'rgba(122, 132, 105, 0.12)' : isCancelled ? '#FEE2E2' : 'rgba(217, 56, 30, 0.1)',
                            color: isDelivered ? '#7A8469' : isCancelled ? '#DC2626' : '#D9381E',
                            border: `1px solid ${isDelivered ? 'rgba(122, 132, 105, 0.25)' : isCancelled ? '#FCA5A5' : 'rgba(217, 56, 30, 0.2)'}`,
                          }}
                        >
                          {isActive ? 'In Progress 🚴' : isDelivered ? 'Delivered ✓' : 'Cancelled'}
                        </span>
                      </div>
                      <span style={{ fontSize: '12px', color: '#8C7B74' }}>
                        Order #{ord.orderNumber} • {new Date(ord.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <span style={{ fontSize: '15px', fontWeight: 800, color: '#241A17' }}>
                      ₦{ord.totalAmount.toLocaleString()}
                    </span>
                  </div>

                  <p style={{ fontSize: '12px', color: '#574640', marginBottom: '12px' }}>
                    {ord.items.map((i) => `${i.quantity}x ${i.menuItem.name}`).join(', ')}
                  </p>

                  <div style={{ display: 'flex', gap: '8px', paddingTop: '10px', borderTop: '1px solid #E9E3D8' }}>
                    <button
                      onClick={() => {
                        setIsOrderHistoryOpen(false);
                        setActiveTrackingOrderId(ord.id);
                      }}
                      className="btn-secondary"
                      style={{
                        flex: 1,
                        padding: '9px 12px',
                        fontSize: '12px',
                        fontWeight: 700,
                        borderRadius: '10px',
                        background: '#E9E3D8',
                        color: '#241A17',
                        border: '1px solid #DDD6CA',
                        cursor: 'pointer',
                      }}
                    >
                      {isActive ? 'Track Live Status' : 'View Details & Receipt'}
                    </button>

                    <button
                      onClick={() => showToast(`Added items from ${ord.vendorName} to tray!`, 'success')}
                      className="btn-secondary"
                      style={{
                        padding: '9px 12px',
                        fontSize: '12px',
                        fontWeight: 700,
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: '#E9E3D8',
                        color: '#241A17',
                        border: '1px solid #DDD6CA',
                        cursor: 'pointer',
                      }}
                    >
                      <RotateCcw size={13} color="#D9381E" /> Reorder
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
