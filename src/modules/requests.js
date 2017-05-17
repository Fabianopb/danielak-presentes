import axios from 'axios';

class Request {

  constructor() {
    this.baseUrl = process.env.API_URL || 'http://localhost:9000';
  }

  getTest() {
    return axios.get(`${this.baseUrl}/api`);
  }

}

export default Request = new Request();
