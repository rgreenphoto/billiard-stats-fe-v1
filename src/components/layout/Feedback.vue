<template>
  <div v-if="feedback.message">
    <v-snackbar
      v-model="feedback"
      :color="feedbackClass"
    >
      {{ feedback.message }}
    </v-snackbar>
  </div>
</template>

<script>

import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'Feedback',
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      feedback: 'feedback/feedback',
      feedbackClass: 'feedback/feedbackClass',
    }),
  },
  methods: {
    ...mapActions({
      feedback: 'feedback/feedback',
      setFeedback: 'feedback/setFeedback',
      clearFeedback: 'feedback/clearFeedback',
    }),
    ...mapMutations(['setFeedback']),
  },
  watch: {
    $route() {
      this.clearFeedback();
    },
  },
};
</script>

<style scoped>

</style>
