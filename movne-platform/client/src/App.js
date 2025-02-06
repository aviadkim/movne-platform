import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainNav from './components/MainNav';
import Dashboard from './Dashboard';
import CRMDashboard from './features/crm/CRMDashboard';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <MainNav />
        <div className="container mx-auto px-4 py-8">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/crm" component={CRMDashboard} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
