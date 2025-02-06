import React, { useState, useEffect } from 'react';
import { useClientsData } from '../services/clientService';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { fetchClients } = useClientsData();

  useEffect(() => {
    const loadClients = async () => {
      const data = await fetchClients();
      setClients(data);
    };
    loadClients();
  }, [fetchClients]);

  const filteredClients = clients.filter(client => 
    client.name.includes(searchTerm) || 
    client.id.includes(searchTerm)
  );

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold text-finance-300">רשימת לקוחות</h2>
        <input
          type="search"
          placeholder="חיפוש לקוח..."
          className="px-4 py-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          dir="rtl"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">מזהה</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">שם</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">טלפון</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">אימייל</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">סטטוס</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">פעולות</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredClients.map(client => (
              <tr key={client.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{client.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{client.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{client.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{client.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs
                    ${client.status === 'active' ? 'bg-green-100 text-green-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {client.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-finance-300 hover:text-finance-400">
                    צפה בפרטים
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

export default ClientList;
