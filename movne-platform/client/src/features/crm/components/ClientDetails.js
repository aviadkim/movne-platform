import React, { useState, useEffect } from 'react';
import { useClientDetails } from '../services/clientService';

const ClientDetails = ({ clientId }) => {
  const [client, setClient] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  const { fetchClientDetails } = useClientDetails();

  useEffect(() => {
    const loadClient = async () => {
      const data = await fetchClientDetails(clientId);
      setClient(data);
    };
    loadClient();
  }, [clientId, fetchClientDetails]);

  if (!client) return <div>טוען...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-finance-300">{client.name}</h2>
        <span className={`px-3 py-1 rounded-full text-sm
          ${client.status === 'active' ? 'bg-green-100 text-green-800' : 
            'bg-red-100 text-red-800'}`}>
          {client.status}
        </span>
      </div>

      <div className="flex gap-4 border-b mb-4">
        <button
          className={`px-4 py-2 ${activeTab === 'info' ? 'border-b-2 border-finance-300' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          מידע כללי
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'meetings' ? 'border-b-2 border-finance-300' : ''}`}
          onClick={() => setActiveTab('meetings')}
        >
          פגישות
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'documents' ? 'border-b-2 border-finance-300' : ''}`}
          onClick={() => setActiveTab('documents')}
        >
          מסמכים
        </button>
      </div>

      {activeTab === 'info' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500">טלפון</label>
            <p className="font-medium">{client.phone}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">אימייל</label>
            <p className="font-medium">{client.email}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">כתובת</label>
            <p className="font-medium">{client.address}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">תאריך הצטרפות</label>
            <p className="font-medium">{new Date(client.joinDate).toLocaleDateString()}</p>
          </div>
        </div>
      )}

      {activeTab === 'meetings' && (
        <div className="space-y-4">
          {client.meetings?.map(meeting => (
            <div key={meeting.id} className="border rounded p-4">
              <div className="flex justify-between">
                <span className="font-medium">{meeting.type}</span>
                <span>{new Date(meeting.date).toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-600">{meeting.notes}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="grid grid-cols-2 gap-4">
          {client.documents?.map(doc => (
            <div key={doc.id} className="border rounded p-4 flex justify-between items-center">
              <span>{doc.name}</span>
              <button className="text-finance-300 hover:text-finance-400">
                הורד
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientDetails;
