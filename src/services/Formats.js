import axios from 'axios';

export default {
  async getFormat(data) {
    try {
      const response = await axios.get('formats/'+data);
      return response.data;
    }
    catch (error) {
      return await Promise.reject(error.response);
    }
  },
  async getFormats() {
    try {
      const response = await axios.get('formats/all');
      return response.data;
    }
    catch (error) {
      return await Promise.reject(error.response);
    }
  },
  async addFormat(data) {
    try {
      const response = await axios.post('formats', data);
      return response.data;
    }
    catch (error) {
      return await Promise.reject(error.response);
    }
  },
};
