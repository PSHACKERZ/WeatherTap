import React from 'react';

const Input = ({ className, ...props }) => (
  <input
    className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring ${className}`}
    {...props}
  />
);

export default Input;
