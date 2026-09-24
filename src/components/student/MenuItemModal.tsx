import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import type { CartItemOptionSelected } from '../../types';
import { X, Plus, Minus, Check } from 'lucide-react';

export const MenuItemModal: React.FC = () => {
  const {
    selectedItemForModal,
    setSelectedItemForModal,
    selectedVendorForMenu,
    vendors,
    addToCart,
    showToast,
  } = useApp();

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  useEffect(() => {
    if (selectedItemForModal) {
      setQuantity(1);
      setSpecialInstructions('');
      // Pre-select defaults for required option groups
      const defaults: Record<string, string[]> = {};
      selectedItemForModal.optionGroups?.forEach((group) => {
        if (group.required && group.options.length > 0) {
          defaults[group.id] = [group.options[0].id];
        } else {
          defaults[group.id] = [];
        }
      });
      setSelectedOptions(defaults);
    }
  }, [selectedItemForModal]);

  if (!selectedItemForModal) return null;

  const currentVendor =
    selectedVendorForMenu ||
    vendors.find((v) => v.id === selectedItemForModal.vendorId);

  if (!currentVendor) return null;

  // Toggle or select option
  const handleOptionToggle = (
    groupId: string,
    optionId: string,
    isRequired: boolean,
    maxSelect?: number
  ) => {
    setSelectedOptions((prev) => {
      const current = prev[groupId] || [];
      if (isRequired) {
        // Radio behavior
        return { ...prev, [groupId]: [optionId] };
      } else {
        // Checkbox behavior
        if (current.includes(optionId)) {
          return { ...prev, [groupId]: current.filter((id) => id !== optionId) };
        } else {
          if (maxSelect && current.length >= maxSelect) {
            showToast(`You can select at most ${maxSelect} choices for this option`, 'info');
            return prev;
          }
          return { ...prev, [groupId]: [...current, optionId] };
        }
      }
    });
  };

  // Calculate total price
  let additionalCost = 0;
  const flatSelectedOptions: CartItemOptionSelected[] = [];

  selectedItemForModal.optionGroups?.forEach((group) => {
    const chosenIds = selectedOptions[group.id] || [];
    chosenIds.forEach((cId) => {
      const opt = group.options.find((o) => o.id === cId);
      if (opt) {
        additionalCost += opt.price;
        flatSelectedOptions.push({
          groupId: group.id,
          groupTitle: group.title,
          optionId: opt.id,
          optionName: opt.name,
          price: opt.price,
        });
      }
    });
  });

  const unitPrice = selectedItemForModal.price + additionalCost;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    // Validate required groups
    for (const group of selectedItemForModal.optionGroups || []) {
      const chosen = selectedOptions[group.id] || [];
      if (group.required && chosen.length === 0) {
        showToast(`Please choose an option for "${group.title}"`, 'error');
        return;
      }
    }

    addToCart(
      selectedItemForModal,
      currentVendor,
      flatSelectedOptions,
      quantity,
      specialInstructions.trim() || undefined
    );
    setSelectedItemForModal(null);
  };

  return (
    <div className="modal-overlay" onClick={() => setSelectedItemForModal(null)}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '520px', padding: 0, overflow: 'hidden' }}
      >
        {/* Item Image Header with Close Button */}
        <div style={{ position: 'relative', height: '200px', width: '100%' }}>
          <img
            src={selectedItemForModal.image}
            alt={selectedItemForModal.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <button
            onClick={() => setSelectedItemForModal(null)}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'rgba(15, 23, 42, 0.75)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(4px)',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div style={{ padding: '20px 24px', maxHeight: '55vh', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#241A17' }}>
                {selectedItemForModal.name}
              </h3>
              <p style={{ fontSize: '13px', color: '#574640', marginTop: '4px', lineHeight: 1.4 }}>
                {selectedItemForModal.description}
              </p>
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#D9381E', flexShrink: 0 }}>
              ₦{selectedItemForModal.price.toLocaleString()}
            </div>
          </div>

          {/* Option Groups */}
          {selectedItemForModal.optionGroups?.map((group) => {
            const chosen = selectedOptions[group.id] || [];
            return (
              <div
                key={group.id}
                style={{
                  marginTop: '20px',
                  paddingTop: '16px',
                  borderTop: '1px solid #DDD6CA',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#241A17' }}>{group.title}</h4>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '99px',
                      background: group.required ? '#FDF1EE' : '#E9E3D8',
                      color: group.required ? '#D9381E' : '#574640',
                    }}
                  >
                    {group.required ? 'Required' : 'Optional'}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {group.options.map((opt) => {
                    const isSelected = chosen.includes(opt.id);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleOptionToggle(group.id, opt.id, group.required, group.maxSelect)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          borderRadius: '12px',
                          border: isSelected ? '1.5px solid #D9381E' : '1px solid #DDD6CA',
                          background: isSelected ? '#FDF1EE' : '#FFFFFF',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div
                            style={{
                              width: '18px',
                              height: '18px',
                              borderRadius: group.required ? '50%' : '5px',
                              border: isSelected ? '2px solid #D9381E' : '2px solid #DDD6CA',
                              background: isSelected ? '#D9381E' : 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#fff',
                            }}
                          >
                            {isSelected && <Check size={11} strokeWidth={3} />}
                          </div>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: '#241A17' }}>
                            {opt.name}
                          </span>
                        </div>

                        {opt.price > 0 && (
                          <span style={{ fontSize: '13px', fontWeight: 700, color: '#574640' }}>
                            +₦{opt.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Special Instructions Note */}
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #DDD6CA' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#241A17', marginBottom: '6px' }}>
              Special Kitchen Note (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Put stew in separate container, make it extra spicy, please add spoon..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '12px',
                border: '1px solid #DDD6CA',
                fontSize: '13px',
                fontFamily: 'inherit',
                outline: 'none',
                color: '#241A17',
                resize: 'none',
              }}
            />
          </div>
        </div>

        {/* Sticky Footer Bar with Quantity +/- and Add to Tray */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid #DDD6CA',
            background: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          {/* Quantity Controls */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: '#E9E3D8',
              padding: '6px 12px',
              borderRadius: '999px',
            }}
          >
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#241A17',
                boxShadow: '0 1px 2px rgba(36,26,23,0.05)',
              }}
            >
              <Minus size={13} />
            </button>
            <span style={{ fontSize: '14px', fontWeight: 800, minWidth: '18px', textAlign: 'center', color: '#241A17' }}>
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#241A17',
                boxShadow: '0 1px 2px rgba(36,26,23,0.05)',
              }}
            >
              <Plus size={13} />
            </button>
          </div>

          {/* Add to Tray Button */}
          <button
            onClick={handleAdd}
            className="btn-primary"
            style={{ flex: 1, padding: '12px 18px', fontSize: '14px', borderRadius: '14px' }}
          >
            <span>Add to Tray</span>
            <span>•</span>
            <span>₦{totalPrice.toLocaleString()}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
