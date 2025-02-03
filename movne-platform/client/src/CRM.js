// client/src/CRM.js
import React, { useState } from 'react';

function CRM() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const handleSubmit = () => {
    alert(`לקוח חדש נוצר: ${fullName}`);
    // שלח את הנתונים לשרת (כאן יש אינטגרציה עם ה-API של השרת)
  };

  return (
    <div className="crm-form">
      <h3 className="text-lg font-medium mb-4">הוספת לקוח חדש</h3>
      <input 
        type="text" 
        placeholder="שם מלא" 
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="input-field"
      />
      <input 
        type="email" 
        placeholder="דוא"ל"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-field"
      />
      <input 
        type="tel" 
        placeholder="טלפון"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="input-field"
      />
      <button onClick={handleSubmit} className="submit-button">שמור לקוח</button>
    </div>
  );
}

export default CRM;
