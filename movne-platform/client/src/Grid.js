import React from 'react';
import './Grid.css';

function Grid() {
  // הגדרת גריד בגודל 10x10
  const rows = 10;
  const cols = 10;
  const gridData = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(`תא ${i + 1}-${j + 1}`);
    }
    gridData.push(row);
  }

  // עדכון תא B8 (שורה 8, עמודה 2) – באינדקס: שורה 7, עמודה 1
  gridData[7][1] = (
    <button onClick={() => alert('לחצן נלחץ!')}>
      לחץ עליי
    </button>
  );

  return (
    <table className="grid-table">
      <tbody>
        {gridData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <td key={colIndex} className="grid-cell">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Grid;
