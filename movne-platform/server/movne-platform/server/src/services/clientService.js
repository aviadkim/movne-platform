import api from './api';

// Get all clients
export const getClients = async () => {
  const response = await api.get('/clients');
  return response.data;
};

// Get client by ID
export const getClientById = async (id) => {
  const response = await api.get(`/clients/${id}`);
  return response.data;
};

// Create a new client
export const createClient = async (clientData) => {
  const response = await api.post('/clients', clientData);
  return response.data;
};

// Update a client
export const updateClient = async (id, clientData) => {
  const response = await api.put(`/clients/${id}`, clientData);
  return response.data;
};

// Delete a client
export const deleteClient = async (id) => {
  const response = await api.delete(`/clients/${id}`);
  return response.data;
};

export default {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
};
