import React from 'react';

const ClientQuickView = ({ client }) => {
  if (!client) return null;

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">{client.name}</h3>
      <div className="space-y-2">
        <div>
          <label className="text-sm text-gray-500">טלפון</label>
          <p>{client.phone}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">אימייל</label>
          <p>{client.email}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">סטטוס</label>
          <p>{client.status}</p>
        </div>
      </div>
    </div>
  );
};

export default ClientQuickView;
