import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Star, Utensils, Bike } from 'lucide-react';

export const RatingModal: React.FC = () => {
  const { isRatingModalOpen, setIsRatingModalOpen, ratingOrder, submitOrderRating } = useApp();
  const [vendorRating, setVendorRating] = useState<number>(5);
  const [riderRating, setRiderRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');

  if (!isRatingModalOpen || !ratingOrder) return null;

  const handleSubmit = () => {
    submitOrderRating(ratingOrder.id, vendorRating, riderRating, comment);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsRatingModalOpen(false)}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '480px', padding: 0, background: '#F8F5EF' }}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid #DDD6CA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#FFFFFF',
          }}
        >
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#241A17' }}>Rate Your Order</h3>
            <p style={{ fontSize: '12px', color: '#8C7B74' }}>Order #{ratingOrder.orderNumber}</p>
          </div>
          <button
            onClick={() => setIsRatingModalOpen(false)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#E9E3D8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#574640',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Rating Body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Vendor Food Quality Rating */}
          <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '16px', border: '1px solid #DDD6CA', boxShadow: '0 2px 8px rgba(36,26,23,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Utensils size={18} color="#D9381E" />
              <strong style={{ fontSize: '14px', color: '#241A17' }}>Food Quality: {ratingOrder.vendorName}</strong>
            </div>
            <p style={{ fontSize: '12px', color: '#574640', marginBottom: '10px' }}>
              How was the taste, packaging, and portion size?
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setVendorRating(star)}
                  style={{
                    padding: '4px',
                    color: star <= vendorRating ? '#B59A68' : '#DDD6CA',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'transform 0.1s ease',
                  }}
                >
                  <Star size={28} fill={star <= vendorRating ? '#B59A68' : 'none'} />
                </button>
              ))}
            </div>
          </div>

          {/* Rider Delivery Speed & Courtesy Rating */}
          <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '16px', border: '1px solid #DDD6CA', boxShadow: '0 2px 8px rgba(36,26,23,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Bike size={18} color="#7A8469" />
              <strong style={{ fontSize: '14px', color: '#241A17' }}>
                Delivery Rider: {ratingOrder.riderName || 'Campus Courier'}
              </strong>
            </div>
            <p style={{ fontSize: '12px', color: '#574640', marginBottom: '10px' }}>
              Did the rider arrive quickly, call politely, and handle your meal well?
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRiderRating(star)}
                  style={{
                    padding: '4px',
                    color: star <= riderRating ? '#B59A68' : '#DDD6CA',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'transform 0.1s ease',
                  }}
                >
                  <Star size={28} fill={star <= riderRating ? '#B59A68' : 'none'} />
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: '#241A17', display: 'block', marginBottom: '6px' }}>
              Feedback or Compliments (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Jollof was hot and smoky, rider arrived at New Hall in record time!"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '12px',
                border: '1px solid #DDD6CA',
                background: '#FFFFFF',
                color: '#241A17',
                fontSize: '13px',
                fontFamily: 'inherit',
                outline: 'none',
              }}
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '14px',
              fontSize: '15px',
              background: '#D9381E',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(217, 56, 30, 0.3)',
            }}
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};
