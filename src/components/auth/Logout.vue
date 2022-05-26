<template>
  <div />
</template>

<script>

import { mapActions } from 'vuex';
// import store from '../../store/store';
import store from '@/store/index';
import router from '@/router';

export default {
  name: 'Logout',
  beforeRouteEnter(to, from, next) {
    store.dispatch('auth/logout')
      .then(next)
      .then(() => router.push({ path: '/' }))
      .catch(error => store.dispatch('feedback/setFeedback', { message: error.data, type: 'warning' }));
  },
  data() {
    return {
    };
  },

  methods: {
    ...mapActions({
      setFeedback: 'feedback/setFeedback',
      setDelayedFeedback: 'feedback/setDelayedFeedback',
      logout: 'auth/logout',
    }),
  },
};
</script>

<style scoped>

</style>
