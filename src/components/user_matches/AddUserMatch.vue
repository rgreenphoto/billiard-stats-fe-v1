<template>
  <v-sheet
    class="mx-auto"
    max-width="400"
    width="400"
  >
    <v-banner
      color="green"
      elevation="10"
      icon="mdi-karate"
      rounded
    >
      {{ currentUser.firstName }} {{ currentUser.lastName }} - {{ activeMatch.venue.name }} - {{ activeMatch.format.name }} - {{ activeMatch.gameType.name }}
    </v-banner>
    <v-row 
      class="mt-5" 
      dense
    >
      <v-col
        cols="6"
        class="pa-2"
      >
        <v-text-field
          v-model="form.formatSkillLevel"
          label="Skill Level"
          type="number"
          outlined
          rounded
          dense
        />
      </v-col>
      <v-col 
        cols="6"
        class="pa-2"
      >
        <v-text-field
          v-model="form.fargoRating"
          label="Fargo Rating"
          type="number"
          outlined
          rounded
          dense
        />
      </v-col>     
    </v-row>
    <v-row dense>
      <v-col
        cols="6"
        class="pa-2"
      >
        <v-text-field
          v-model="form.matchPoints"
          type="number"
          label="Match Points"
          outlined
          rounded
          dense
        />
      </v-col>
      <v-col
        cols="6"
        class="pa-2"
      >
        <v-text-field
          v-model="form.matchScore"
          type="number"
          label="Match Score"
          outlined
          rounded
          dense
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col
        cols="6"
        class="pa-2"
      >
        <v-text-field
          v-model="form.breakRuns"
          type="number"
          label="Break and Runs"
          outlined
          rounded
          dense
        />  
      </v-col>
      <v-col
        cols="6"
        class="pa-2"
      >
        <v-text-field
          v-model="form.tableRuns"
          type="number"
          label="Table Runs"
          outlined
          rounded
          dense
        />  
      </v-col>
    </v-row>
    <v-row dense>
      <v-col
        cols="6"      
        class="pa-2"
      >
        <v-text-field
          v-model="form.onSnaps"
          type="number"
          label="On the Snaps"
          outlined
          rounded
          dense
        />
      </v-col>
      <v-col
        cols="6"        
        class="pa-2"
      >
        <v-text-field
          v-model="form.rackless"
          type="number"
          label="Rackless"
          outlined
          rounded
          dense
        />      
      </v-col>          
    </v-row>
    <v-row dense>
      <v-col
        cols="6"
        class="pa-2"
      >
        <v-text-field
          v-model="form.innings"
          type="number"
          label="Innings"
          outlined
          rounded
          dense
        />                  
      </v-col>
      <v-col
        cols="6"
        class="pa-2"
      >
        <v-text-field
          v-model="form.race"
          label="Race"
          type="number"
          outlined
          rounded        
          dense
        />           
      </v-col>
    </v-row>
    <v-row dense>
      <v-col
        cols="6"
        class="pa-2"
      >
        <v-checkbox
          v-model="form.homeTeam"
          type="number"
          value="1"
          class="mt-0"
          label="Home"
          color="orange"
          dense
        />
      </v-col>
      <v-col
        cols="6"
        class="pa-2"
      >
        <v-checkbox
          v-model="form.isWin"
          label="Win"
          color="orange"
          value="1"
          class="mt-0"
          dense
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col
        cols="4"
        class="pa-2 text-center"
      >
        <v-btn
          small
          elevation="10"
          color="green"
          @click="cancel()"
        >
          Cancel
          <v-icon right>
            mdi-exit-run
          </v-icon>
        </v-btn>
      </v-col>
      <v-col
        cols="4"
        class="pa-2 text-center"
      >
        <v-btn
          small
          elevation="10"
          color="green"
          @click="opponent()"
        >
          Opponent
          <v-icon right>
            mdi-human-edit
          </v-icon>
        </v-btn>      
      </v-col>
      <v-col
        cols="4"
        class="pa-2 text-center"
      >
        <v-btn
          small
          elevation="10"
          color="green"
          @click="submit()"
        >
          Save
          <v-icon right>
            mdi-glass-mug-variant
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script>

import { mapGetters, mapActions } from 'vuex';
// import store from '@/store/index';

export default {
  name: 'AddUserMatch',
  data() {
    return {
      form: {
        match: { id: ''},
        user: { id: ''},
        formatSkillLevel: null,
        fargoRating: null,
        race: null,
        matchPoints: null,
        matchScore: null,
        breakRuns: null,
        tableRuns: null,
        onSnaps: null,
        rackless: null,
        innings: null,
        homeTeam: 0,
        isWin: 0        
      },
    };
  },
  methods: {
    ...mapActions({
      feedback: 'feedback/feedback',
      setFeedback: 'feedback/setFeedback',
      addUserMatch: 'userMatches/addUserMatch',
      deleteMatch: 'matches/deleteMatch',
      deleteActiveMatch: 'matches/deleteActiveMatch',
      getGameType: 'gameTypes/getGameType',
      getFormat: 'formats/getFormat',
      getVenue: 'venues/getVenue',
    }),
    submit() {
      this.form.user.id = this.activeScoreCard.user_id;
      this.form.match.id = this.activeScoreCard.match_id;
      this.addUserMatch(this.form)
        .then(() => {
          this.setFeedback({
            feedback: {
              message: 'Match Saved',
              type: 'success'
            }
          })
          .then(this.deleteActiveMatch([]))
          .then(this.$router.push('/'))
        })
        .catch((err) => {
          console.log(err);
        });
    },
    opponent() {
      this.form.user.id = this.activeScoreCard.user_id;
      this.form.match.id = this.activeScoreCard.match_id;
      this.addUserMatch(this.form)
        .then(() => {
          this.setFeedback({
            feedback: {
              message: 'Match Saved',
              type: 'success'
            }
          })
          .then(this.$router.push('/select-opponent'))
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cancel() {
      console.log(this.venue);
      console.log(this.game_type);
      // this.deleteMatch(this.activeMatch)
      //   .then(() => this.setFeedback({ feedback: { message: 'Match Ended', type: 'success' } })).then(this.$router.push('/'))
      //   .catch(error => this.setFeedback({ message: error.message.message, type: 'warning' }));
    }
  },
  created () {
    this.getGameType(this.activeMatch.gameType.id);
    this.getFormat(this.activeMatch.format.id);
    this.getVenue(this.activeMatch.venue.id);
  },
  computed: {
    ...mapGetters({
      currentUser: 'auth/user',
      activeMatch: 'matches/activeMatch',
      activeScoreCard: 'userMatches/activeScoreCard',
      format: 'formats/format',
      game_type: 'gameTypes/gameType',
      venue: 'venues/venue',
    }),
  },
};
</script>

<style scoped>
</style>