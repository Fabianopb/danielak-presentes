import axios from 'axios';

export const fetchAllProducts = () => axios.get<Product[]>(`/api/products`).then(res => res.data);

export const fetchProductById = (productId: string) =>
  axios.get<Product[]>(`/api/products?_id=${productId}`).then(res => res.data[0]);

export const fetchCategories = () => axios.get<Category[]>(`/api/categories`).then(res => res.data);
