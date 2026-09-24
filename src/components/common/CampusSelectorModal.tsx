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
            padding: '20px 24px',
            borderBottom: '1px solid #DDD6CA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#241A17' }}>Select Your Campus</h3>
            <p style={{ fontSize: '13px', color: '#574640', marginTop: '2px' }}>
              Choose your university to browse open canteens and hostel delivery zones.
            </p>
          </div>
          <button
            onClick={() => setIsCampusModalOpen(false)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#F8F5EF',
              color: '#8C7B74',
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
                  showToast(`Campus switched to ${campus.name}`, 'info');
                }}
                style={{
                  border: isSelected ? '2px solid #D9381E' : '1px solid #DDD6CA',
                  borderRadius: '16px',
                  padding: '16px',
                  cursor: 'pointer',
                  background: isSelected ? '#FDF1EE' : '#FFFFFF',
                  transition: 'all 0.15s ease',
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: isSelected ? '#D9381E' : '#E9E3D8',
                        color: isSelected ? '#FFFFFF' : '#241A17',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Building size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#241A17' }}>{campus.name}</h4>
                      <p style={{ fontSize: '12px', color: '#574640', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={12} color="#D9381E" />
                        {campus.city}, {campus.state}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            color: '#7A8469',
                            background: 'rgba(122, 132, 105, 0.12)',
                            padding: '2px 8px',
                            borderRadius: '99px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <Clock size={11} /> {campus.operatingHours}
                        </span>
                        <span style={{ fontSize: '11px', color: '#8C7B74' }}>
                          {campus.deliveryZones.length} Delivery Zones
                        </span>
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: '#D9381E',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Check size={14} strokeWidth={3} />
                    </div>
                  )}
                </div>

                {/* Delivery Zones Pill Preview */}
                <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px dashed #DDD6CA', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {campus.deliveryZones.slice(0, 4).map((zone) => (
                    <span
                      key={zone.id}
                      style={{
                        fontSize: '10px',
                        background: '#F8F5EF',
                        border: '1px solid #DDD6CA',
                        color: '#574640',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontWeight: 500,
                      }}
                    >
                      {zone.name}
                    </span>
                  ))}
                  {campus.deliveryZones.length > 4 && (
                    <span style={{ fontSize: '10px', color: '#8C7B74', padding: '2px 4px', fontWeight: 600 }}>
                      +{campus.deliveryZones.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div style={{ padding: '12px 24px 20px', background: '#F8F5EF', borderRadius: '0 0 24px 24px' }}>
          <p style={{ fontSize: '12px', color: '#574640', textAlign: 'center' }}>
            Don't see your university?{' '}
            <span style={{ color: '#D9381E', fontWeight: 700, cursor: 'pointer' }}>Request Campus Expansion</span>
          </p>
        </div>
      </div>
    </div>
  );
};
