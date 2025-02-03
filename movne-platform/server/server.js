const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// נתיב בדיקה בסיסי
app.get('/api/hello', (req, res) => {
  res.json({ message: "שלום מהשרת של Movne Platform!" });
});

// נתיב לדוגמה לקבלת נתוני שיחה (Conversation)
app.post('/api/conversation', (req, res) => {
  console.log('נתוני שיחה:', req.body);
  res.status(200).json({ message: "נתוני השיחה התקבלו" });
});

// נתיב לדוגמה לניהול CRM
app.get('/api/crm', (req, res) => {
  res.json({ message: "נתוני CRM" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
