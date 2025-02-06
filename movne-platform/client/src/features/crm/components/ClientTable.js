import React from 'react';

const ClientTable = ({ clients, onClientSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">רשימת לקוחות</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">שם</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">טלפון</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">אימייל</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">סטטוס</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">פעולות</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clients.map(client => (
              <tr key={client.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button 
                    onClick={() => onClientSelect(client)}
                    className="text-finance-300 hover:text-finance-400"
                  >
                    הצג פרטים
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientTable;
