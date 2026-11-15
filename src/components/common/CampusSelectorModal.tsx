import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Check, MapPin, Building, Clock } from 'lucide-react';

export const CampusSelectorModal: React.FC = () => {
  const { campuses, selectedCampus, setSelectedCampus, isCampusModalOpen, setIsCampusModalOpen, showToast } = useApp();

  if (!isCampusModalOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsCampusModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        {/* Header */}
        <div
          style={{
            padding: '22px 24px',
            borderBottom: '1px solid #E5EAE7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h3 style={{ fontSize: '19px', fontWeight: 900, color: '#090C0B', letterSpacing: '-0.3px' }}>
              Select Your Campus
            </h3>
            <p style={{ fontSize: '13px', color: '#525C57', marginTop: '2px' }}>
              Choose your university to browse open campus canteens and hostel delivery zones.
            </p>
          </div>
          <button
            onClick={() => setIsCampusModalOpen(false)}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#F0F3F1',
              color: '#525C57',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#E5EAE7';
              e.currentTarget.style.color = '#090C0B';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#F0F3F1';
              e.currentTarget.style.color = '#525C57';
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Campuses List */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {campuses.map((campus) => {
            const isSelected = selectedCampus.id === campus.id;
            return (
              <div
                key={campus.id}
                onClick={() => {
                  setSelectedCampus(campus);
                  setIsCampusModalOpen(false);
                  showToast(`Campus switched to ${campus.name} 🎓`, 'info');
                }}
                style={{
                  border: isSelected ? '2px solid #FF5500' : '1px solid #E5EAE7',
                  borderRadius: '18px',
                  padding: '18px',
                  cursor: 'pointer',
                  background: isSelected ? '#FFF0E8' : '#FFFFFF',
                  boxShadow: isSelected ? '0 4px 14px rgba(255, 85, 0, 0.25)' : '0 1px 3px rgba(9,12,11,0.03)',
                  transition: 'all 0.15s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = '#FF5500';
                    e.currentTarget.style.background = '#FFFDFB';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = '#E5EAE7';
                    e.currentTarget.style.background = '#FFFFFF';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '14px' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '14px',
                        background: isSelected ? '#FF5500' : '#F0F3F1',
                        color: isSelected ? '#FFC501' : '#090C0B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: isSelected ? '0 4px 10px rgba(255, 85, 0, 0.35)' : 'none',
                      }}
                    >
                      <Building size={22} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#090C0B' }}>{campus.name}</h4>
                      <p style={{ fontSize: '12px', color: '#525C57', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={12} color="#FF5500" />
                        {campus.city}, {campus.state}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            color: '#FF5500',
                            background: '#FFF0E8',
                            padding: '3px 8px',
                            borderRadius: '99px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <Clock size={11} /> {campus.operatingHours}
                        </span>
                        <span style={{ fontSize: '11px', color: '#8E9993', fontWeight: 600 }}>
                          {campus.deliveryZones.length} Delivery Zones
                        </span>
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        background: '#FF5500',
                        color: '#FFC501',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 6px rgba(255, 85, 0, 0.4)',
                      }}
                    >
                      <Check size={14} strokeWidth={3} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
