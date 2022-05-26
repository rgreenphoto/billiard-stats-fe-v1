<template>
  <v-card
    height="400"
    max-height="400"
    width="800"
    max-width="800"
  >
    <bar-chart />
  </v-card>  
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import BarChart from '@/components/charts/BarChart';
import store from '@/store/index';


export default {
  name: 'AdvancedCharts',
  components: {
      BarChart,
  },
  methods: {
    ...mapActions({
      feedback: 'feedback/feedback',
      setFeedback: 'feedback/setFeedback',
    }),
  },
  computed: {
    ...mapGetters({
      currentUser: 'auth/user',
      user_matches: 'userMatches/user_matches'
    }),
  },
  created() {
    store.dispatch('userMatches/getUserMatches');
  },
};
</script>

<style scoped>
</style>
