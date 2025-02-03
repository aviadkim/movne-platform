import React from 'react';
import './SummaryAndActions.css';

function SummaryAndActions() {
  const sendEmailToAdvisor = () => alert('מייל ליועץ נשלח');
  const sendEmailToClient = () => alert('מייל ללקוח נשלח');
  return (
    <div className="summary-actions bg-yellow-50 p-4 border rounded mb-4">
      <h3 className="text-lg font-medium mb-2">סיכום ופעולות</h3>
      <p>כאן יוצג סיכום השיחה והמשימות שעל פי השיחה.</p>
      <div className="actions-buttons flex gap-4 mt-4">
        <button onClick={sendEmailToAdvisor} className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition">
          שלח מייל ליועץ
        </button>
        <button onClick={sendEmailToClient} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
          שלח מייל ללקוח
        </button>
      </div>
    </div>
  );
}

export default SummaryAndActions;
