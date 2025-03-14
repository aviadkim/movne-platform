import React, { useState, useEffect } from 'react';
import './MarketData.css';

function MarketData() {
  const [data, setData] = useState({ price: 0 });

  useEffect(() => {
    // עדכון נתוני שוק כל 10 שניות – יש להחליף עם API אמיתי בעתיד
    const interval = setInterval(() => {
      setData({ price: (Math.random() * 1000).toFixed(2) });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="market-data">
      <h3>נתוני שוק בזמן אמת</h3>
      <p>מחיר נוכחי: {data.price}</p>
    </div>
  );
}

export default MarketData;
