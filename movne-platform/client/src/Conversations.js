import React from 'react';
import Grid from './Grid';

function Conversations() {
  return (
    <div>
      <h2>מודול שיחות</h2>
      <p>כאן יוצגו השיחות עם הקלטה, תמלול, סיכום, action items והכנת מיילים.</p>
      {/* הדגמה: הצגת קומפוננט גריד לדוגמה */}
      <Grid />
    </div>
  );
}

export default Conversations;
