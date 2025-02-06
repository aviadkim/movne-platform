import { useState, useCallback } from 'react';

// Mock data - replace with actual API calls
const mockClients = [
  {
    id: '001',
    name: 'ישראל ישראלי',
    phone: '050-1234567',
    email: 'israel@example.com',
    status: 'active',
    address: 'רחוב הרצל 1, תל אביב',
    joinDate: '2024-01-01',
    meetings: [
      {
        id: 'm1',
        type: 'פגישת היכרות',
        date: '2024-01-15',
        notes: 'פגישה ראשונית להכרות ובירור צרכים'
      }
    ],
    documents: [
      {
        id: 'd1',
        name: 'טופס הצטרפות',
        type: 'pdf'
      }
    ]
  }
];

export const useClientsData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    try {
      // Replace with actual API call
      return mockClients;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchClients, loading, error };
};

export const useClientDetails = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchClientDetails = useCallback(async (clientId) => {
    setLoading(true);
    try {
      // Replace with actual API call
      return mockClients.find(c => c.id === clientId);
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchClientDetails, loading, error };
};
