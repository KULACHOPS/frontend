import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Store,
  Bell,
  Clock,
  CheckCircle2,
  ChefHat,
} from 'lucide-react';

export const VendorDashboard: React.FC = () => {
  const {
    vendors,
    activeVendorId,
    setActiveVendorId,
    orders,
    vendorAcceptOrder,
    vendorStartPreparing,
    vendorMarkReady,
    menuItems,
    toggleItemAvailability,
    toggleVendorStatus,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'menu' | 'earnings'>('orders');
  const [soundEnabled, setSoundEnabled] = useState(true);

  const vendor = vendors.find((v) => v.id === activeVendorId) || vendors[0];
  const vendorOrders = orders.filter((o) => o.vendorId === vendor.id);

  const pendingOrders = vendorOrders.filter((o) => o.status === 'paid_awaiting_vendor');
  const activeKitchenOrders = vendorOrders.filter(
    (o) => o.status === 'accepted' || o.status === 'preparing' || o.status === 'ready_for_pickup'
  );
  const completedOrders = vendorOrders.filter((o) => o.status === 'delivered');

  const vendorItems = menuItems.filter((i) => i.vendorId === vendor.id);
  const totalRevenue = completedOrders.reduce((sum, o) => sum + o.subtotal, 0);

  return (
    <div className="animate-fade-in" style={{ padding: '24px 0 80px' }}>
      {/* Vendor Top Bar */}
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
              background: 'rgba(217, 56, 30, 0.1)',
              color: '#D9381E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Store size={26} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <select
                value={vendor.id}
                onChange={(e) => setActiveVendorId(e.target.value)}
                style={{
                  fontSize: '18px',
                  fontWeight: 800,
                  color: '#241A17',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              >
                {vendors.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>
            <p style={{ fontSize: '12px', color: '#8C7B74' }}>
              Vendor Kitchen Terminal • {vendor.address}
            </p>
          </div>
        </div>

        {/* Action Toggles: Open/Close & Sound Alert */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Sound Alert Toggle */}
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              showToast(soundEnabled ? 'Loud order chime muted' : 'Loud order alerts enabled', 'info');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '99px',
              background: soundEnabled ? 'rgba(181, 154, 104, 0.15)' : '#E9E3D8',
              color: soundEnabled ? '#B59A68' : '#574640',
              fontSize: '12px',
              fontWeight: 700,
              border: soundEnabled ? '1px solid rgba(181, 154, 104, 0.4)' : '1px solid #DDD6CA',
              cursor: 'pointer',
            }}
          >
            <Bell size={14} className={soundEnabled ? 'pulse-indicator' : ''} />
            <span>Sound Alert: {soundEnabled ? 'ON 🔔' : 'Muted'}</span>
          </button>

          {/* Store Open / Closed Toggle */}
          <button
            onClick={() => {
              toggleVendorStatus(vendor.id);
              showToast(`${vendor.name} is now ${vendor.isOpen ? 'CLOSED' : 'OPEN for orders'}!`, 'info');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '99px',
              background: vendor.isOpen ? 'rgba(122, 132, 105, 0.15)' : '#FEE2E2',
              color: vendor.isOpen ? '#7A8469' : '#DC2626',
              border: vendor.isOpen ? '1.5px solid rgba(122, 132, 105, 0.35)' : '1.5px solid #FECACA',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: vendor.isOpen ? '#7A8469' : '#DC2626',
              }}
            />
            <span>Store Status: {vendor.isOpen ? 'OPEN' : 'CLOSED'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {[
          { id: 'orders', label: `Live Orders (${pendingOrders.length + activeKitchenOrders.length})` },
          { id: 'menu', label: `Menu Availability (${vendorItems.length} dishes)` },
          { id: 'earnings', label: 'Payouts & Earnings' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              padding: '10px 20px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: activeTab === tab.id ? 800 : 600,
              background: activeTab === tab.id ? '#D9381E' : '#FFFFFF',
              color: activeTab === tab.id ? '#FFFFFF' : '#574640',
              border: activeTab === tab.id ? '1px solid #D9381E' : '1px solid #DDD6CA',
              boxShadow: activeTab === tab.id ? '0 4px 12px rgba(217, 56, 30, 0.25)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Live Orders Board */}
      {activeTab === 'orders' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* New Orders Awaiting Kitchen Acceptance (Loud Visual & Timer) */}
          {pendingOrders.length > 0 && (
            <div
              style={{
                background: 'rgba(217, 56, 30, 0.05)',
                borderRadius: '20px',
                padding: '20px',
                border: '2px solid #D9381E',
                boxShadow: '0 8px 24px rgba(217, 56, 30, 0.12)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <span
                  style={{
                    background: '#EF4444',
                    color: '#fff',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '0.5px',
                  }}
                  className="pulse-indicator"
                >
                  NEW ORDER ALERT
                </span>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#991B1B' }}>
                  Orders Awaiting Kitchen Acceptance ({pendingOrders.length})
                </h4>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '14px' }}>
                {pendingOrders.map((ord) => (
                  <div
                    key={ord.id}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: '16px',
                      padding: '16px',
                      border: '1.5px solid rgba(217, 56, 30, 0.3)',
                      boxShadow: '0 4px 12px rgba(36,26,23,0.05)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <strong style={{ fontSize: '15px', color: '#241A17' }}>#{ord.orderNumber}</strong>
                      <span
                        style={{
                          fontSize: '11px',
                          color: '#D9381E',
                          background: 'rgba(217, 56, 30, 0.1)',
                          padding: '2px 8px',
                          borderRadius: '99px',
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <Clock size={12} /> Auto-cancels in 2:45
                      </span>
                    </div>

                    <p style={{ fontSize: '13px', fontWeight: 600, color: '#574640' }}>
                      Student: {ord.studentName} ({ord.deliveryAddress?.hostelOrBuilding || 'Campus'})
                    </p>

                    <div style={{ margin: '10px 0', padding: '10px 0', borderTop: '1px solid #E9E3D8', borderBottom: '1px solid #E9E3D8' }}>
                      {ord.items.map((item) => (
                        <div key={item.id} style={{ fontSize: '13px', color: '#241A17', fontWeight: 700 }}>
                          {item.quantity}x {item.menuItem.name}
                          {item.selectedOptions.length > 0 && (
                            <span style={{ fontSize: '11px', color: '#8C7B74', fontWeight: 500, display: 'block' }}>
                              + {item.selectedOptions.map((o) => o.optionName).join(', ')}
                            </span>
                          )}
                          {item.specialInstructions && (
                            <span style={{ fontSize: '11px', color: '#B59A68', display: 'block', fontStyle: 'italic' }}>
                              "{item.specialInstructions}"
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontSize: '12px', color: '#8C7B74' }}>Order Value</span>
                      <strong style={{ fontSize: '16px', color: '#D9381E' }}>₦{ord.subtotal.toLocaleString()}</strong>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => vendorAcceptOrder(ord.id)}
                        className="btn-primary"
                        style={{
                          flex: 1,
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
                        Accept Order
                      </button>
                      <button
                        onClick={() => showToast('Order rejected (Item unavailable)', 'info')}
                        className="btn-secondary"
                        style={{
                          padding: '10px',
                          color: '#D9381E',
                          borderColor: 'rgba(217, 56, 30, 0.3)',
                          borderRadius: '10px',
                          background: '#FFFFFF',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active Kitchen Orders */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#241A17', marginBottom: '14px' }}>
              Kitchen Orders in Progress ({activeKitchenOrders.length})
            </h4>

            {activeKitchenOrders.length === 0 ? (
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
                <ChefHat size={32} style={{ margin: '0 auto 8px', color: '#B59A68' }} />
                <p style={{ fontSize: '14px', fontWeight: 600 }}>Kitchen queue is clear!</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
                {activeKitchenOrders.map((ord) => (
                  <div
                    key={ord.id}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: '16px',
                      padding: '16px',
                      border: '1px solid #DDD6CA',
                      boxShadow: '0 2px 8px rgba(36,26,23,0.04)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <strong style={{ fontSize: '15px', color: '#241A17' }}>#{ord.orderNumber}</strong>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '99px',
                          background: ord.status === 'ready_for_pickup' ? 'rgba(122, 132, 105, 0.15)' : 'rgba(217, 56, 30, 0.1)',
                          color: ord.status === 'ready_for_pickup' ? '#7A8469' : '#D9381E',
                        }}
                      >
                        {ord.status === 'accepted'
                          ? 'Accepted (Queued)'
                          : ord.status === 'preparing'
                          ? 'Cooking 🔥'
                          : 'Ready for Rider 🚴'}
                      </span>
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      {ord.items.map((i) => (
                        <p key={i.id} style={{ fontSize: '13px', fontWeight: 700, color: '#241A17' }}>
                          {i.quantity}x {i.menuItem.name}
                        </p>
                      ))}
                      <p style={{ fontSize: '12px', color: '#8C7B74', marginTop: '4px' }}>
                        Drop-off: {ord.deliveryAddress?.hostelOrBuilding || 'Campus hostel'}
                      </p>
                    </div>

                    {ord.status === 'accepted' && (
                      <button
                        onClick={() => vendorStartPreparing(ord.id)}
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
                        <ChefHat size={14} /> Start Cooking (Mark Preparing)
                      </button>
                    )}

                    {ord.status === 'preparing' && (
                      <button
                        onClick={() => vendorMarkReady(ord.id)}
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '10px',
                          background: '#7A8469',
                          color: '#fff',
                          fontWeight: 700,
                          fontSize: '13px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        <CheckCircle2 size={15} /> Mark Food Ready (Alert Rider)
                      </button>
                    )}

                    {ord.status === 'ready_for_pickup' && (
                      <div
                        style={{
                          background: 'rgba(122, 132, 105, 0.1)',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          color: '#7A8469',
                          fontWeight: 600,
                          textAlign: 'center',
                        }}
                      >
                        Waiting for rider {ord.riderName || 'Emeka'} to collect
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Menu Availability Manager */}
      {activeTab === 'menu' && (
        <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '24px', border: '1px solid #DDD6CA' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#241A17' }}>Menu Items & Stock Control</h4>
              <p style={{ fontSize: '12px', color: '#8C7B74' }}>
                Toggle items out of stock if ingredients finish in the kitchen.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {vendorItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: '14px',
                  border: '1px solid #DDD6CA',
                  background: item.isAvailable ? '#FFFFFF' : '#E9E3D8',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '10px',
                      objectFit: 'cover',
                      filter: item.isAvailable ? 'none' : 'grayscale(100%)',
                    }}
                  />
                  <div>
                    <strong style={{ fontSize: '14px', color: item.isAvailable ? '#241A17' : '#8C7B74' }}>
                      {item.name}
                    </strong>
                    <p style={{ fontSize: '12px', color: '#8C7B74' }}>
                      ₦{item.price.toLocaleString()} • {item.category}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    toggleItemAvailability(item.id);
                    showToast(`${item.name} marked ${item.isAvailable ? 'Out of Stock' : 'In Stock'}`, 'info');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    borderRadius: '99px',
                    background: item.isAvailable ? 'rgba(122, 132, 105, 0.15)' : '#FEE2E2',
                    color: item.isAvailable ? '#7A8469' : '#DC2626',
                    fontSize: '12px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <span>{item.isAvailable ? 'In Stock (Available)' : 'Out of Stock (Paused)'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Earnings & Payouts */}
      {activeTab === 'earnings' && (
        <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '24px', border: '1px solid #DDD6CA' }}>
          <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#241A17', marginBottom: '16px' }}>
            Vendor Earnings & Daily Settlement
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div style={{ padding: '16px', borderRadius: '16px', background: '#F8F5EF', border: '1px solid #DDD6CA' }}>
              <span style={{ fontSize: '12px', color: '#8C7B74', fontWeight: 600 }}>Total Sales (Delivered)</span>
              <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#241A17', marginTop: '4px' }}>
                ₦{totalRevenue.toLocaleString()}
              </h3>
            </div>
            <div style={{ padding: '16px', borderRadius: '16px', background: 'rgba(122, 132, 105, 0.12)', border: '1px solid rgba(122, 132, 105, 0.3)' }}>
              <span style={{ fontSize: '12px', color: '#7A8469', fontWeight: 600 }}>Next Bank Payout (T+1)</span>
              <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#7A8469', marginTop: '4px' }}>
                ₦{(totalRevenue * 0.9).toLocaleString()}
              </h3>
              <span style={{ fontSize: '10px', color: '#574640' }}>After 10% platform commission</span>
            </div>
          </div>

          <p style={{ fontSize: '13px', color: '#574640' }}>
            Settlement Bank Account: <strong>Access Bank • 0129482910 • {vendor.name}</strong>
          </p>
        </div>
      )}
    </div>
  );
};
