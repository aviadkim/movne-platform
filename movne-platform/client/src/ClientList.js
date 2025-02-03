// client/src/ClientList.js
import React from 'react';

function ClientList({ clients }) {
  return (
    <div className="client-list">
      <h3 className="text-lg font-medium mb-4">רשימת לקוחות</h3>
      {clients.length > 0 ? (
        <ul>
          {clients.map((client, index) => (
            <li key={index} className="client-item">
              {client.name} - {client.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>לא נמצאו לקוחות</p>
      )}
    </div>
  );
}

export default ClientList;
