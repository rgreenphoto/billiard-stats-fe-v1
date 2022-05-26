import axios from 'axios';

export default {
  async getUserMatches() {
    try {
      const response = await axios.get('user-matches/all');
      return response.data;
    }
    catch (error) {
        return await Promise.reject(error.response);
    }
  },
  async addUserMatch(data) {
    try {
      const response = await axios.post('user-matches/add', data);
      return response.data;
    }
    catch (error) {
      return await Promise.reject(error.response);
    }
  },
  async updateUserMatch(data) {
    try {
      const response = await axios.put('user-matches', data);
      return response.data;
    }
    catch (error) {
      return await Promise.reject(error.response);
    }
  },
  async deleteUserMatch(data) {
    try {
      const response = await axios.delete('user-matches/'+data.id);
      return response.data;
    }
    catch (error) {
      return await Promise.reject(error.response);
    }
  },
};