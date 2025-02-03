# Movne Platform

זהו פרויקט בסיסי למערכת ייעוץ פיננסי עבור Movne Platform, הכולל:
- **Backend:** Node.js עם Express.
- **Frontend:** React עם מערכת טאבים (שיחות, CRM, Ticket לקוח).
- **Codespaces:** קבצי Dev Container להגדרת סביבת Codespaces אחידה.

## מבנה הפרויקט

- **.devcontainer/** – קבצי הגדרה לסביבת Codespaces.
- **server/** – צד השרת (API, ניהול שיחות ו-CRM).
- **client/** – צד הלקוח (ממשק משתמש ב־React).
  - **public/** – קבצי HTML סטטיים.
  - **src/** – קוד ה־React (רכיבים, קומפוננטים).

## הפעלת הפרויקט

### דרך GitHub Codespaces

1. העלו את הפרויקט למאגר ב־GitHub.
2. פתחו Codespace על המאגר.
3. לאחר בניית הסביבה:
   - עברו לתיקיית `server` והריצו:
     \`\`\`
     npm start
     \`\`\`
     השרת ירוץ על פורט **5000**.
   - עברו לתיקיית `client` והריצו:
     \`\`\`
     npm start
     \`\`\`
     אפליקציית React תורץ על פורט **3000**.

### הפעלה מקומית

1. התקינו את התלויות:
   - בתיקיית `server`: \`npm install\`
   - בתיקיית `client`: \`npm install\`
2. הריצו את השרת והלקוח כפי שמפורט לעיל.
