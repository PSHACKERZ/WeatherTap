import React from 'react';

const Card = ({ children, className }) => (
  <div className={`rounded-lg shadow-md ${className}`}>
    {children}
  </div>
);

export default Card;
