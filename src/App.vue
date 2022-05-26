<template>
  <v-app>
    <v-main 
      transition="slide-x-transition"
    >
      <v-container 
        fluid
      >        
        <router-view />        
      </v-container>
    </v-main>
    <v-footer app>
      <feedback />
      <v-bottom-navigation
        v-if="currentUser"
        :value="activeBtn"
        grow
        color="green"
      >
        <v-btn to="/">
          <span>Home</span>
          <v-icon>mdi-hot-tub</v-icon>
        </v-btn>
        <v-btn to="/add-match">
          <span>Start Match</span>
          <v-icon>mdi-drama-masks</v-icon>
        </v-btn>
        <v-btn to="/view-matches">
          <span>Your Matches</span>
          <v-icon>mdi-fire</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import Feedback from '@/components/layout/Feedback';

export default {
  name: 'App',
  components: {
    Feedback,
  },
  data() {
    return {
      activeBtn: 0
    };
  },
  computed: {
    ...mapGetters({
      loggedin: 'auth/loggedin',
      currentUser: 'auth/user',
      activeMatch: 'matches/activeMatch'
    }),
  },
  methods: {
  },
};
</script>

<style lang="scss">
</style>