import axios from 'axios';

class Request {

  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:9000';
  }

  getAllProducts() {
    return axios.get(`${this.baseUrl}/api/products`);
  }

  getProductById(product_id) {
    return axios.get(`${this.baseUrl}/api/products?_id=${product_id}`);
  }

  postProduct(product) {
    return axios.post(`${this.baseUrl}/api/products`, product);
  }

}

export default Request = new Request();
