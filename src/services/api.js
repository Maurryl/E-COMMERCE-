import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const fetchProducts = () => api.get('/products');
export const addProduct = (product) => api.post('/product', product);
export const createOrder = (order) => api.post('/order', order);

export default api;
