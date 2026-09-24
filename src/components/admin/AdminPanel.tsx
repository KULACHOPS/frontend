import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldAlert,
  Store,
  Receipt,
  DollarSign,
  TrendingUp,
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { campuses, vendors, orders, showToast } = useApp();
  const [adminTab, setAdminTab] = useState<'overview' | 'orders' | 'campuses' | 'finance'>('overview');

  const totalGMV = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalCommission = Math.round(totalGMV * 0.12); // indicative 12%
  const activeOrders = orders.filter((o) => o.status !== 'delivered' && o.status !== 'cancelled');

  return (
    <div className="animate-fade-in" style={{ padding: '24px 0 80px' }}>
      {/* Top Banner */}
      <div
        style={{
          background: '#241A17',
          borderRadius: '20px',
          padding: '24px',
          color: '#F8F5EF',
          marginBottom: '24px',
          boxShadow: '0 8px 24px rgba(36, 26, 23, 0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          border: '1px solid rgba(181, 154, 104, 0.2)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#D9381E',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(217, 56, 30, 0.3)',
            }}
          >
            <ShieldAlert size={26} />
          </div>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#F8F5EF' }}>
              KULACHOPS Operations Control Center
            </h3>
            <p style={{ fontSize: '13px', color: '#E9E3D8', opacity: 0.85 }}>
              Multi-Campus Dispatch, Vendor Auditing & Financial Settlement Ledger
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <span style={{ background: 'rgba(181, 154, 104, 0.18)', border: '1px solid rgba(181, 154, 104, 0.35)', padding: '6px 14px', borderRadius: '99px', fontSize: '12px', color: '#E9E3D8', fontWeight: 700 }}>
            Super Admin Access
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '16px', border: '1px solid #DDD6CA', boxShadow: '0 2px 8px rgba(36,26,23,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#8C7B74', fontSize: '12px', fontWeight: 600 }}>
            <span>Gross Merchandise Value (GMV)</span>
            <DollarSign size={16} color="#7A8469" />
          </div>
          <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#241A17', marginTop: '6px' }}>
            ₦{totalGMV.toLocaleString()}
          </h3>
          <span style={{ fontSize: '11px', color: '#7A8469', fontWeight: 700 }}>
            +18.4% this week
          </span>
        </div>

        <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '16px', border: '1px solid #DDD6CA', boxShadow: '0 2px 8px rgba(36,26,23,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#8C7B74', fontSize: '12px', fontWeight: 600 }}>
            <span>Platform Commission (12%)</span>
            <TrendingUp size={16} color="#D9381E" />
          </div>
          <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#D9381E', marginTop: '6px' }}>
            ₦{totalCommission.toLocaleString()}
          </h3>
          <span style={{ fontSize: '11px', color: '#8C7B74' }}>Net platform margin</span>
        </div>

        <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '16px', border: '1px solid #DDD6CA', boxShadow: '0 2px 8px rgba(36,26,23,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#8C7B74', fontSize: '12px', fontWeight: 600 }}>
            <span>Active Campus Orders</span>
            <Receipt size={16} color="#B59A68" />
          </div>
          <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#241A17', marginTop: '6px' }}>
            {activeOrders.length} live
          </h3>
          <span style={{ fontSize: '11px', color: '#7A8469', fontWeight: 700 }}>
            Avg delivery: 22 mins
          </span>
        </div>

        <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '16px', border: '1px solid #DDD6CA', boxShadow: '0 2px 8px rgba(36,26,23,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#8C7B74', fontSize: '12px', fontWeight: 600 }}>
            <span>Active Campus Canteens</span>
            <Store size={16} color="#B59A68" />
          </div>
          <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#241A17', marginTop: '6px' }}>
            {vendors.length} vendors
          </h3>
          <span style={{ fontSize: '11px', color: '#8C7B74' }}>Across 3 pilot campuses</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {[
          { id: 'overview', label: 'Live Orders Monitor' },
          { id: 'campuses', label: 'Campuses & Delivery Zones' },
          { id: 'finance', label: 'Finance & Vendor Settlements' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setAdminTab(tab.id as any)}
            style={{
              padding: '10px 18px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: adminTab === tab.id ? 800 : 600,
              background: adminTab === tab.id ? '#241A17' : '#FFFFFF',
              color: adminTab === tab.id ? '#F8F5EF' : '#574640',
              border: adminTab === tab.id ? '1px solid #241A17' : '1px solid #DDD6CA',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Live Orders Monitor */}
      {adminTab === 'overview' && (
        <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '24px', border: '1px solid #DDD6CA' }}>
          <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#241A17', marginBottom: '16px' }}>
            Real-Time Campus Orders Dispatch Feed
          </h4>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E9E3D8', color: '#8C7B74' }}>
                  <th style={{ padding: '12px 10px' }}>Order #</th>
                  <th style={{ padding: '12px 10px' }}>Student</th>
                  <th style={{ padding: '12px 10px' }}>Vendor</th>
                  <th style={{ padding: '12px 10px' }}>Drop Zone</th>
                  <th style={{ padding: '12px 10px' }}>Total (₦)</th>
                  <th style={{ padding: '12px 10px' }}>Status</th>
                  <th style={{ padding: '12px 10px' }}>Rider</th>
                  <th style={{ padding: '12px 10px' }}>Code</th>
                  <th style={{ padding: '12px 10px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((ord) => (
                  <tr key={ord.id} style={{ borderBottom: '1px solid #E9E3D8' }}>
                    <td style={{ padding: '14px 10px', fontWeight: 800, color: '#241A17' }}>
                      #{ord.orderNumber}
                    </td>
                    <td style={{ padding: '14px 10px' }}>
                      <div style={{ fontWeight: 600, color: '#241A17' }}>{ord.studentName}</div>
                      <span style={{ fontSize: '11px', color: '#8C7B74' }}>{ord.studentPhone}</span>
                    </td>
                    <td style={{ padding: '14px 10px', fontWeight: 600, color: '#241A17' }}>{ord.vendorName}</td>
                    <td style={{ padding: '14px 10px', color: '#574640' }}>
                      {ord.deliveryAddress?.hostelOrBuilding || 'Campus'}
                    </td>
                    <td style={{ padding: '14px 10px', fontWeight: 700, color: '#241A17' }}>
                      ₦{ord.totalAmount.toLocaleString()}
                    </td>
                    <td style={{ padding: '14px 10px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '99px',
                          background: ord.status === 'delivered' ? 'rgba(122, 132, 105, 0.15)' : 'rgba(217, 56, 30, 0.1)',
                          color: ord.status === 'delivered' ? '#7A8469' : '#D9381E',
                        }}
                      >
                        {ord.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 10px', color: '#574640' }}>
                      {ord.riderName || 'Unassigned'}
                    </td>
                    <td style={{ padding: '14px 10px', fontFamily: 'monospace', fontWeight: 800, color: '#D9381E' }}>
                      {ord.deliveryCode}
                    </td>
                    <td style={{ padding: '14px 10px' }}>
                      <button
                        onClick={() => showToast(`Dispatched manual ping to ${ord.riderName || 'fleet'}`, 'info')}
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '5px 12px',
                          background: '#E9E3D8',
                          borderRadius: '6px',
                          color: '#241A17',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        Ping Rider
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Campuses & Delivery Zones */}
      {adminTab === 'campuses' && (
        <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '24px', border: '1px solid #DDD6CA' }}>
          <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#241A17', marginBottom: '16px' }}>
            Configured Universities & Delivery Zones
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {campuses.map((c) => (
              <div key={c.id} style={{ border: '1px solid #DDD6CA', borderRadius: '16px', padding: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div>
                    <h5 style={{ fontSize: '16px', fontWeight: 800, color: '#241A17' }}>{c.name}</h5>
                    <p style={{ fontSize: '12px', color: '#8C7B74' }}>
                      {c.city}, {c.state} • Operating: {c.operatingHours}
                    </p>
                  </div>
                  <span style={{ fontSize: '12px', background: 'rgba(122, 132, 105, 0.15)', color: '#7A8469', fontWeight: 700, padding: '3px 10px', borderRadius: '99px' }}>
                    Active Market
                  </span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {c.deliveryZones.map((z) => (
                    <span
                      key={z.id}
                      style={{
                        background: '#F8F5EF',
                        border: '1px solid #DDD6CA',
                        padding: '4px 10px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#574640',
                      }}
                    >
                      {z.name} (₦{z.baseDeliveryFee})
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Finance */}
      {adminTab === 'finance' && (
        <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '24px', border: '1px solid #DDD6CA' }}>
          <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#241A17', marginBottom: '16px' }}>
            Vendor & Rider Payout Settlement Schedule
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {vendors.map((v) => (
              <div
                key={v.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  background: '#F8F5EF',
                  border: '1px solid #DDD6CA',
                }}
              >
                <div>
                  <strong style={{ fontSize: '14px', color: '#241A17' }}>{v.name}</strong>
                  <p style={{ fontSize: '12px', color: '#8C7B74' }}>Settlement Cycle: Weekly T+1 • Commission: 10%</p>
                </div>
                <button
                  onClick={() => showToast(`Settlement payout batch created for ${v.name}`, 'success')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    background: '#241A17',
                    color: '#F8F5EF',
                    fontSize: '12px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Generate Payout
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
