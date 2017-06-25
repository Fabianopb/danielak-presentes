import axios from 'axios';

let Request = class Request {
  getAllProducts () {
    return axios.get(`/api/products`);
  }

  getProductById (productId) {
    return axios.get(`/api/products?_id=${productId}`);
  }

  postProduct (product) {
    return axios.post(`/api/products`, product);
  }

  putProduct (product, id) {
    return axios.put(`/api/products/${id}`, product);
  }

  deleteProduct (product, id) {
    return axios.delete(`/api/products/${id}`, product);
  }
};

export default Request = new Request();
