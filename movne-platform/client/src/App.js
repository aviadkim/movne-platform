import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import CRM from './CRM';
import ClientTicket from './ClientTicket';
import InvestmentFile from './InvestmentFile';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Movne Platform – מערכת ייעוץ פיננסי</h1>
          <nav className="nav-tabs">
            <NavLink exact to="/" activeClassName="active-tab" className="nav-link">
              Dashboard
            </NavLink>
            <NavLink to="/crm" activeClassName="active-tab" className="nav-link">
              CRM
            </NavLink>
            <NavLink to="/client-ticket" activeClassName="active-tab" className="nav-link">
              תיק לקוח
            </NavLink>
            <NavLink to="/investment-file" activeClassName="active-tab" className="nav-link">
              תיק השקעות
            </NavLink>
          </nav>
        </header>
        <main className="main-content">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/crm" component={CRM} />
            <Route path="/client-ticket" component={ClientTicket} />
            <Route path="/investment-file" component={InvestmentFile} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
