import axios from 'axios';

export default {
  async getUsers() {
    try {
      const response = await axios.get('users/all');
      return response.data;
    }
    catch (error) {
        return await Promise.reject(error.response);
    }
  },
};
