import React, { useState } from 'react';
import './CRM.css';

function CRM() {
  const [client, setClient] = useState({
    name: '',
    email: '',
    phone: '',
    investmentFile: ''
  });

  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("לקוח נוסף:", client);
    alert('לקוח נוסף בהצלחה!');
    // כאן ניתן להוסיף קריאה ל-API לשמירת נתוני הלקוח
    setClient({
      name: '',
      email: '',
      phone: '',
      investmentFile: ''
    });
  };

  return (
    <div className="crm-container">
      <h2>מערכת CRM – ניהול לקוחות</h2>
      <form onSubmit={handleSubmit} className="crm-form">
        <label>
          שם מלא:
          <input type="text" name="name" value={client.name} onChange={handleChange} required />
        </label>
        <label>
          דואר אלקטרוני:
          <input type="email" name="email" value={client.email} onChange={handleChange} required />
        </label>
        <label>
          טלפון:
          <input type="text" name="phone" value={client.phone} onChange={handleChange} required />
        </label>
        <label>
          תיק השקעות (מספר/קישור):
          <input type="text" name="investmentFile" value={client.investmentFile} onChange={handleChange} />
        </label>
        <button type="submit">הוסף לקוח</button>
      </form>
    </div>
  );
}

export default CRM;
