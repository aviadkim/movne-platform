import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-4">
            <Link 
              to="/"
              className={`inline-flex items-center px-3 py-2 text-sm font-medium
                ${location.pathname === '/' ? 'text-finance-300' : 'text-gray-500'}`}
            >
              דשבורד
            </Link>
            <Link 
              to="/crm"
              className={`inline-flex items-center px-3 py-2 text-sm font-medium
                ${location.pathname === '/crm' ? 'text-finance-300' : 'text-gray-500'}`}
            >
              ניהול לקוחות
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
