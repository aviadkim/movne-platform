// client/src/RegulatoryQuestions.js
import React, { useState } from 'react';

const topics = {
  needs_update: {
    title: 'עדכון צרכים',
    questions: [
      { id: 1, text: 'האם נדרשת עדכון לגבי המטרות הפיננסיות?' },
      { id: 2, text: 'האם יש שינוי במצב האישי או המשפחתי?' }
    ]
  },
  risk_profile: {
    title: 'פרופיל סיכון',
    questions: [
      { id: 3, text: 'מהו רמת הסיכון הרצויה לך?' },
      { id: 4, text: 'האם עברת ניסיון קודם בהשקעות בסיכון גבוה?' }
    ]
  },
  disclosures: {
    title: 'גילוי נאות',
    questions: [
      { id: 5, text: 'האם נחשפת לניגודי עניינים?' },
      { id: 6, text: 'האם ישנם מידע חשוב שעליך לגלות ללקוח?' }
    ]
  }
};

function RegulatoryQuestions() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  return (
    <div className="regulatory-questions bg-white p-4 border rounded mt-4">
      <h3 className="text-lg font-medium mb-2">שאלות רגולטוריות</h3>
      {Object.entries(topics).map(([key, topic]) => (
        <div key={key} className="mb-2 border rounded">
          <button
            onClick={() => setSelectedTopic(selectedTopic === key ? null : key)}
            className="w-full px-4 py-2 text-left bg-gray-200 hover:bg-gray-300 transition"
          >
            {topic.title}
          </button>
          {selectedTopic === key && (
            <ul className="p-2">
              {topic.questions.map((q) => (
                <li key={q.id} className="p-2 border-b last:border-b-0">
                  {q.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default RegulatoryQuestions;
