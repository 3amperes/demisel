import React from 'react';

export default ({ size = 46, ...rest }) => (
  <svg viewBox="0 0 48 48" width={size} {...rest}>
    <circle cx={24} cy={24} r={24} fill="#fff" />
    <path
      fill="#e33450"
      d="M22.11 32.78l-2-2L26.89 24l-6.78-6.78 2-2L30.9 24l-8.79 8.78z"
    />
  </svg>
);
