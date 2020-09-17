import axios from 'axios';
import { MongoProduct, MongoCategory } from './types';
import * as API from '../pg-server/types';

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

export const loginAdminUser = (credentials: { email: string; password: string }) =>
  axios
    .post<{ token: string; expiry: string }>(`/api/v2/users/login`, credentials)
    .then(res => res.data);

export const fetchAllProducts = () =>
  axios.get<MongoProduct[]>(`/api/products`).then(res => res.data);

export const fetchProductById = (productId: string) =>
  axios.get<MongoProduct[]>(`/api/products?_id=${productId}`).then(res => res.data[0]);

export const createProduct = (product: Omit<MongoProduct, '_id'>) =>
  axios.post(`/api/products`, product, { headers: getAuthHeaders() });

export const editProduct = (product: MongoProduct) =>
  axios.put(`/api/products/${product._id}`, product, {
    headers: getAuthHeaders(),
  });

export const deleteProduct = (productId: string) =>
  axios.delete(`/api/products/${productId}`, { headers: getAuthHeaders() });

export const fetchCategories = () =>
  axios.get<MongoCategory[]>(`/api/categories`).then(res => res.data);

export const fetchCategoryById = (categoryId: string) =>
  axios.get<MongoCategory[]>(`/api/categories?_id=${categoryId}`).then(res => res.data[0]);

export const editCategory = (category: MongoCategory) =>
  axios.put(`/api/categories/${category._id}`, category, {
    headers: getAuthHeaders(),
  });

export const createCategory = (category: MongoCategory) =>
  axios.post(`/api/categories`, category, {
    headers: getAuthHeaders(),
  });

export const deleteCategory = (categoryId: string) =>
  axios.delete(`/api/categories/${categoryId}`, { headers: getAuthHeaders() });

export const fetchMessages = () =>
  axios.get<API.Message[]>(`/api/v2/messages`).then(res => res.data);

export const toggleMessageVisibility = (messageId: string) =>
  axios.put(`/api/v2/messages/${messageId}/answer`, {}, { headers: getAuthHeaders() });

export const createMessage = (text: string[]) =>
  axios
    .post<{ id: string }>('/api/v2/messages', { text })
    .then(res => res.data);

export const editMessage = (messageId: string, text: string[]) =>
  axios.put(`/api/v2/messages/${messageId}`, { text });

export const deleteMessage = (messageId: string) =>
  axios.delete(`/api/v2/messages/${messageId}`, { headers: getAuthHeaders() });

export const uploadFile = (formData: FormData) =>
  axios.post(`/api/files/upload-file`, formData, {
    headers: { 'Content-Type': 'multipart/form-data', ...getAuthHeaders() },
  });

export const deleteFiles = (imageNames: string[]) =>
  axios.post('/api/files/delete-file', { images: imageNames }, { headers: getAuthHeaders() });
