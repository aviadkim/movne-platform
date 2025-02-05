import '@testing-library/jest-dom';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from './Dashboard';

describe("Dashboard Component", () => {
  beforeEach(() => {
    // עטיפה של Dashboard בתוך MemoryRouter כדי לספק את ההקשר הדרוש ל-<Link>
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
  });

  test("renders dashboard header", () => {
    const headerElement = screen.getByText(/Movne Platform – מערכת ייעוץ פיננסי/i);
    expect(headerElement).toBeInTheDocument();
  });

  test("renders action buttons for sending email", () => {
    const advisorButton = screen.getByText(/שלח מייל ליועץ/i);
    const clientButton = screen.getByText(/שלח מייל ללקוח/i);
    expect(advisorButton).toBeInTheDocument();
    expect(clientButton).toBeInTheDocument();
  });

  test("renders RecordingControls and its buttons", () => {
    const startButton = screen.getByRole("button", { name: /התחל הקלטה/i });
    const uploadButton = screen.getByRole("button", { name: /העלה הקלטה/i });
    const summaryButton = screen.getByRole("button", { name: /סיכום ופעולות/i });
    expect(startButton).toBeInTheDocument();
    expect(uploadButton).toBeInTheDocument();
    expect(summaryButton).toBeInTheDocument();
  });

  test("RecordingControls button 'התחל הקלטה' changes text on click", () => {
    const startButton = screen.getByRole("button", { name: /התחל הקלטה/i });
    expect(startButton).toHaveTextContent("התחל הקלטה");
    fireEvent.click(startButton);
    expect(startButton).toHaveTextContent("הקלטה בהפעלה");
  });

  test("RealTimeTranscriptLive component renders", () => {
    const transcriptHeader = screen.getByText(/תמלול בשידור חי/i);
    expect(transcriptHeader).toBeInTheDocument();
  });

  test("RegulatoryQuestions component renders", () => {
    const regulatoryHeader = screen.getByText(/עדכון פרטים אישיים וצרכים/i);
    expect(regulatoryHeader).toBeInTheDocument();
  });

  test("dummy test", () => {
    expect(true).toBe(true);
  });
});
