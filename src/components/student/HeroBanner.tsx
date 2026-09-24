import React from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Flame, Tag, Moon } from 'lucide-react';

interface HeroBannerProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const { selectedCampus, showToast } = useApp();

  return (
    <div style={{ marginTop: '16px', marginBottom: '24px' }}>
      {/* Dynamic Banner Card */}
      <div
        style={{
          background: 'linear-gradient(135deg, #241A17 0%, #362621 60%, #1A1311 100%)',
          borderRadius: '24px',
          padding: '24px 20px',
          color: '#F8F5EF',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 12px 30px rgba(36, 26, 23, 0.25)',
          border: '1px solid rgba(181, 154, 104, 0.2)',
        }}
      >
        {/* Background decorative glow */}
        <div
          style={{
            position: 'absolute',
            top: '-40px',
            right: '-40px',
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(217, 56, 30, 0.4) 0%, rgba(181, 154, 104, 0.15) 50%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '640px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
            <span
              style={{
                background: 'rgba(217, 56, 30, 0.25)',
                border: '1px solid rgba(217, 56, 30, 0.5)',
                color: '#FFA899',
                fontSize: '11px',
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: '99px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                letterSpacing: '0.3px',
              }}
            >
              <Flame size={13} color="#D9381E" /> {selectedCampus.shortName} CAMPUS SPECIAL
            </span>

            <span
              style={{
                background: 'rgba(181, 154, 104, 0.15)',
                border: '1px solid rgba(181, 154, 104, 0.3)',
                color: '#E9E3D8',
                fontSize: '11px',
                fontWeight: 600,
                padding: '3px 10px',
                borderRadius: '99px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Moon size={12} color="#B59A68" /> Open till 2:00 AM
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(24px, 4vw, 34px)',
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#F8F5EF',
              letterSpacing: '-0.5px',
              marginBottom: '8px',
            }}
          >
            Chop Life on Campus. <br />
            <span style={{ color: '#D9381E' }}>Direct to your hostel door.</span>
          </h1>

          <p style={{ fontSize: '14px', color: '#E9E3D8', marginBottom: '18px', lineHeight: 1.4, opacity: 0.9 }}>
            Order from top campus canteens, bukka spots, grills, and late-night noodle hubs with zero delivery stress.
          </p>

          {/* Promo code badge */}
          <div
            onClick={() => {
              navigator.clipboard?.writeText('CHOPLIFE50');
              showToast('Promo code CHOPLIFE50 copied to clipboard!', 'info');
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px dashed #B59A68',
              padding: '6px 14px',
              borderRadius: '12px',
              fontSize: '12px',
              cursor: 'pointer',
              color: '#F8F5EF',
            }}
          >
            <Tag size={14} color="#B59A68" />
            <span>Use code <strong style={{ color: '#FFA899' }}>CHOPLIFE50</strong> for Free Delivery</span>
            <span style={{ fontSize: '10px', color: '#B59A68', textDecoration: 'underline' }}>tap to copy</span>
          </div>
        </div>
      </div>

      {/* Floating Search Input with Quick Suggestion Tags */}
      <div
        style={{
          marginTop: '-18px',
          padding: '0 8px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '18px',
            padding: '6px 12px 6px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 10px 25px -4px rgba(36, 26, 23, 0.1)',
            border: '1.5px solid #DDD6CA',
          }}
        >
          <Search size={20} color="#8C7B74" />
          <input
            type="text"
            placeholder="Search food, vendors (e.g. Jollof, Shawarma, Amala, Indomie)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              width: '100%',
              fontSize: '14px',
              fontWeight: 500,
              color: '#241A17',
              fontFamily: 'inherit',
              background: 'transparent',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                fontSize: '12px',
                color: '#574640',
                background: '#E9E3D8',
                padding: '4px 8px',
                borderRadius: '6px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Popular Search tags */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            overflowX: 'auto',
            padding: '10px 4px 2px',
            scrollbarWidth: 'none',
          }}
        >
          <span style={{ fontSize: '11px', color: '#8C7B74', fontWeight: 600, whiteSpace: 'nowrap' }}>
            Popular:
          </span>
          {['Smoky Jollof', 'Double Shawarma', 'Amala & Abula', 'Night Indomie', 'Suya Platter'].map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              style={{
                background: '#FFFFFF',
                border: '1px solid #DDD6CA',
                borderRadius: '99px',
                padding: '3px 10px',
                fontSize: '11px',
                fontWeight: 600,
                color: '#574640',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
