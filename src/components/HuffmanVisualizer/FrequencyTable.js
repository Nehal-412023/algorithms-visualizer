import React from 'react';
import './FrequencyTable.css';

const FrequencyTable = ({ data }) => {
  return (
    <div className="frequency-table">
      <h2>Frequency Table</h2>
      <table>
        <thead>
          <tr>
            <th>Character</th>
            <th>Frequency</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ char, count }) => (
            <tr key={char}>
              <td>{char === ' ' ? 'Space' : char}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FrequencyTable;