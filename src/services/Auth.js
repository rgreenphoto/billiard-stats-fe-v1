import axios from 'axios';

export default {
  async register(data) {
    try {
      const response = await axios.post('/auth/signup', data);
      return response.data;
    }
    catch (error) {
      return await Promise.reject(error.response);
    }
  },
  async login(data) {
    try {
      const response = await axios.post('/auth/signin', data);
      return response.data;
    }
    catch (error) {
      return await Promise.reject(error.response);
    }
  },
  async authenticate(token) {
    try {
      const response = await axios.get('/auth/authenticate', token);
      return response.data;
    }
    catch (error) {
      return await Promise.reject(error.response);
    }
  },
  async refresh(token) {
    try {
      const response = await axios.post('/refreshToken', { token });
      return response.data;
    }
    catch (error) {
      return await Promise.reject(error.response);
    }
  },
};
