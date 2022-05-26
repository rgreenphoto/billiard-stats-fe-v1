<template>
  <v-sheet
    class="mt-4 mx-auto"
    max-width="800"
  >
    <v-data-table
      class="elevation-10"
      dense
      show-expand
      single-expand
      item-key="id"
      :expanded.sync="expanded"
      :headers="headers"
      :items="matches"
      :items-per-page="10"
    >
      <template v-slot:top>
        <div class="text-right pa-2">
          <v-btn
            small
            elevation="10"
            right
            color="success"
            to="/add-match"
          >
            Add Match
            <v-icon right>
              mdi-duck
            </v-icon>
          </v-btn>
        </div>  
      </template>
      <template v-slot:item.opponent_id="{ item }">
        <span>{{ getUser(item.opponent_id) }}</span>
      </template>
      <template v-slot:item.created_at="{ item }">
        <span>{{ formatDate(item.created_at) }}</span>
      </template>
      <template v-slot:expanded-item="{ item }">
        <td :colspan="headers.length + 1">
          <v-sheet>
            <v-data-table
              class="elevation-10"
              dense
              hide-default-footer
              :headers="expandHeaders"
              :items="expandedData(item)"
              :items-per-page="2"
            />
          </v-sheet>
        </td>        
      </template>
    </v-data-table>  
  </v-sheet>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import store from '@/store/index';
import moment from 'moment';

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
        headers: [
            { text: 'Opponent', value: 'opponent_id' },
            { text: 'Format', value: 'format.name' },
            { text: 'Game', value: 'gameType.name' },
            { text: 'Venue', value: 'venue.name' },
            { text: 'Table Type', value: 'tableType.name' },
            { text: 'Date', value: 'created_at' }
        ],
        expandHeaders: [
          { text: 'Skill Level', value: 'format_skill_level' },
          { text: 'Fargo Rating', value: 'fargo_rating'},
          { text: 'Match Points', value: 'match_points' },
          { text: 'Match Score', value: 'match_score' },
          { text: 'Break & Runs', value: 'break_runs' },
          { text: 'Table Runs', value: 'table_runs' },
          { text: 'On the snap', value: 'on_snap' },
          { text: 'Rackless', value: 'rackless', },
          { text: 'Innings', value: 'innings' },
          { text: 'Home Team', value: 'home_team' },
          { text: 'Win', value: 'is_win' }
        ],
        expanded: []
    };
  },
  methods: {
    ...mapActions({
      feedback: 'feedback/feedback',
      setFeedback: 'feedback/setFeedback',
    }),
    formatDate(date) {
        return moment(date).format('MMM Do YYYY')
    },
    getUser(user_id) {
      let full_name = 'Blank';
      this.users.filter(user => {
          if (user_id == user.id) {
              full_name = user.full_name;
          }
      })
      return full_name;
    },
    expandedData(data) {
      let internalData = data;
      console.log(internalData);
      // for (const [key, value] of Object.entries(data.user_matches)) {
      //   internalData[key] = value;
      // }
      return internalData;
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'auth/user',
      matches: 'matches/matches',
      users: 'users/users',
    }),
  },
  created() {
    store.dispatch('matches/getMatches');
    store.dispatch('users/getUsers');
  },
};
</script>

<style scoped>
</style>
