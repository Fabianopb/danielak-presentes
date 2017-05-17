import axios from 'axios';

class Request {

  constructor() {
    // this.baseUrl = 'https://danielak.herokuapp.com';
    this.baseUrl = 'http://localhost:9000';
  }

  getTest() {
    return axios.get(`${this.baseUrl}/api`);
  }

}

export default Request = new Request();
