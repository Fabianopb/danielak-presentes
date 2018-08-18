import axios, { AxiosPromise } from "axios";

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`
});

export const userRequests = {
  /**
   * Login user
   * @param {LoginRequestParams} credentials user credentials
   * @returns {AxiosPromise<LoginRequestResponse>}
   */
  login: (credentials: LoginRequestParams): AxiosPromise<LoginRequestResponse> => {
    return axios.post(`/api/users/login`, credentials);
  }
};

export const categoryRequests = {
  getCategoryById: (id: string) => {
    return axios.get(`/api/categories?_id=${id}`);
  },
  getCategories: () => {
    return axios.get(`/api/categories`);
  },
  putCategory: (category: Category) => {
    return axios.put(`/api/categories/${category._id}`, category, { headers: getAuthHeaders() })
  },
  postCategory: (category: Category) => {
    return axios.post(`/api/categories`, category, { headers: getAuthHeaders() });
  },
  deleteCategory: (id: string) => {
    return axios.delete(`/api/categories/${id}`, { headers: getAuthHeaders() });
  },
};

export const productRequests = {
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
   * Get products by category
   * @param {string} categoryId category id
   * @returns {AxiosPromise<any>}
   */
  getProductsByCategory: (categoryId: string): AxiosPromise<any> => {
    return axios.get(`/api/products${categoryId ? `?category=${categoryId}` : ''}`);
  },
  /**
   * Post product
   * @param {any} product product object
   * @param {string} id product id
   * @returns {AxiosPromise<any>}
   */
  postProduct: (product: Product): AxiosPromise<any> => {
    return axios.post(`/api/products`, product, { headers: getAuthHeaders() });
  },
  /**
   * Put product
   * @param {any} product product object
   * @param {string} id product id
   * @returns {AxiosPromise<any>}
   */
  putProduct: (product: Product): AxiosPromise<any> => {
    return axios.put(`/api/products/${product._id}`, product, { headers: getAuthHeaders() });
  },
  /**
   * Delete product
   * @param {any} product product object
   * @param {string} id product id
   * @returns {AxiosPromise<any>}
   */
  deleteProduct: (id: string): AxiosPromise<any> => {
    return axios.delete(`/api/products/${id}`, { headers: getAuthHeaders() });
  }
};

export const fileRequests = {
  uploadFile: (formData: FormData) => {
    return axios.post(`/api/files/upload-file`, formData, {
      headers: { 'Content-Type': 'multipart/form-data', ...getAuthHeaders() }
    });
  },
  deleteFiles: (imageNames: string[]) => {
    return axios.post('/api/files/delete-file', { images: imageNames }, { headers: getAuthHeaders() })
  }
};
