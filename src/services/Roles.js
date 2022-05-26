import axios from 'axios';

export default {
  getRoles() {
    return axios.get('roles')
      .then(response => response.data)
      .catch(error => Promise.reject(error.response));
  },
};
