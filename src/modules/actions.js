import axios from 'axios';

export const RECEIVE_PRODUCTS = () => ({type: 'RECEIVE_PRODUCTS'});

function receiveProducts (response) {
  return {
    type: RECEIVE_PRODUCTS,
    data: response.data,
    receivedAt: Date.now()
  };
}

export function fetchProducts () {
  return (dispatch) => {
    return axios.get(`/api/products`)
      .then(response => dispatch(receiveProducts(response)));
  };
}
