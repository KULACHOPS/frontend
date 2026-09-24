import React from 'react';
import { useApp } from '../../context/AppContext';
import type { Role } from '../../types';
import { GraduationCap, Store, Bike, ShieldAlert } from 'lucide-react';

export const RoleSwitcherBanner: React.FC = () => {
  const { currentRole, setCurrentRole, orders } = useApp();

  const activeOrdersCount = orders.filter((o) => o.status !== 'delivered' && o.status !== 'cancelled').length;

  const roles: { id: Role; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'student', label: 'Student App', icon: <GraduationCap size={16} /> },
    { id: 'vendor', label: 'Vendor Dashboard', icon: <Store size={16} />, badge: activeOrdersCount > 0 ? `${activeOrdersCount} live` : undefined },
    { id: 'rider', label: 'Rider View', icon: <Bike size={16} /> },
    { id: 'admin', label: 'Admin Ops', icon: <ShieldAlert size={16} /> },
  ];

  return (
    <div
      style={{
        background: '#241A17',
        color: '#E9E3D8',
        padding: '8px 16px',
        fontSize: '13px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px',
        borderBottom: '1px solid rgba(181, 154, 104, 0.2)',
        zIndex: 50,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span
          style={{
            background: '#D9381E',
            color: '#fff',
            fontWeight: 800,
            fontSize: '10px',
            padding: '2px 6px',
            borderRadius: '4px',
            letterSpacing: '0.5px',
          }}
        >
          DEMO MODE
        </span>
        <span style={{ color: '#F8F5EF', fontWeight: 600 }}>Switch Role:</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
        {roles.map((r) => {
          const isActive = currentRole === r.id;
          return (
            <button
              key={r.id}
              onClick={() => setCurrentRole(r.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#FFFFFF' : '#E9E3D8',
                background: isActive ? '#D9381E' : 'rgba(255, 255, 255, 0.08)',
                boxShadow: isActive ? '0 2px 8px rgba(217, 56, 30, 0.4)' : 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {r.icon}
              <span>{r.label}</span>
              {r.badge && (
                <span
                  style={{
                    background: isActive ? '#FFFFFF' : '#D9381E',
                    color: isActive ? '#D9381E' : '#FFFFFF',
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '1px 5px',
                    borderRadius: '99px',
                  }}
                >
                  {r.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
