import axios from 'axios';

export default {
  async getTableTypes() {
    try {
      const response = await axios.get('table-types/all');
      return response.data;
    }
    catch (error) {
        return await Promise.reject(error.response);
    }
  },
};