// Using rule-based summarization (free)
export const generateSummary = (transcript) => {
  const keyPhrases = [
    'סיכום', 'המלצה', 'החלטה', 'משימה', 'מעקב',
    'לבדוק', 'לטפל', 'להתקשר', 'לעדכן'
  ];
  
  return transcript
    .split('.')
    .filter(sentence => 
      keyPhrases.some(phrase => sentence.includes(phrase))
    )
    .join('. ');
};

// Extract tasks using patterns (free)
export const extractTasks = (transcript) => {
  const taskPatterns = [
    'צריך ל', 'חשוב ל', 'יש לבדוק',
    'נדרש', 'למעקב', 'משימה'
  ];
  
  return transcript
    .split('.')
    .filter(sentence => 
      taskPatterns.some(pattern => sentence.includes(pattern))
    )
    .map(task => ({
      text: task.trim(),
      completed: false,
      created: new Date()
    }));
};
