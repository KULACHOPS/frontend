import React from 'react';
import { SlidersHorizontal, Check } from 'lucide-react';

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

  const filterChips: { key: keyof FilterState; label: string }[] = [
    { key: 'onlyOpen', label: '🟢 Open Now' },
    { key: 'campusSpecialOnly', label: '🔥 Campus Deals' },
    { key: 'budgetFriendly', label: '💸 Student Budget (<₦1,500)' },
    { key: 'topRated', label: '⭐ Top Rated (4.8+)' },
    { key: 'fastDelivery', label: '⚡ Fast Prep (<20m)' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '12px',
        marginBottom: '16px',
        scrollbarWidth: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: '#574640',
          fontSize: '12px',
          fontWeight: 700,
          whiteSpace: 'nowrap',
          paddingRight: '6px',
        }}
      >
        <SlidersHorizontal size={14} />
        <span>Filters ({totalVendorsCount}):</span>
      </div>

      {filterChips.map((chip) => {
        const isActive = filters[chip.key];
        return (
          <button
            key={chip.key}
            onClick={() => toggleFilter(chip.key)}
            style={{
              padding: '6px 14px',
              borderRadius: '999px',
              background: isActive ? '#FDF1EE' : '#FFFFFF',
              color: isActive ? '#D9381E' : '#574640',
              border: isActive ? '1.5px solid #D9381E' : '1px solid #DDD6CA',
              fontSize: '12px',
              fontWeight: isActive ? 700 : 500,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
              boxShadow: '0 1px 2px rgba(36,26,23,0.02)',
              transition: 'all 0.15s ease',
            }}
          >
            {isActive && <Check size={12} strokeWidth={3} />}
            <span>{chip.label}</span>
          </button>
        );
      })}
    </div>
  );
};
