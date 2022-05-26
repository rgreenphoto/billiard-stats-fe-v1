import axios from 'axios';

export default {
  async getVenue(data) {
    try {
      const response = await axios.get('venues/'+data);
      return response.data;
    }
    catch (error) {
      return await Promise.reject(error.response);
    }
  },
  async getVenues() {
    try {
      const response = await axios.get('venues/all');
      return response.data;
    }
    catch (error) {
        return await Promise.reject(error.response);
    }
  },
};