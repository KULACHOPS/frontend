import React, { useState } from 'react';
import type { Vendor } from '../../types';
import { useApp } from '../../context/AppContext';
import { Star, Clock, Bike, Heart, Flame, ArrowRight } from 'lucide-react';

interface VendorCardProps {
  vendor: Vendor;
}

export const VendorCard: React.FC<VendorCardProps> = ({ vendor }) => {
  const { setSelectedVendorForMenu, showToast } = useApp();
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={() => setSelectedVendorForMenu(vendor)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: '#FFFFFF',
        borderRadius: '22px',
        overflow: 'hidden',
        border: '1px solid #E5EAE7',
        boxShadow: isHovered
          ? '0 16px 32px -4px rgba(255, 85, 0, 0.16), 0 4px 12px -2px rgba(9, 12, 11, 0.05)'
          : '0 2px 8px -2px rgba(9, 12, 11, 0.04)',
        cursor: 'pointer',
        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, border-color 0.25s ease',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        borderColor: isHovered ? '#FF5500' : '#E5EAE7',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Banner Image Container */}
      <div style={{ position: 'relative', height: '190px', width: '100%', overflow: 'hidden', background: '#F0F3F1' }}>
        <img
          src={vendor.bannerImage}
          alt={vendor.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: vendor.isOpen ? 'none' : 'grayscale(80%) brightness(85%)',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: isHovered && vendor.isOpen ? 'scale(1.06)' : 'scale(1)',
          }}
          loading="lazy"
        />

        {/* Gradient Shadow Vignette for Badges */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(9,12,11,0.3) 0%, transparent 40%, rgba(9,12,11,0.55) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
            showToast(isLiked ? `Removed ${vendor.name} from favorites` : `Saved ${vendor.name} to favorites! ❤️`, 'info');
          }}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isLiked ? '#E80B2E' : '#64748B',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transition: 'all 0.15s ease',
            zIndex: 3,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <Heart size={18} fill={isLiked ? '#E80B2E' : 'none'} strokeWidth={2.2} />
        </button>

        {/* Top Badges (Status & Campus Special) */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px', zIndex: 2 }}>
          {!vendor.isOpen ? (
            <span
              style={{
                background: 'rgba(9, 12, 11, 0.85)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                color: '#E2E8F0',
                padding: '4px 10px',
                borderRadius: '99px',
                fontSize: '11px',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#EF4444' }} />
              Closed
            </span>
          ) : (
            <span
              style={{
                background: '#FF5500',
                color: '#FFFFFF',
                padding: '4px 10px',
                borderRadius: '99px',
                fontSize: '11px',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: '0 2px 8px rgba(255, 85, 0, 0.35)',
              }}
            >
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FFC501' }} />
              Open Now
            </span>
          )}

          {vendor.isCampusSpecial && vendor.isOpen && (
            <span
              style={{
                background: '#FFC501',
                color: '#090C0B',
                padding: '4px 10px',
                borderRadius: '99px',
                fontSize: '11px',
                fontWeight: 900,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
                boxShadow: '0 2px 8px rgba(255, 197, 1, 0.4)',
                letterSpacing: '0.2px',
              }}
            >
              <Flame size={12} fill="#090C0B" /> Top Pick
            </span>
          )}
        </div>

        {/* Prep Time & Delivery Fee overlay at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '12px',
            display: 'flex',
            gap: '6px',
            zIndex: 2,
          }}
        >
          <span
            style={{
              background: 'rgba(9, 12, 11, 0.82)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              color: '#FFFFFF',
              padding: '4px 9px',
              borderRadius: '8px',
              fontSize: '11px',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Clock size={12} color="#FFC501" /> {vendor.prepTimeEstimate}
          </span>
          <span
            style={{
              background: 'rgba(9, 12, 11, 0.82)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              color: '#FFFFFF',
              padding: '4px 9px',
              borderRadius: '8px',
              fontSize: '11px',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Bike size={12} color="#A7F3D0" /> ₦{vendor.deliveryFee} fee
          </span>
        </div>
      </div>

      {/* Vendor Information */}
      <div style={{ padding: '18px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
          <div style={{ flex: 1 }}>
            <h4
              style={{
                fontSize: '17px',
                fontWeight: 900,
                color: '#090C0B',
                letterSpacing: '-0.3px',
                lineHeight: 1.25,
              }}
            >
              {vendor.name}
            </h4>
            <p
              style={{
                fontSize: '12px',
                color: '#525C57',
                marginTop: '4px',
                lineHeight: 1.35,
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {vendor.tagline}
            </p>
          </div>

          {/* Rating Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              background: '#FFF9E6',
              border: '1px solid #FFE58F',
              padding: '4px 8px',
              borderRadius: '10px',
              flexShrink: 0,
            }}
          >
            <Star size={13} fill="#E6B000" color="#E6B000" />
            <span style={{ fontSize: '13px', fontWeight: 900, color: '#090C0B' }}>{vendor.rating}</span>
            <span style={{ fontSize: '11px', color: '#8C6B00', fontWeight: 600 }}>({vendor.reviewCount})</span>
          </div>
        </div>

        {/* Cuisine Tags & Min Order */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            flexWrap: 'wrap',
            marginTop: '14px',
            paddingTop: '12px',
            borderTop: '1px solid #EEF2F0',
          }}
        >
          {vendor.cuisineTypes.slice(0, 2).map((cuisine) => (
            <span
              key={cuisine}
              style={{
                background: '#F0F3F1',
                border: '1px solid #E5EAE7',
                color: '#4A5550',
                fontSize: '11px',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: '8px',
              }}
            >
              {cuisine}
            </span>
          ))}

          <span
            style={{
              marginLeft: 'auto',
              fontSize: '12px',
              color: '#090C0B',
              fontWeight: 800,
            }}
          >
            Min ₦{vendor.minOrderAmount.toLocaleString()}
          </span>
        </div>

        {/* Bottom Quick Action Indicator */}
        <div
          style={{
            marginTop: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '8px',
            color: '#FF5500',
            fontSize: '12px',
            fontWeight: 800,
          }}
        >
          <span>View Menu & Order</span>
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: isHovered ? '#FF5500' : '#FFF0E8',
              color: isHovered ? '#FFFFFF' : '#FF5500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s ease',
              transform: isHovered ? 'translateX(2px)' : 'translateX(0)',
            }}
          >
            <ArrowRight size={13} />
          </div>
        </div>
      </div>
    </div>
  );
};
