import axios from 'axios';
import * as API from '../pg-server/types';
import { getAuthHeaders } from './modules/helpers';

export type ApiProductPayload = API.ProductPayload;

export const loginAdminUser = (credentials: { email: string; password: string }) =>
  axios.post<{ token: string; expiry: string }>(`/api/v2/users/login`, credentials).then((res) => res.data);

export const fetchAllProducts = () => axios.get<API.Product[]>(`/api/v2/products`).then((res) => res.data);

export const fetchProductById = (productId: string) =>
  axios.get<API.Product>(`/api/v2/products/${productId}`).then((res) => res.data);

export const createProduct = (product: API.ProductPayload) =>
  axios.post(`/api/v2/products`, product, { headers: getAuthHeaders() });

export const editProduct = (id: string, product: API.ProductPayload) =>
  axios.put(`/api/v2/products/${id}`, product, {
    headers: getAuthHeaders(),
  });

export const deleteProduct = (productId: string) =>
  axios.delete(`/api/v2/products/${productId}`, { headers: getAuthHeaders() });

export const fetchCategories = () => axios.get<API.Category[]>(`/api/v2/categories`).then((res) => res.data);

export const fetchCategoryById = (categoryId: string) =>
  axios.get<API.Category>(`/api/v2/categories/${categoryId}`).then((res) => res.data);

export const editCategory = (id: string, category: API.CategoryPayload) =>
  axios.put(`/api/v2/categories/${id}`, category, {
    headers: getAuthHeaders(),
  });

export const createCategory = (category: API.CategoryPayload) =>
  axios.post(`/api/v2/categories`, category, {
    headers: getAuthHeaders(),
  });

export const deleteCategory = (categoryId: string) =>
  axios.delete(`/api/v2/categories/${categoryId}`, { headers: getAuthHeaders() });

export const fetchMessages = () => axios.get<API.Message[]>(`/api/v2/messages`).then((res) => res.data);

export const toggleMessageVisibility = (messageId: string) =>
  axios.put(`/api/v2/messages/${messageId}/answer`, {}, { headers: getAuthHeaders() });

export const createMessage = (text: string[]) =>
  axios.post<{ id: string }>('/api/v2/messages', { text }).then((res) => res.data);

export const editMessage = (messageId: string, text: string[]) => axios.put(`/api/v2/messages/${messageId}`, { text });

export const deleteMessage = (messageId: string) =>
  axios.delete(`/api/v2/messages/${messageId}`, { headers: getAuthHeaders() });

export const uploadFile = (formData: FormData) =>
  axios.post(`/api/v2/files/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data', ...getAuthHeaders() },
  });

export const deleteFiles = (imageNames: string[]) =>
  axios.post('/api/v2/files/delete', { images: imageNames }, { headers: getAuthHeaders() });
