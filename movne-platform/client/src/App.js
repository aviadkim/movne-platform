import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import Conversations from './Conversations';
import CRM from './CRM';
import ClientTicket from './ClientTicket';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Movne Platform – מערכת ייעוץ פיננסי</h1>
          <nav className="nav-tabs">
            <NavLink exact to="/" activeClassName="active-tab">
              Dashboard
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
            <Route path="/" exact component={Dashboard} />
            <Route path="/crm" component={CRM} />
            <Route path="/client-ticket" component={ClientTicket} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
