import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Authors API
export const authorsApi = {
  getAll: () => apiClient.get('/authors'),
  getById: (id: string) => apiClient.get(`/authors/${id}`),
  create: (data: any) => apiClient.post('/authors', data),
  update: (id: string, data: any) => apiClient.put(`/authors/${id}`, data),
  delete: (id: string) => apiClient.delete(`/authors/${id}`),
};

// Categories API
export const categoriesApi = {
  getAll: () => apiClient.get('/categories'),
  getById: (id: string) => apiClient.get(`/categories/${id}`),
  create: (data: any) => apiClient.post('/categories', data),
  update: (id: string, data: any) => apiClient.put(`/categories/${id}`, data),
  delete: (id: string) => apiClient.delete(`/categories/${id}`),
};

// Books API
export const booksApi = {
  getAll: (params?: any) => apiClient.get('/books', { params }),
  getById: (id: string) => apiClient.get(`/books/${id}`),
  create: (data: any) => apiClient.post('/books', data),
  update: (id: string, data: any) => apiClient.put(`/books/${id}`, data),
  delete: (id: string) => apiClient.delete(`/books/${id}`),
};

// Bundles API
export const bundlesApi = {
  getAll: () => apiClient.get('/bundles'),
  getById: (id: string) => apiClient.get(`/bundles/${id}`),
  create: (data: any) => apiClient.post('/bundles', data),
  update: (id: string, data: any) => apiClient.put(`/bundles/${id}`, data),
  delete: (id: string) => apiClient.delete(`/bundles/${id}`),
};

export default apiClient;
