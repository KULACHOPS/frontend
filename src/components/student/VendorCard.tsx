import React, { useState } from 'react';
import type { Vendor } from '../../types';
import { useApp } from '../../context/AppContext';
import { Star, Clock, Bike, Heart, Flame } from 'lucide-react';

interface VendorCardProps {
  vendor: Vendor;
}

export const VendorCard: React.FC<VendorCardProps> = ({ vendor }) => {
  const { setSelectedVendorForMenu, showToast } = useApp();
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div
      onClick={() => setSelectedVendorForMenu(vendor)}
      style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid #DDD6CA',
        boxShadow: '0 4px 15px -2px rgba(36, 26, 23, 0.05)',
        cursor: 'pointer',
        transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 28px -4px rgba(36, 26, 23, 0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 15px -2px rgba(36, 26, 23, 0.05)';
      }}
    >
      {/* Banner Image Container */}
      <div style={{ position: 'relative', height: '170px', width: '100%', overflow: 'hidden' }}>
        <img
          src={vendor.bannerImage}
          alt={vendor.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: vendor.isOpen ? 'none' : 'grayscale(80%) brightness(85%)',
          }}
          loading="lazy"
        />

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
            showToast(isLiked ? `Removed ${vendor.name} from favorites` : `Saved ${vendor.name} to favorites!`, 'info');
          }}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isLiked ? '#D9381E' : '#8C7B74',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          <Heart size={18} fill={isLiked ? '#D9381E' : 'none'} />
        </button>

        {/* Status Badge */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
          {!vendor.isOpen ? (
            <span
              style={{
                background: 'rgba(36, 26, 23, 0.85)',
                backdropFilter: 'blur(4px)',
                color: '#E9E3D8',
                padding: '4px 10px',
                borderRadius: '99px',
                fontSize: '11px',
                fontWeight: 700,
              }}
            >
              Closed for orders
            </span>
          ) : vendor.isCampusSpecial ? (
            <span
              style={{
                background: '#D9381E',
                color: '#FFFFFF',
                padding: '4px 10px',
                borderRadius: '99px',
                fontSize: '11px',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
                boxShadow: '0 2px 8px rgba(217, 56, 30, 0.4)',
              }}
            >
              <Flame size={12} /> Campus Fav
            </span>
          ) : null}
        </div>

        {/* Delivery Time & Fee Badge overlay at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '12px',
            display: 'flex',
            gap: '6px',
          }}
        >
          <span
            style={{
              background: 'rgba(36, 26, 23, 0.85)',
              backdropFilter: 'blur(4px)',
              color: '#FFFFFF',
              padding: '3px 8px',
              borderRadius: '8px',
              fontSize: '11px',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Clock size={11} color="#B59A68" /> {vendor.prepTimeEstimate}
          </span>
          <span
            style={{
              background: 'rgba(36, 26, 23, 0.85)',
              backdropFilter: 'blur(4px)',
              color: '#FFFFFF',
              padding: '3px 8px',
              borderRadius: '8px',
              fontSize: '11px',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Bike size={11} color="#7A8469" /> ₦{vendor.deliveryFee}
          </span>
        </div>
      </div>

      {/* Vendor Information */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#241A17', letterSpacing: '-0.3px' }}>
              {vendor.name}
            </h4>
            <p
              style={{
                fontSize: '12px',
                color: '#574640',
                marginTop: '3px',
                lineHeight: 1.3,
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {vendor.tagline}
            </p>
          </div>

          {/* Rating */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px',
              background: 'rgba(181, 154, 104, 0.12)',
              border: '1px solid rgba(181, 154, 104, 0.3)',
              padding: '3px 8px',
              borderRadius: '8px',
              flexShrink: 0,
            }}
          >
            <Star size={13} fill="#B59A68" color="#B59A68" />
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#B59A68' }}>{vendor.rating}</span>
            <span style={{ fontSize: '10px', color: '#8C7B74' }}>({vendor.reviewCount})</span>
          </div>
        </div>

        {/* Cuisine Tags */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            flexWrap: 'wrap',
            marginTop: '12px',
            paddingTop: '10px',
            borderTop: '1px solid #E9E3D8',
          }}
        >
          {vendor.cuisineTypes.map((cuisine) => (
            <span
              key={cuisine}
              style={{
                background: '#F8F5EF',
                border: '1px solid #DDD6CA',
                color: '#574640',
                fontSize: '11px',
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: '6px',
              }}
            >
              {cuisine}
            </span>
          ))}

          <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#8C7B74', fontWeight: 600 }}>
            Min ₦{vendor.minOrderAmount.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};
