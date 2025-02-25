import api from './api';

// Get all structured products
export const getStructuredProducts = async (params = {}) => {
  const response = await api.get('/structured-products', { params });
  return response.data;
};

// Get product by ID
export const getStructuredProductById = async (id) => {
  const response = await api.get(`/structured-products/${id}`);
  return response.data;
};

// Create a new product
export const createStructuredProduct = async (productData) => {
  const response = await api.post('/structured-products', productData);
  return response.data;
};

// Update a product
export const updateStructuredProduct = async (id, productData) => {
  const response = await api.put(`/structured-products/${id}`, productData);
  return response.data;
};

// Delete a product
export const deleteStructuredProduct = async (id) => {
  const response = await api.delete(`/structured-products/${id}`);
  return response.data;
};

// Upload document for a product
export const uploadProductDocument = async (id, documentFile, documentType, documentName) => {
  const formData = new FormData();
  formData.append('document', documentFile);
  formData.append('documentType', documentType);
  
  if (documentName) {
    formData.append('documentName', documentName);
  }
  
  const response = await api.post(`/structured-products/${id}/documents`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

// Compare products
export const compareProducts = async (productIds, clientRiskProfile) => {
  const response = await api.post('/analytics/compare', {
    productIds,
    clientRiskProfile
  });
  
  return response.data;
};

// Get scenario analysis
export const getScenarioAnalysis = async (productId) => {
  const response = await api.get(`/analytics/scenario/${productId}`);
  return response.data;
};

// Get suitable products for a client
export const getSuitableProducts = async (params) => {
  const response = await api.post('/analytics/suitable-products', params);
  return response.data;
};

export default {
  getStructuredProducts,
  getStructuredProductById,
  createStructuredProduct,
  updateStructuredProduct,
  deleteStructuredProduct,
  uploadProductDocument,
  compareProducts,
  getScenarioAnalysis,
  getSuitableProducts
};
