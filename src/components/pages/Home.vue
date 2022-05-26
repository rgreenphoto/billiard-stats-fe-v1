<template>
  <v-row>
    <v-col>
      <SparklineChart />
    </v-col>
  </v-row>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import store from '@/store/index';
import SparklineChart from '@/components/charts/SparklineChart';

export default {
  name: 'Home',
  components: {
    SparklineChart
  },
  methods: {
    ...mapActions({
      feedback: 'feedback/feedback',
      setFeedback: 'feedback/setFeedback',
      getData() {
        let error = '';
        store.dispatch('userMatches/getUserMatches')
          .catch(error = store.dispatch('feedback/setFeedback', { message: error.data, type: 'warning' }));
      }
    }),
  },
  computed: {
    ...mapGetters({
      currentUser: 'auth/user',
      user_matches: 'userMatches/user_matches'
    }),
  },
  created() {
    this.getData();
  },
};
</script>

<style scoped>
</style>
