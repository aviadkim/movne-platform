// movne-platform/movne-platform/client/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import Conversations from './Conversations';
import CRM from './CRM';
import ClientTicket from './ClientTicket';
import RealTimeTranscriptLive from './RealTimeTranscriptLive'; // רכיב תמלול אמיתי
import RegulatoryQuestionsLive from './RegulatoryQuestionsLive';
import './App.css';

function App() {
  const [transcript, setTranscript] = useState("");

  // לדוגמה: ניתן לעדכן את הטקסט מתוך רכיב התמלול
  // או לשלב אותו כך ש-RegulatoryQuestionsLive יקבל את הטקסט בזמן אמת

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Movne Platform – מערכת ייעוץ פיננסי</h1>
          <nav className="nav-tabs">
            <NavLink exact to="/" activeClassName="active-tab">
              שיחות
            </NavLink>
            <NavLink to="/crm" activeClassName="active-tab">
              CRM
            </NavLink>
            <NavLink to="/client-ticket" activeClassName="active-tab">
              Ticket לקוח
            </NavLink>
          </nav>
        </header>
        <main className="main-content">
          <Switch>
            <Route path="/" exact>
              <Conversations />
              <RealTimeTranscriptLive />
              {/* העבר את הטקסט מהתמלול לרכיב RegulatoryQuestionsLive */}
              <RegulatoryQuestionsLive transcript={transcript} />
            </Route>
            <Route path="/crm" component={CRM} />
            <Route path="/client-ticket" component={ClientTicket} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
