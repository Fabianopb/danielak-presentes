import axios, { AxiosPromise } from "axios";

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`
});

const apiRequests = {
  /**
   * Get all products
   * @returns {AxiosPromise<any>}
   */
  getAllProducts: (): AxiosPromise<any> => {
    return axios.get(`/api/products`);
  },
  /**
   * Get product by id
   * @param {string} productId product id
   * @returns {AxiosPromise<any>}
   */
  getProductById: (productId: string): AxiosPromise<any> => {
    return axios.get(`/api/products?_id=${productId}`);
  },
  /**
   * Post product
   * @param {any} product product object
   * @param {string} id product id
   * @returns {AxiosPromise<any>}
   */
  postProduct: (product: any): AxiosPromise<any> => {
    return axios.post(`/api/products`, product, { headers: getAuthHeaders() });
  },
  /**
   * Put product
   * @param {any} product product object
   * @param {string} id product id
   * @returns {AxiosPromise<any>}
   */
  putProduct: (product: any, id: string): AxiosPromise<any> => {
    return axios.put(`/api/products/${id}`, product, { headers: getAuthHeaders() });
  },
  /**
   * Delete product
   * @param {any} product product object
   * @param {string} id product id
   * @returns {AxiosPromise<any>}
   */
  deleteProductThunk: (id: string): AxiosPromise<any> => {
    return axios.delete(`/api/products/${id}`, { headers: getAuthHeaders() });
  }
};

export default apiRequests;
