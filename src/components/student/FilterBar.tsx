import React from 'react';
import { SlidersHorizontal, Check, RotateCcw } from 'lucide-react';

export interface FilterState {
  onlyOpen: boolean;
  budgetFriendly: boolean;
  topRated: boolean;
  fastDelivery: boolean;
  campusSpecialOnly: boolean;
}

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalVendorsCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters, totalVendorsCount }) => {
  const toggleFilter = (key: keyof FilterState) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const hasActiveFilters = Object.values(filters).some(Boolean);

  const resetFilters = () => {
    setFilters({
      onlyOpen: false,
      budgetFriendly: false,
      topRated: false,
      fastDelivery: false,
      campusSpecialOnly: false,
    });
  };

  const filterChips: { key: keyof FilterState; label: string; icon: string }[] = [
    { key: 'onlyOpen', label: 'Open Now', icon: '🟢' },
    { key: 'campusSpecialOnly', label: 'Top Picks', icon: '🔥' },
    { key: 'budgetFriendly', label: 'Budget (<₦1,500)', icon: '💸' },
    { key: 'topRated', label: 'Top Rated (4.8+)', icon: '⭐' },
    { key: 'fastDelivery', label: 'Fast Prep (<20m)', icon: '⚡' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '12px',
        marginBottom: '20px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
      className="no-scrollbar"
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: '#4A5550',
          fontSize: '13px',
          fontWeight: 800,
          whiteSpace: 'nowrap',
          paddingRight: '6px',
        }}
      >
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            background: '#F0F3F1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#090C0B',
          }}
        >
          <SlidersHorizontal size={14} />
        </div>
        <span>Filter ({totalVendorsCount}):</span>
      </div>

      {filterChips.map((chip) => {
        const isActive = filters[chip.key];
        return (
          <button
            key={chip.key}
            onClick={() => toggleFilter(chip.key)}
            style={{
              padding: '8px 16px',
              borderRadius: '999px',
              background: isActive ? '#FF5500' : '#FFFFFF',
              color: isActive ? '#FFFFFF' : '#090C0B',
              border: isActive ? '1.5px solid #FF5500' : '1px solid #E5EAE7',
              fontSize: '13px',
              fontWeight: isActive ? 800 : 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
              boxShadow: isActive ? '0 4px 12px rgba(255, 85, 0, 0.35)' : '0 1px 3px rgba(9,12,11,0.02)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.borderColor = '#FF5500';
                e.currentTarget.style.background = '#FFF8F5';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.borderColor = '#E5EAE7';
                e.currentTarget.style.background = '#FFFFFF';
              }
            }}
          >
            <span>{chip.icon}</span>
            <span>{chip.label}</span>
            {isActive && <Check size={13} strokeWidth={3} />}
          </button>
        );
      })}

      {hasActiveFilters && (
        <button
          onClick={resetFilters}
          style={{
            padding: '7px 14px',
            borderRadius: '999px',
            background: '#FEECEF',
            color: '#E80B2E',
            border: '1px solid #FCD4DB',
            fontSize: '12px',
            fontWeight: 800,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#FCD4DB')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#FEECEF')}
        >
          <RotateCcw size={12} />
          <span>Reset</span>
        </button>
      )}
    </div>
  );
};
