import React from 'react';

// Card Container Component
export function Card({ className, children }) {
  return (
    <div className={`bg-white shadow-lg rounded-lg ${className}`}>
      {children}
    </div>
  );
}

// Card Content Component
export function CardContent({ className, children }) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
}