import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 size={18} color="#7A8469" />,
    error: <AlertCircle size={18} color="#D9381E" />,
    info: <Info size={18} color="#B59A68" />,
  };

  const borderColors = {
    success: 'rgba(122, 132, 105, 0.5)',
    error: 'rgba(217, 56, 30, 0.5)',
    info: 'rgba(181, 154, 104, 0.5)',
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '84px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        background: '#241A17',
        color: '#F8F5EF',
        padding: '12px 22px',
        borderRadius: '999px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: '0 10px 30px rgba(36, 26, 23, 0.4)',
        border: `1.5px solid ${borderColors[toast.type]}`,
        maxWidth: '90vw',
        animation: 'slideUp 0.25s ease-out',
      }}
    >
      {icons[toast.type]}
      <span style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.2px' }}>{toast.message}</span>
    </div>
  );
};
