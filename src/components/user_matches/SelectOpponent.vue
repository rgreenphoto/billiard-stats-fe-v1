<template>
  <v-sheet
    class="mt-4 mx-auto"
    max-width="400"
  >
    <v-banner
      color="green"
      elevation="10"
      rounded
    >
      Select Opponent
    </v-banner>
    <v-card>
      <v-card-actions>
        <v-card-text>
          You can choose to play a ghost player if the person you're playing doesn't use this app. 
        </v-card-text>  
        <v-btn
          color="success"
          @click="setGhost"
        >
          Select
          <v-icon right>
            mdi-ghost
          </v-icon>
        </v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-card-text>
          If you're playing someone that also uses this app, search for them by name. They will not need to enter this match, only one member should record the match.
        </v-card-text>
      </v-card-actions>
      <v-card-actions>
        <v-autocomplete
          v-model="selectedUser"
          :items="users"
          :item-text="item => item.firstName +' '+item.lastName"
          item-value="id"
          label="Search Members"
          placeholder="Start typing to Search"
          prepend-icon="mdi-database-search"
          return-object
        />
      </v-card-actions>
      <v-card-actions>
        <v-spacer />  
        <v-btn
          color="success"
          to="/add-user-match"
        >
          Enter Data
          <v-icon right>
            mdi-emoticon-wink
          </v-icon>
        </v-btn>
      </v-card-actions> 
    </v-card>
  </v-sheet>
</template>
<script>

import { mapGetters, mapActions } from 'vuex';
import store from '@/store/index';

export default {
  name: 'SelectOpponent',
  data() {
    return {
        selectedUser: '',
    };
  },
  computed: {
    ...mapGetters({
      currentUser: 'auth/user',
      activeMatch: 'matches/activeMatch',
      users: 'users/users',
    }),
  },
  methods: {
    ...mapActions({
      feedback: 'feedback/feedback',
      setFeedback: 'feedback/setFeedback',
      setActiveScoreCard: 'userMatches/setActiveScoreCard',
      updateMatch: 'matches/updateMatch',
      setGhost() {
          this.selectedUser = {
              id: 1,
              full_name: 'Casper'
          };
      },
    }),
  },
  watch: {
    selectedUser: function() {
      let scoreCard = {
        user_id: this.selectedUser.id,
        match_id: this.activeMatch.id,
        full_name: this.selectedUser.full_name,
        opponent: true,
      }
      this.setActiveScoreCard(scoreCard);
      this.activeMatch.opponent_id = this.selectedUser.id;
      this.updateMatch(this.activeMatch);
    }
  },
  mounted() { 

  },
  created() {
    store.dispatch('users/getUsers');
  },
};
</script>

<style scoped>
</style>