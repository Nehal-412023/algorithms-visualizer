import React from 'react';
import './CodePanel.css';

const CodePanel = ({ codes }) => {
  return (
    <div className="code-panel">
      <h2>Huffman Codes</h2>
      <ul>
        {Object.entries(codes).map(([char, code]) => (
          <li key={char}>
            <strong>{char === ' ' ? 'Space' : char}:</strong> {code}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CodePanel;