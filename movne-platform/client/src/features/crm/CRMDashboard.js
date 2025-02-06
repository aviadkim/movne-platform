import React, { useState } from 'react';
import ClientTable from './components/ClientTable';
import ClientQuickView from './components/ClientQuickView';
import AddClientForm from './components/AddClientForm';

const CRMDashboard = () => {
  const [clients, setClients] = useState([
    {
      id: '1',
      name: 'ישראל ישראלי',
      phone: '050-1234567',
      email: 'israel@example.com',
      status: 'פעיל'
    },
    {
      id: '2',
      name: 'חיים כהן',
      phone: '052-7654321',
      email: 'haim@example.com',
      status: 'לא פעיל'
    }
  ]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddClient = (newClient) => {
    setClients([...clients, newClient]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">ניהול לקוחות</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-finance-300 text-white rounded-md hover:bg-finance-400"
        >
          הוסף לקוח חדש
        </button>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">הוספת לקוח חדש</h2>
            <AddClientForm
              onAdd={handleAddClient}
              onClose={() => setShowAddForm(false)}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ClientTable clients={clients} onClientSelect={setSelectedClient} />
        </div>
        <div>
          {selectedClient && <ClientQuickView client={selectedClient} />}
        </div>
      </div>
    </div>
  );
};

export default CRMDashboard;
