import React, { useEffect, useState } from 'react';
import './RegulatoryQuestionsLive.css';

const topics = {
  personal: {
    title: "עדכון פרטים אישיים וצרכים",
    questions: [
      { id: 1, text: "האם חל שינוי במצבך הכלכלי?" },
      { id: 2, text: "האם יש צורך בנזילות כספית שונה?" },
      { id: 3, text: "האם יש שינוי במטרות ההשקעה שלך?" }
    ]
  },
  investment: {
    title: "מתן המלצות השקעה",
    questions: [
      { id: 4, text: "האם אתה מודע לכך שקיימת לי זיקה לנכס זה?" },
      { id: 5, text: "לדעתך, האם הנכס מתאים למצבך?" },
      { id: 6, text: "האם אתה מודע לרמת הסיכון של הנכס?" }
    ]
  },
  documentation: {
    title: "תיעוד שיחה",
    questions: [
      { id: 7, text: "האם אתה מאשר את תיעוד השיחה?" },
      { id: 8, text: "האם תרצה לקבל עותק של הפרוטוקול?" }
    ]
  }
};

function RegulatoryQuestionsLive({ transcript }) {
  const [questionsStatus, setQuestionsStatus] = useState({});

  useEffect(() => {
    const newStatus = {};
    Object.keys(topics).forEach(topicKey => {
      topics[topicKey].questions.forEach(q => {
        newStatus[q.id] = transcript.includes(q.text);
      });
    });
    setQuestionsStatus(newStatus);
  }, [transcript]);

  return (
    <div className="regulatory-questions-live">
      <h3>שאלות רגולטוריות – עדכון בזמן אמת</h3>
      {Object.keys(topics).map(topicKey => (
        <div key={topicKey} className="topic">
          <h4>{topics[topicKey].title}</h4>
          <ul>
            {topics[topicKey].questions.map(q => (
              <li key={q.id} className={questionsStatus[q.id] ? 'question-asked' : 'question-pending'}>
                {q.text}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default RegulatoryQuestionsLive;
