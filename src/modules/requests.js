import axios from 'axios';

let Request = class Request {
  constructor () {
    this.baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:9000';
  }

  getAllProducts () {
    return axios.get(`${this.baseUrl}/api/products`);
  }

  getProductById (productId) {
    return axios.get(`${this.baseUrl}/api/products?_id=${productId}`);
  }

  postProduct (product) {
    return axios.post(`${this.baseUrl}/api/products`, product);
  }

  putProduct (product, id) {
    return axios.put(`${this.baseUrl}/api/products/${id}`, product);
  }
};

export default Request = new Request();
