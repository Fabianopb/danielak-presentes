import axios from 'axios';

export const fetchAllProducts = () => axios.get<Product[]>(`/api/products`).then(res => res.data);
