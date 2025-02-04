import React, { useState } from 'react';
import './RegulatoryQuestions.css';

const topics = {
  personal_update: {
    title: 'עדכון פרטים אישיים וצרכים',
    questions: [
      "האם חל שינוי במצבך הכלכלי?",
      "האם יש צורך בנזילות כספית שונה?",
      "האם יש שינוי במטרות ההשקעה שלך?"
    ]
  },
  investment_recommendation: {
    title: 'מתן המלצות השקעה',
    questions: [
      "האם אתה מודע לכך שקיימת לי זיקה לנכס זה?",
      "לדעתך, האם הנכס מתאים למצבך?",
      "האם אתה מודע לרמת הסיכון של הנכס?"
    ]
  },
  documentation: {
    title: 'תיעוד שיחה',
    questions: [
      "האם אתה מאשר את תיעוד השיחה?",
      "האם תרצה לקבל עותק של הפרוטוקול?"
    ]
  }
};

function RegulatoryQuestions() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  return (
    <div className="regulatory-questions">
      <h3>שאלות רגולטוריות</h3>
      {Object.entries(topics).map(([key, topic]) => (
        <div key={key} className="topic">
          <button onClick={() => setSelectedTopic(selectedTopic === key ? null : key)}>
            {topic.title}
          </button>
          {selectedTopic === key && (
            <ul>
              {topic.questions.map((question, idx) => (
                <li key={idx} className="question-item">{question}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default RegulatoryQuestions;
