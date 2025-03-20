// components/ui/button.js
import React from 'react';

export function Button({ className, children, onClick, type = 'button' }) {
  return (
    <button
      type={type}
      className={`px-6 py-2 rounded-lg shadow-md transition duration-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}