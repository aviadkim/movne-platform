import React, { useState } from 'react';

function CRM() {
  const [email, setEmail] = useState('');

  return (
    <div className="crm-container p-4 bg-white border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">מערכת CRM</h2>
      <p className="mb-4">כאן תוצג רשימת לקוחות, היסטוריית שיחות, מוצרים וקופונים.</p>
      
      {/* טופס להוספת לקוח/עדכון פרטי לקוח */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          דואר אלקטרוני:
        </label>
        <input 
          type="email" 
          placeholder="דואר אלקטרוני"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
  );
}

export default CRM;
