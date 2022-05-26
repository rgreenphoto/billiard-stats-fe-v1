import axios from 'axios';

export default {
  async getMatches() {
    try {
      const response = await axios.get('matches/all');
      return response.data;
    }
    catch (error) {
        return await Promise.reject(error.response);
    }
  },
  async addMatch(data) {
    try {
      const response = await axios.post('matches/add', data);
      return response.data;
    }
    catch (error) {
      return await Promise.reject(error.response);
    }
  },
  async updateMatch(data) {
    try {
      const response = await axios.put('matches', data);
      return response.data;
    }
    catch (error) {
      return await Promise.reject(error.response);
    }
  },
  async deleteMatch(data) {
    try {
      const response = await axios.delete('matches/'+data.id);
      return response.data;
    }
    catch (error) {
      return await Promise.reject(error.response);
    }
  }
};