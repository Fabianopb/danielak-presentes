import axios from 'axios';

export const loginAdminUser = (credentials: { email: string; password: string }) =>
  axios
    .post<{ token: string; expiry: string }>(`/api/users/login`, credentials)
    .then(res => res.data);

export const fetchAllProducts = () => axios.get<Product[]>(`/api/products`).then(res => res.data);

export const fetchProductById = (productId: string) =>
  axios.get<Product[]>(`/api/products?_id=${productId}`).then(res => res.data[0]);

export const fetchCategories = () => axios.get<Category[]>(`/api/categories`).then(res => res.data);

export const createMessage = (text: string[]) =>
  axios
    .post<{ id: string }>('/api/messages', { text })
    .then(res => res.data);

export const editMessage = (id: string, text: string[]) =>
  axios.put(`/api/messages/${id}`, { text });
