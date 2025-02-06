import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import CRM from './CRM';
import ClientTicket from './ClientTicket';
import InvestmentFile from './InvestmentFile';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-pro">
        <header className="fixed w-full top-0 bg-finance-300 shadow-xl px-6 py-4 z-50">
          <h1 className="text-2xl font-bold text-white mb-4 text-center">
            Movne Platform – מערכת ייעוץ פיננסי
          </h1>
          <nav className="flex justify-center space-x-6 rtl:space-x-reverse">
            <NavLink exact to="/" 
              className="px-4 py-2 text-finance-100 hover:text-white transition-colors rounded-lg hover:bg-finance-400"
              activeClassName="bg-finance-400 text-white font-semibold">
              Dashboard
            </NavLink>
            <NavLink to="/crm"
              className="px-4 py-2 text-finance-100 hover:text-white transition-colors rounded-lg hover:bg-finance-400"
              activeClassName="bg-finance-400 text-white font-semibold">
              CRM
            </NavLink>
            <NavLink to="/client-ticket"
              className="px-4 py-2 text-finance-100 hover:text-white transition-colors rounded-lg hover:bg-finance-400"
              activeClassName="bg-finance-400 text-white font-semibold">
              תיק לקוח
            </NavLink>
            <NavLink to="/investment-file"
              className="px-4 py-2 text-finance-100 hover:text-white transition-colors rounded-lg hover:bg-finance-400"
              activeClassName="bg-finance-400 text-white font-semibold">
              תיק השקעות
            </NavLink>
          </nav>
        </header>
        <main className="pt-32 px-6 pb-6 max-w-7xl mx-auto">
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
