import React, { useState, useEffect, useRef } from 'react';

const RealTimeTranscription = ({ language, onTranscriptionComplete }) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState([]); // שמירת כל התמלול
  const [summary, setSummary] = useState(""); // שמירת סיכום השיחה
  const [speaker, setSpeaker] = useState("יועץ"); // ברירת מחדל: יועץ
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Web Speech API is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false; // שומר רק את התוצאה הסופית
    recognition.lang = language;
    recognitionRef.current = recognition;

    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          setTranscript(prev => [...prev, { speaker, text: result[0].transcript }]);
        }
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      setListening(false);
      generateSummary(); // יצירת סיכום אוטומטי בסיום ההקלטה
    };

    return () => {
      recognition.stop();
    };
  }, [language]);

  const startRecording = () => {
    setTranscript([]); // מנקה את התמלול הקודם
    setSummary(""); // מנקה את הסיכום הקודם
    try {
      recognitionRef.current.start();
      setListening(true);
    } catch (err) {
      console.error("Error starting recognition:", err);
    }
  };

  const stopRecording = () => {
    recognitionRef.current.stop();
    setListening(false);
  };

  const generateSummary = () => {
    if (transcript.length === 0) {
      setSummary("אין מספיק מידע ליצירת סיכום.");
      return;
    }
    const summaryText = transcript
      .map(line => `${line.speaker}: ${line.text}`)
      .join("\n");
    setSummary(summaryText);
  };

  const sendEmail = () => {
    const emailBody = summary || transcript.map(line => `${line.speaker}: ${line.text}`).join("\n");
    const mailtoLink = `mailto:?subject=תמלול שיחה&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}>
      <h3>תמלול שיחה בשידור חי</h3>
      
      <label>בחר דובר:</label>
      <select onChange={(e) => setSpeaker(e.target.value)} value={speaker} style={{ margin: "10px" }}>
        <option value="יועץ">יועץ</option>
        <option value="לקוח">לקוח</option>
      </select>

      {!listening ? (
        <button
          onClick={startRecording}
          style={{ padding: "10px 20px", backgroundColor: "#5cb85c", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          התחל הקלטה
        </button>
      ) : (
        <button
          onClick={stopRecording}
          style={{ padding: "10px 20px", backgroundColor: "#d9534f", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          עצור הקלטה
        </button>
      )}

      <div
        style={{
          minHeight: "150px",
          border: "1px solid #eee",
          padding: "10px",
          backgroundColor: "#f9f9f9",
          marginTop: "10px",
          overflowY: "auto",
          fontFamily: "Arial, sans-serif",
          fontSize: "14px"
        }}
      >
        {transcript.map((line, idx) => (
          <p key={idx} style={{ margin: "5px 0" }}>
            <strong>{line.speaker}:</strong> {line.text}
          </p>
        ))}
      </div>

      {summary && (
        <div style={{ marginTop: "10px", padding: "10px", backgroundColor: "#e9ecef", borderRadius: "4px" }}>
          <h4>סיכום השיחה:</h4>
          <p>{summary}</p>
        </div>
      )}

      <button
        onClick={sendEmail}
        style={{ marginTop: "10px", padding: "10px 20px", backgroundColor: "#0275d8", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
      >
        שלח תמלול במייל
      </button>
    </div>
  );
};

export default RealTimeTranscription;
