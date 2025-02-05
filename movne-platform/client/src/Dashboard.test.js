import '@testing-library/jest-dom';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent, within } from '@testing-library/react';
import Dashboard from './Dashboard';

describe("Dashboard Component", () => {
  beforeEach(() => {
    // עטיפת Dashboard בתוך MemoryRouter כדי לספק את ההקשר הדרוש ל-<Link>
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
    const recordingContainer = screen.getByTestId("recording-controls");
    // נבחר את כל הכפתורים עם הטקסט "התחל הקלטה" בתוך הקונטיינר
    const startButtons = within(recordingContainer).getAllByRole("button", { name: /התחל הקלטה/i });
    // נבחר את הראשון
    const startButton = startButtons[0];
    const uploadButton = within(recordingContainer).getByRole("button", { name: /העלה הקלטה/i });
    const summaryButton = within(recordingContainer).getByRole("button", { name: /סיכום ופעולות/i });
    expect(startButton).toBeInTheDocument();
    expect(uploadButton).toBeInTheDocument();
    expect(summaryButton).toBeInTheDocument();
  });

  test("RecordingControls button 'התחל הקלטה' changes text on click", () => {
    const recordingContainer = screen.getByTestId("recording-controls");
    const startButtons = within(recordingContainer).getAllByRole("button", { name: /התחל הקלטה/i });
    const startButton = startButtons[0];
    expect(startButton).toHaveTextContent("התחל הקלטה");
    fireEvent.click(startButton);
    expect(startButton).toHaveTextContent("הקלטה בהפעלה");
  });

  test("RealTimeTranscriptLive component renders", async () => {
    // נבדוק כותרת המכילה את "תמלול שיחה בשידור חי"
    const transcriptHeading = await screen.findByText(/תמלול שיחה בשידור חי/i);
    expect(transcriptHeading).toBeInTheDocument();
  });

  test("RegulatoryQuestions component renders", () => {
    const regulatoryHeader = screen.getByText(/עדכון פרטים אישיים וצרכים/i);
    expect(regulatoryHeader).toBeInTheDocument();
  });

  test("dummy test", () => {
    expect(true).toBe(true);
  });
});
