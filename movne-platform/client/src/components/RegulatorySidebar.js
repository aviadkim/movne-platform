import React, { useState } from 'react';

const TOPICS = {
  'שיחת שיווק': {
    id: 1,
    questions: [
      { id: 'q1_1', text: 'האם זוהה הלקוח?', required: true },
      { id: 'q1_2', text: 'האם חל שינוי בפרטים מהותיים?', required: true },
      { id: 'q1_3', text: 'האם קיים ניגוד עניינים בהמלצה?', required: true },
      { id: 'q1_4', text: 'האם ההמלצה מתאימה ללקוח?', required: true },
      { id: 'q1_5', text: 'האם מדובר בנכס בסיכון מיוחד?', required: true }
    ]
  },
  'עדכון צרכי לקוח': {
    id: 2,
    questions: [
      { id: 'q2_1', text: 'האם חלפו 12 חודשים מעדכון צרכים אחרון?', required: true },
      { id: 'q2_2', text: 'האם חל שינוי במצב הכספי?', required: true },
      { id: 'q2_3', text: 'האם יש שינוי בצורך בנזילות?', required: true },
      { id: 'q2_4', text: 'האם נדרש שינוי במדיניות השקעה?', required: true }
    ]
  },
  'שינוי מדיניות השקעה': {
    id: 3,
    questions: [
      { id: 'q3_1', text: 'האם השינוי הוא פניה יזומה של הלקוח?', required: true },
      { id: 'q3_2', text: 'האם הוסברו משמעויות רמת הסיכון?', required: true },
      { id: 'q3_3', text: 'האם התקבל אישור בכתב מהלקוח?', required: true }
    ]
  },
  'סיום התקשרות': {
    id: 5,
    questions: [
      { id: 'q5_1', text: 'האם בוצע תיעוד בכתב של בקשת הסיום?', required: true },
      { id: 'q5_2', text: 'האם חושב תשלום יחסי עד למועד הסיום?', required: true },
      { id: 'q5_3', text: 'האם נשלח מכתב סיום התקשרות?', required: true },
      { id: 'q5_4', text: 'האם נותרו אחזקות ללקוח?', required: true },
      { id: 'q5_5', text: 'האם עודכן מועד סיום ההתקשרות בטבלת הדיווח?', required: true }
    ]
  },
  'טיפול בתלונות': {
    id: 6,
    questions: [
      { id: 'q6_1', text: 'האם התקבלה פניה מהלקוח לקבלת מידע נוסף?', required: true },
      { id: 'q6_2', text: 'האם ניתן מענה תוך 3 ימי עסקים?', required: true },
      { id: 'q6_3', text: 'האם התלונה תועדה בטבלת התלונות?', required: true },
      { id: 'q6_4', text: 'האם נבדק הצורך בעדכון תהליכים/הדרכות?', required: true },
      { id: 'q6_5', text: 'האם התקבלה החלטה לגבי פיצוי?', required: true },
      { id: 'q6_6', text: 'האם עודכנה החברה החיצונית לציות ובקרה?', required: true }
    ]
  }
};

const RegulatorySidebar = ({ onAnswerUpdate }) => {
  const [answers, setAnswers] = useState({});
  const [activeTopic, setActiveTopic] = useState(null);
  const [expandedTopic, setExpandedTopic] = useState(null);

  const handleAnswer = (questionId, answer, timestamp, transcriptTime) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        answer,
        timestamp,
        transcriptTime,
        answered: true
      }
    }));
    onAnswerUpdate(questionId, answer, timestamp, transcriptTime);
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-xl border border-stone-200 h-full">
      <div className="p-4 border-b border-stone-200">
        <h3 className="text-lg font-semibold text-finance-300">נושאי שיחה רגולטוריים</h3>
      </div>
      
      <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
        {Object.entries(TOPICS).map(([topic, { id, questions }]) => (
          <div key={id} className="border-b border-stone-100">
            <button
              className={`w-full p-4 text-right flex items-center justify-between ${
                activeTopic === id ? 'bg-finance-50' : ''
              }`}
              onClick={() => {
                setExpandedTopic(expandedTopic === id ? null : id);
                setActiveTopic(id);
              }}
            >
              <span className="font-medium text-finance-300">{topic}</span>
              <span className="text-sm text-trust-400">
                {questions.filter(q => answers[q.id]?.answered).length}/{questions.length}
              </span>
            </button>
            
            {expandedTopic === id && (
              <div className="bg-gray-50 p-4 space-y-3">
                {questions.map(question => {
                  const answer = answers[question.id];
                  return (
                    <div
                      key={question.id}
                      className={`p-3 rounded-lg ${
                        answer?.answered
                          ? 'bg-green-50 border border-green-200'
                          : 'bg-white border border-stone-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm text-finance-300">{question.text}</p>
                        <button
                          onClick={() => handleAnswer(
                            question.id,
                            true,
                            new Date().toLocaleTimeString(),
                            '12:34' // Replace with actual transcript time
                          )}
                          className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center
                            ${answer?.answered
                              ? 'bg-green-500 text-white'
                              : 'bg-stone-100 text-stone-400 hover:bg-trust-400 hover:text-white'
                            }`}
                        >
                          {answer?.answered ? '✓' : '?'}
                        </button>
                      </div>
                      {answer?.answered && (
                        <div className="mt-2 text-xs text-stone-500">
                          <p>זמן שיחה: {answer.transcriptTime}</p>
                          <p>זמן תיעוד: {answer.timestamp}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegulatorySidebar;
