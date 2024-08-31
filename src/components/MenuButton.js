import React from 'react';
import './MenuButton.css'; // Import the CSS file

const EllipsisButton = () => {
  return (
    <button className="ellipsis-button">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </button>
  );
};

export default EllipsisButton;