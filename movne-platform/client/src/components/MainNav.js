import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const MainNav = () => {
  const location = useLocation();
  const history = useHistory();

  const links = [
    { to: '/', text: 'דשבורד' },
    { to: '/crm', text: 'ניהול לקוחות' },
    { to: '/client-file', text: 'תיק לקוח' },
    { to: '/portfolio', text: 'תיק השקעות' }
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16">
          <div className="flex space-x-8">
            {links.map(link => (
              <button 
                key={link.to}
                onClick={() => history.push(link.to)}
                className={`inline-flex items-center px-4 py-2 text-sm font-medium
                  ${location.pathname === link.to 
                    ? 'text-finance-300 border-b-2 border-finance-300' 
                    : 'text-gray-500 hover:text-gray-700'}`}
              >
                {link.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
