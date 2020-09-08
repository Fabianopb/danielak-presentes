import axios from 'axios';

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

export const loginAdminUser = (credentials: { email: string; password: string }) =>
  axios
    .post<{ token: string; expiry: string }>(`/api/users/login`, credentials)
    .then(res => res.data);

export const fetchAllProducts = () => axios.get<Product[]>(`/api/products`).then(res => res.data);

export const fetchProductById = (productId: string) =>
  axios.get<Product[]>(`/api/products?_id=${productId}`).then(res => res.data[0]);

export const fetchCategories = () => axios.get<Category[]>(`/api/categories`).then(res => res.data);

export const fetchMessages = () => axios.get<Message[]>(`/api/messages`).then(res => res.data);

export const toggleMessageVisibility = (messageId: string) =>
  axios.put(`/api/messages/answer/${messageId}`, {}, { headers: getAuthHeaders() });

export const createMessage = (text: string[]) =>
  axios
    .post<{ id: string }>('/api/messages', { text })
    .then(res => res.data);

export const editMessage = (messageId: string, text: string[]) =>
  axios.put(`/api/messages/${messageId}`, { text });

export const deleteMessage = (messageId: string) =>
  axios.delete(`/api/messages/${messageId}`, { headers: getAuthHeaders() });
