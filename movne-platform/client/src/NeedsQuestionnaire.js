import React, { useState } from 'react';
import './NeedsQuestionnaire.css';

function NeedsQuestionnaire() {
  const [responses, setResponses] = useState({
    fullName: '',
    idNumber: '',
    phone: '',
    email: ''
  });

  const handleChange = (e) => {
    setResponses({
      ...responses,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('השאלון נשלח בהצלחה!');
    // כאן יש לשלוח את הנתונים לשרת או לעדכן ב-CRM
  };

  return (
    <form className="questionnaire-form" onSubmit={handleSubmit}>
      <h3>שאלון בירור צרכים</h3>
      <label>
        שם מלא:
        <input type="text" name="fullName" value={responses.fullName} onChange={handleChange} />
      </label>
      <label>
        תעודת זהות:
        <input type="text" name="idNumber" value={responses.idNumber} onChange={handleChange} />
      </label>
      <label>
        טלפון:
        <input type="text" name="phone" value={responses.phone} onChange={handleChange} />
      </label>
      <label>
        דואר אלקטרוני:
        <input type="email" name="email" value={responses.email} onChange={handleChange} />
      </label>
      <button type="submit">שלח שאלון</button>
    </form>
  );
}

export default NeedsQuestionnaire;
