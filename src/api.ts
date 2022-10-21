import axios from 'axios';
import * as API from '../server/types';
import { getAuthHeaders } from './modules/helpers';

export type ApiProductPayload = API.ProductPayload;

export const loginAdminUser = (credentials: { username: string; password: string }) =>
  axios.post<{ token: string }>(`/api/v3/users/login`, credentials).then((res) => res.data);

export const fetchAllProducts = () => axios.get<API.Product[]>(`/api/v3/products`).then((res) => res.data);

export const fetchProductById = (productId: string) =>
  axios.get<API.Product>(`/api/v3/products/${productId}`).then((res) => res.data);

export const createProduct = (product: API.ProductPayload) =>
  axios.post(`/api/v3/products`, product, { headers: getAuthHeaders() });

export const editProduct = (id: string, product: API.ProductPayload) =>
  axios.put(`/api/v3/products/${id}`, product, {
    headers: getAuthHeaders(),
  });

export const deleteProduct = (productId: string) =>
  axios.delete(`/api/v3/products/${productId}`, { headers: getAuthHeaders() });

export const fetchCategories = () => axios.get<API.Category[]>(`/api/v3/categories`).then((res) => res.data);

export const fetchCategoryById = (categoryId: string) =>
  axios.get<API.Category>(`/api/v3/categories/${categoryId}`).then((res) => res.data);

export const editCategory = (id: string, category: API.CategoryPayload) =>
  axios.put(`/api/v3/categories/${id}`, category, {
    headers: getAuthHeaders(),
  });

export const createCategory = (category: API.CategoryPayload) =>
  axios.post(`/api/v3/categories`, category, {
    headers: getAuthHeaders(),
  });

export const deleteCategory = (categoryId: string) =>
  axios.delete(`/api/v3/categories/${categoryId}`, { headers: getAuthHeaders() });

export const fetchMessages = () => axios.get<API.Message[]>(`/api/v3/messages`).then((res) => res.data);

export const toggleMessageVisibility = (messageId: string) =>
  axios.put(`/api/v3/messages/${messageId}/answer`, {}, { headers: getAuthHeaders() });

export const createMessage = (text: string[]) =>
  axios.post<{ id: string }>('/api/v3/messages', { text }).then((res) => res.data);

export const editMessage = (messageId: string, text: string[]) => axios.put(`/api/v3/messages/${messageId}`, { text });

export const deleteMessage = (messageId: string) =>
  axios.delete(`/api/v3/messages/${messageId}`, { headers: getAuthHeaders() });

export const uploadFile = (formData: FormData) =>
  axios.post(`/api/v2/files/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data', ...getAuthHeaders() },
  });

export const deleteFiles = (imageNames: string[]) =>
  axios.post('/api/v2/files/delete', { images: imageNames }, { headers: getAuthHeaders() });
