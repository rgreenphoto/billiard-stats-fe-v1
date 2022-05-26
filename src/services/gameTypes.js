import axios from 'axios';

export default {
  async getGameType(data) {
    try {
      const response = await axios.get('game-types/'+data);
      return response.data;
    }
    catch (error) {
      return await Promise.reject(error.response);
    }
  },
  async getGameTypes() {
    try {
      const response = await axios.get('game-types/all');
      return response.data;
    }
    catch (error) {
        return await Promise.reject(error.response);
    }
  },
};