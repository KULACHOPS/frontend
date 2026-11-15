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
            padding: '8px 18px',
            background: '#FFFFFF',
            border: '1px solid #E5EAE7',
            borderRadius: '999px',
            fontSize: '13px',
            fontWeight: 800,
            color: '#090C0B',
            boxShadow: '0 2px 4px rgba(9,12,11,0.03)',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#FF5500';
            e.currentTarget.style.color = '#FF5500';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#E5EAE7';
            e.currentTarget.style.color = '#090C0B';
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
          boxShadow: '0 10px 25px rgba(9, 12, 11, 0.12)',
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
            background: 'linear-gradient(to top, rgba(9, 12, 11, 0.88) 0%, rgba(9, 12, 11, 0.35) 60%, transparent 100%)',
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
                background: '#FF5500',
                color: '#FFFFFF',
                padding: '3px 10px',
                borderRadius: '99px',
                fontSize: '11px',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <CheckCircle2 size={12} color="#FFC501" /> Campus Vetted
            </span>
            {selectedVendorForMenu.isCampusSpecial && (
              <span
                style={{
                  background: '#FFC501',
                  color: '#090C0B',
                  padding: '3px 10px',
                  borderRadius: '99px',
                  fontSize: '11px',
                  fontWeight: 900,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Flame size={12} fill="#090C0B" /> Top Pick
              </span>
            )}
          </div>

          <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.5px' }}>
            {selectedVendorForMenu.name}
          </h2>
          <p style={{ fontSize: '13px', color: '#D1EBE3', marginTop: '2px', maxWidth: '600px' }}>
            {selectedVendorForMenu.tagline}
          </p>
        </div>
      </div>

      {/* Restaurant Overview Info Bar */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '16px 20px',
          border: '1px solid #E5EAE7',
          boxShadow: '0 2px 8px rgba(9,12,11,0.03)',
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
            <Star size={16} fill="#FFC501" color="#FFC501" />
            <strong style={{ fontSize: '14px', color: '#090C0B' }}>{selectedVendorForMenu.rating}</strong>
            <span style={{ fontSize: '12px', color: '#525C57' }}>({selectedVendorForMenu.reviewCount} student reviews)</span>
          </div>

          <div style={{ width: '1px', height: '16px', background: '#E5EAE7' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#090C0B' }}>
            <Clock size={15} color="#FF5500" />
            <span>Prep: <strong>{selectedVendorForMenu.prepTimeEstimate}</strong></span>
          </div>

          <div style={{ width: '1px', height: '16px', background: '#E5EAE7' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#090C0B' }}>
            <Bike size={15} color="#FF5500" />
            <span>Delivery: <strong>₦{selectedVendorForMenu.deliveryFee}</strong></span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#525C57' }}>
          <MapPin size={14} color="#FF5500" />
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
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        className="no-scrollbar"
      >
        {categories.map((cat) => {
          const isSelected = activeMenuCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveMenuCategory(cat)}
              style={{
                padding: '8px 18px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: isSelected ? 800 : 600,
                color: isSelected ? '#FFFFFF' : '#090C0B',
                background: isSelected ? '#FF5500' : '#FFFFFF',
                border: isSelected ? '1.5px solid #FF5500' : '1px solid #E5EAE7',
                whiteSpace: 'nowrap',
                boxShadow: isSelected ? '0 4px 12px rgba(255, 85, 0, 0.35)' : '0 1px 3px rgba(9,12,11,0.02)',
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
              borderRadius: '20px',
              padding: '16px',
              border: '1px solid #E5EAE7',
              boxShadow: '0 2px 8px rgba(9,12,11,0.03)',
              display: 'flex',
              justifyContent: 'space-between',
              gap: '12px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              position: 'relative',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#FF5500';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(255,85,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#E5EAE7';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(9,12,11,0.03)';
            }}
          >
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#090C0B' }}>{item.name}</h4>
                {item.isPopular && (
                  <span
                    style={{
                      background: '#FFF9E6',
                      color: '#090C0B',
                      fontSize: '10px',
                      fontWeight: 900,
                      padding: '2px 7px',
                      borderRadius: '99px',
                      border: '1px solid #FFE58F',
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
                  color: '#525C57',
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
                <span style={{ fontSize: '16px', fontWeight: 900, color: '#090C0B' }}>
                  ₦{item.price.toLocaleString()}
                </span>
                {item.optionGroups && item.optionGroups.length > 0 && (
                  <span style={{ fontSize: '11px', color: '#8E9993' }}>• Customizable</span>
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
                  borderRadius: '14px',
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
                  background: '#FF5500',
                  color: '#FFFFFF',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 10px rgba(255, 85, 0, 0.35)',
                  border: '2px solid #FFFFFF',
                  transition: 'transform 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
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
