import store from '@/store/index';

export default (to, from, next) => {
  if (store.state.auth.loggedin) {
    next('/');
  } else {
    next();
  }
};
