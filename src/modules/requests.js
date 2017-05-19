import axios from 'axios';

class Request {

  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:9000';
  }

  getProducts() {
    return axios.get(`${this.baseUrl}/api/products`);
  }

  postProduct(product) {
    return axios.post(`${this.baseUrl}/api/products`, product, this.getHeaders());
  }

}

export default Request = new Request();
