// Dashboard.test.js

// ייבוא ההרחבות של jest-dom (כך Matchers כמו toBeInTheDocument יהיו זמינים)
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// ייבוא רכיב הדשבורד – נניח שהוא מכיל בתוכו גם את RealTimeTranscriptLive, RegulatoryQuestions ו-RecordingControls
import Dashboard from './Dashboard';

describe("Dashboard Component", () => {
  beforeEach(() => {
    // רינדור הרכיב לפני כל בדיקה
    render(<Dashboard />);
  });

  test("renders dashboard header", () => {
    // בדיקה שהכותרת הראשית מוצגת
    const headerElement = screen.getByText(/Movne Platform – מערכת ייעוץ פיננסי/i);
    expect(headerElement).toBeInTheDocument();
  });

  test("renders action buttons for sending email", () => {
    // בדיקה שהכפתורים לשליחת מייל מופיעים
    const advisorButton = screen.getByText(/שלח מייל ליועץ/i);
    const clientButton = screen.getByText(/שלח מייל ללקוח/i);
    expect(advisorButton).toBeInTheDocument();
    expect(clientButton).toBeInTheDocument();
  });

  test("renders RecordingControls and its buttons", () => {
    // בדיקה שהרכיב RecordingControls מוצג ושיש לו את כל הכפתורים
    // נניח שהכפתורים מייצגים את הטקסטים בעברית כפי שהוגדרו
    const startButton = screen.getByRole("button", { name: /התחל הקלטה/i });
    const uploadButton = screen.getByRole("button", { name: /העלה הקלטה/i });
    const summaryButton = screen.getByRole("button", { name: /סיכום ופעולות/i });
    expect(startButton).toBeInTheDocument();
    expect(uploadButton).toBeInTheDocument();
    expect(summaryButton).toBeInTheDocument();
  });

  test("RecordingControls button 'התחל הקלטה' changes text on click", () => {
    // נבדוק שבמצב ברירת מחדל הכפתור מציג "התחל הקלטה" וכשאנחנו לוחצים עליו – משתנה ל"הקלטה בהפעלה"
    const startButton = screen.getByRole("button", { name: /התחל הקלטה/i });
    expect(startButton).toHaveTextContent("התחל הקלטה");

    // סימולציה של לחיצה על הכפתור
    fireEvent.click(startButton);

    // לאחר הלחיצה, לפי ההגדרות ברכיב, נניח שהמצב משתנה והכפתור מציג "הקלטה בהפעלה"
    // (אם זהו התרחיש שמוגדר ברכיב, אחרת יש לעדכן את הבדיקה בהתאם)
    expect(startButton).toHaveTextContent("הקלטה בהפעלה");
  });

  test("RealTimeTranscriptLive component renders", () => {
    // נבדוק שהרכיב לתמלול בשידור חי מוצג – לדוגמה, נבדוק שהטקסט "תמלול בשידור חי" מופיע
    // שימו לב: אם הרכיב מנסה להשתמש ב-Web Speech API, בסביבת Jest (jsdom) זה לא נתמך
    // לכן נבדוק רק את נוכחותו או טקסט סטטי בו
    const transcriptHeader = screen.getByText(/תמלול בשידור חי/i);
    expect(transcriptHeader).toBeInTheDocument();
  });

  test("RegulatoryQuestions component renders", () => {
    // נבדוק שהרכיב לשאלות רגולטוריות מוצג – לדוגמה, נבדוק שהכותרת "עדכון פרטים אישיים וצרכים" מופיעה
    const regulatoryHeader = screen.getByText(/עדכון פרטים אישיים וצרכים/i);
    expect(regulatoryHeader).toBeInTheDocument();
  });
});
