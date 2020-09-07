import axios from 'axios';

export const fetchAllProducts = () => axios.get<Product[]>(`/api/products`).then(res => res.data);

export const fetchCategories = () => axios.get<Category[]>(`/api/categories`).then(res => res.data);
