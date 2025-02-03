import React, { useState } from 'react';
import './RegulatoryQuestions.css';

const initialTopics = {
  personal_update: {
    title: "עדכון פרטים אישיים וצרכים של הלקוח",
    questions: [
      { id: 1, text: "האם חל שינוי במצבך הכלכלי או בהכנסות שלך?", asked: false, answer: "" },
      { id: 2, text: "האם יש לך צורך בנזילות כספית שונה מהעבר?", asked: false, answer: "" },
      { id: 3, text: "האם יש שינוי במטרות ההשקעה שלך או בטווח הזמן שלהן?", asked: false, answer: "" },
      { id: 4, text: "האם חל שינוי במקום העבודה שלך או במצב התעסוקתי?", asked: false, answer: "" },
      { id: 5, text: "האם חל שינוי משמעותי בהכנסות או בהוצאות שלך?", asked: false, answer: "" },
      { id: 6, text: "האם יש לך צורך שונה בנזילות הכספים שלך?", asked: false, answer: "" },
      { id: 7, text: "האם אתה מבין כי סירובך לענות על השאלות עלול לפגוע ביכולתי לספק לך שירות מקצועי?", asked: false, answer: "" }
    ]
  },
  investment_recommendations: {
    title: "מתן המלצות השקעה",
    questions: [
      { id: 8, text: "האם אתה מודע לכך שקיימת לי זיקה לנכס זה?", asked: false, answer: "" },
      { id: 9, text: "לדעתי, הנכס שאתה מעוניין בו אינו מתאים למצבך הפיננסי – האם תרצה שאסביר מדוע?", asked: false, answer: "" },
      { id: 10, text: "האם אתה מודע לרמת הסיכון של הנכס הזה?", asked: false, answer: "" },
      { id: 11, text: "האם תרצה לשנות את מדיניות ההשקעה שלך?", asked: false, answer: "" },
      { id: 12, text: "אנא אשר בכתב את השינוי שאנו מבצעים כעת.", asked: false, answer: "" }
    ]
  },
  documentation: {
    title: "תיעוד שיחה",
    questions: [
      { id: 13, text: "אני מתעד כרגע את השיחה שלנו, האם זה בסדר מבחינתך?", asked: false, answer: "" }
    ]
  },
  disclosure: {
    title: "גילוי נאות",
    questions: [
      { id: 14, text: "האם עדכנת את הסכם ההתקשרות על הגופים והנכסים שיש לך זיקה אליהם?", asked: false, answer: "" }
    ]
  },
  termination: {
    title: "סיום התקשרות",
    questions: [
      { id: 15, text: "האם ברצונך לסיים את ההתקשרות?", asked: false, answer: "" }
    ]
  },
  complaints: {
    title: "תלונות",
    questions: [
      { id: 16, text: "האם קיבלת מענה לתלונה שלך בתוך 3 ימי עסקים?", asked: false, answer: "" }
    ]
  }
};

function RegulatoryQuestions({ onQuestionAnswered }) {
  const [topics, setTopics] = useState(initialTopics);
  const [activeTopic, setActiveTopic] = useState(null);

  const toggleQuestion = (topicKey, questionId) => {
    const updatedTopics = { ...topics };
    updatedTopics[topicKey].questions = updatedTopics[topicKey].questions.map(q => {
      if (q.id === questionId) {
        return { ...q, asked: !q.asked };
      }
      return q;
    });
    setTopics(updatedTopics);
  };

  const handleAnswerChange = (topicKey, questionId, value) => {
    const updatedTopics = { ...topics };
    updatedTopics[topicKey].questions = updatedTopics[topicKey].questions.map(q => {
      if (q.id === questionId) {
        const updatedQuestion = { ...q, answer: value };
        if (onQuestionAnswered) {
          onQuestionAnswered(updatedQuestion);
        }
        return updatedQuestion;
      }
      return q;
    });
    setTopics(updatedTopics);
  };

  return (
    <div className="regulatory-questions p-4 border rounded mt-4">
      <h3 className="text-lg font-medium mb-4">שאלות רגולטוריות</h3>
      {Object.entries(topics).map(([key, topic]) => (
        <div key={key} className="topic mb-4">
          <button
            onClick={() => setActiveTopic(activeTopic === key ? null : key)}
            className="w-full text-left p-2 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            {topic.title}
          </button>
          {activeTopic === key && (
            <ul className="mt-2">
              {topic.questions.map(q => (
                <li key={q.id} className={`question p-2 border-b ${q.asked ? "bg-green-100" : "bg-white"}`}>
                  <div onClick={() => toggleQuestion(key, q.id)} className="cursor-pointer">
                    {q.text}
                  </div>
                  {q.asked && (
                    <input
                      type="text"
                      placeholder="הכנס תשובה..."
                      value={q.answer}
                      onChange={(e) => handleAnswerChange(key, q.id, e.target.value)}
                      className="mt-1 w-full p-1 border rounded"
                    />
                  )}
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
