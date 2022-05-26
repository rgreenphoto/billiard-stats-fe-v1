import axios from 'axios';

export default {
  async getRackTypes() {
    try {
      const response = await axios.get('rack-types/all');
      return response.data;
    }
    catch (error) {
        return await Promise.reject(error.response);
    }
  },
};