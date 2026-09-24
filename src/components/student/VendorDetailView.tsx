import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Star, Clock, Bike, MapPin, Plus, Flame, CheckCircle2 } from 'lucide-react';

export const VendorDetailView: React.FC = () => {
  const { selectedVendorForMenu, setSelectedVendorForMenu, menuItems, setSelectedItemForModal } = useApp();

  const [activeMenuCategory, setActiveMenuCategory] = useState<string>('all');

  if (!selectedVendorForMenu) return null;

  const vendorItems = menuItems.filter((item) => item.vendorId === selectedVendorForMenu.id);
  const categories = ['all', ...Array.from(new Set(vendorItems.map((item) => item.category)))];

  const filteredItems = activeMenuCategory === 'all'
    ? vendorItems
    : vendorItems.filter((i) => i.category === activeMenuCategory);

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '60px' }}>
      {/* Top Back Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <button
          onClick={() => setSelectedVendorForMenu(null)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: '#FFFFFF',
            border: '1px solid #DDD6CA',
            borderRadius: '999px',
            fontSize: '13px',
            fontWeight: 700,
            color: '#241A17',
            boxShadow: '0 2px 4px rgba(36,26,23,0.04)',
            cursor: 'pointer',
          }}
        >
          <ArrowLeft size={16} /> Back to all canteens
        </button>
      </div>

      {/* Hero Banner Header */}
      <div
        style={{
          position: 'relative',
          height: '240px',
          borderRadius: '24px',
          overflow: 'hidden',
          marginBottom: '20px',
          boxShadow: '0 10px 25px rgba(36, 26, 23, 0.15)',
        }}
      >
        <img
          src={selectedVendorForMenu.bannerImage}
          alt={selectedVendorForMenu.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(36, 26, 23, 0.9) 0%, rgba(36, 26, 23, 0.3) 60%, transparent 100%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            right: '20px',
            color: '#FFFFFF',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
            <span
              style={{
                background: '#10B981',
                color: '#fff',
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <CheckCircle2 size={12} /> Campus Vetted
            </span>
            {selectedVendorForMenu.isCampusSpecial && (
              <span
                style={{
                  background: '#D9381E',
                  color: '#fff',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Flame size={12} /> Student Choice
              </span>
            )}
          </div>

          <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.5px' }}>
            {selectedVendorForMenu.name}
          </h2>
          <p style={{ fontSize: '13px', color: '#E9E3D8', marginTop: '2px', maxWidth: '600px' }}>
            {selectedVendorForMenu.tagline}
          </p>
        </div>
      </div>

      {/* Restaurant Overview Info Bar */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '18px',
          padding: '16px 20px',
          border: '1px solid #DDD6CA',
          boxShadow: '0 2px 8px rgba(36,26,23,0.04)',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Star size={16} fill="#B59A68" color="#B59A68" />
            <strong style={{ fontSize: '14px', color: '#241A17' }}>{selectedVendorForMenu.rating}</strong>
            <span style={{ fontSize: '12px', color: '#8C7B74' }}>({selectedVendorForMenu.reviewCount} student reviews)</span>
          </div>

          <div style={{ width: '1px', height: '16px', background: '#DDD6CA' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#574640' }}>
            <Clock size={15} color="#D9381E" />
            <span>Prep: <strong>{selectedVendorForMenu.prepTimeEstimate}</strong></span>
          </div>

          <div style={{ width: '1px', height: '16px', background: '#DDD6CA' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#574640' }}>
            <Bike size={15} color="#7A8469" />
            <span>Delivery: <strong>₦{selectedVendorForMenu.deliveryFee}</strong></span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#8C7B74' }}>
          <MapPin size={14} color="#D9381E" />
          <span>{selectedVendorForMenu.address}</span>
        </div>
      </div>

      {/* Menu Categories Bar */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '8px',
          marginBottom: '20px',
          borderBottom: '1px solid #DDD6CA',
        }}
      >
        {categories.map((cat) => {
          const isSelected = activeMenuCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveMenuCategory(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: isSelected ? 800 : 600,
                color: isSelected ? '#FFFFFF' : '#574640',
                background: isSelected ? '#241A17' : '#E9E3D8',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              {cat === 'all' ? 'All Items' : cat}
            </button>
          );
        })}
      </div>

      {/* Menu Items Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '16px',
        }}
      >
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItemForModal(item)}
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '16px',
              border: '1px solid #DDD6CA',
              boxShadow: '0 2px 8px rgba(36,26,23,0.03)',
              display: 'flex',
              justifyContent: 'space-between',
              gap: '12px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              position: 'relative',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#D9381E';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#DDD6CA';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#241A17' }}>{item.name}</h4>
                {item.isPopular && (
                  <span
                    style={{
                      background: '#FDF1EE',
                      color: '#D9381E',
                      fontSize: '10px',
                      fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: '4px',
                    }}
                  >
                    Popular
                  </span>
                )}
                {item.isSpicy && (
                  <span style={{ fontSize: '11px' }} title="Spicy">🌶️</span>
                )}
              </div>

              <p
                style={{
                  fontSize: '12px',
                  color: '#574640',
                  lineHeight: 1.35,
                  marginBottom: '12px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {item.description}
              </p>

              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '16px', fontWeight: 800, color: '#241A17' }}>
                  ₦{item.price.toLocaleString()}
                </span>
                {item.optionGroups && item.optionGroups.length > 0 && (
                  <span style={{ fontSize: '11px', color: '#8C7B74' }}>• Customizable</span>
                )}
              </div>
            </div>

            {/* Item Image with + Add button */}
            <div style={{ position: 'relative', width: '100px', height: '100px', flexShrink: 0 }}>
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '12px',
                }}
                loading="lazy"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedItemForModal(item);
                }}
                style={{
                  position: 'absolute',
                  bottom: '-6px',
                  right: '-6px',
                  background: '#D9381E',
                  color: '#FFFFFF',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 10px rgba(217, 56, 30, 0.4)',
                  border: '2px solid #FFFFFF',
                }}
              >
                <Plus size={16} strokeWidth={3} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
