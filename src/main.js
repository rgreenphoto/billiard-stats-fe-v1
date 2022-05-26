/*eslint no-unused-vars: "error"*/
import Vue from 'vue'
import './plugins/axios'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios';

import {
  onSuccess, onError, beforeRequestSuccess, beforeRequestError,
} from './interceptors/Jwt';

axios.interceptors.request.use(beforeRequestSuccess, beforeRequestError);
axios.interceptors.response.use(onSuccess, onError);
axios.defaults.baseURL = 'http://localhost:8085';
//axios.defaults.baseURL = 'http://192.168.10.10/api/';

Vue.use(Vuelidate);
Vue.config.productionTip = false
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
