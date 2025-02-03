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
    console.log('Responses:', responses);
    alert('השאלון נשלח בהצלחה!');
  };

  return (
    <form className="questionnaire-form bg-white p-4 border rounded mb-4" onSubmit={handleSubmit}>
      <h3 className="text-lg font-medium text-center mb-2">שאלון בירור צרכים</h3>
      <label className="block mb-2">
        שם מלא:
        <input type="text" name="fullName" value={responses.fullName} onChange={handleChange} className="w-full p-2 border rounded mt-1" />
      </label>
      <label className="block mb-2">
        תעודת זהות:
        <input type="text" name="idNumber" value={responses.idNumber} onChange={handleChange} className="w-full p-2 border rounded mt-1" />
      </label>
      <label className="block mb-2">
        טלפון:
        <input type="text" name="phone" value={responses.phone} onChange={handleChange} className="w-full p-2 border rounded mt-1" />
      </label>
      <label className="block mb-2">
        דוא"ל:
        <input type="email" name="email" value={responses.email} onChange={handleChange} className="w-full p-2 border rounded mt-1" />
      </label>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
        שלח שאלון
      </button>
    </form>
  );
}

export default NeedsQuestionnaire;
