import React, { useState } from 'react';
import './CRM.css';

function CRM() {
  const [email, setEmail] = useState('');

  return (
    <div className="crm-container">
      <h2>מערכת CRM</h2>
      <p>כאן תוצג רשימת לקוחות, היסטוריית שיחות, מוצרים וקופונים.</p>
      <div className="form-group">
        <label>דואר אלקטרוני:</label>
        <input 
          type="email" 
          placeholder="דואר אלקטרוני" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
      </div>
    </div>
  );
}

export default CRM;
