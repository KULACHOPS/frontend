import React from 'react';

interface CategoryListProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({ selectedCategory, setSelectedCategory }) => {
  const categories = [
    { id: 'all', name: 'All Chops', emoji: '🔥' },
    { id: 'Rice Classics', name: 'Rice & Bowls', emoji: '🍚' },
    { id: 'Grills & Shawarma', name: 'Grills & Shawarma', emoji: '🌯' },
    { id: 'Swallow & Soups', name: 'Swallow & Soups', emoji: '🍲' },
    { id: 'Quick Bites', name: 'Quick Bites', emoji: '🍟' },
    { id: 'Late Night', name: 'Late Night (2AM)', emoji: '🌙' },
    { id: 'Drinks & Desserts', name: 'Chillers & Parfait', emoji: '🥤' },
  ];

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#241A17' }}>Explore Categories</h3>
        <span style={{ fontSize: '12px', color: '#8C7B74', fontWeight: 600 }}>Campus Curated</span>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '6px',
          scrollbarWidth: 'none',
        }}
      >
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 16px',
                borderRadius: '999px',
                background: isSelected ? '#D9381E' : '#FFFFFF',
                color: isSelected ? '#FFFFFF' : '#241A17',
                border: isSelected ? '1px solid #D9381E' : '1px solid #DDD6CA',
                fontSize: '13px',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                boxShadow: isSelected ? '0 4px 14px rgba(217, 56, 30, 0.28)' : '0 1px 3px rgba(36,26,23,0.04)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <span style={{ fontSize: '16px' }}>{cat.emoji}</span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
