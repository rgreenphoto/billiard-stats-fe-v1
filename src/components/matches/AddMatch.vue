<template>
  <v-sheet
    class="mt-4 mx-auto"
    max-width="400"
  >
    <v-form>
      <v-stepper
        v-model="e6"
        vertical
      >
        <v-stepper-step
          :complete="e6 > 1"
          step="1"
          editable
        >
          Select Format {{ selectedFormat }}
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-select
            v-model="form.format" 
            @change="e6 = 2"
            :items="formats"
            item-text="name"
            item-value="id"
            label="Formats"
            rounded
            solo
            return-object
          />
        </v-stepper-content>

        <v-stepper-step
          :complete="e6 > 2"
          step="2"
          editable
        >
          Select Venue {{ selectedVenue }}
        </v-stepper-step>

        <v-stepper-content step="2">
          <v-select 
            v-model="form.venue"
            @change="e6 = 3"
            :items="venues"
            item-text="name"
            item-value="id"
            label="Venues"
            rounded
            solo
            return-object
          />
        </v-stepper-content>

        <v-stepper-step
          :complete="e6 > 3"
          step="3"
          editable
        >
          Select Table Type {{ selectedTableType }}
        </v-stepper-step>

        <v-stepper-content step="3">
          <v-select 
            v-model="form.tableType"
            @change="e6 = 4"
            :items="table_types"
            item-text="name"
            item-value="id"
            label="Table Types"
            rounded
            solo
            return-object
          /> 
        </v-stepper-content>

        <v-stepper-step
          :complete="e6 > 4" 
          editable
          step="4"
        >
          Select Rack Type {{ selectedRackType }}
        </v-stepper-step>
        <v-stepper-content step="4">
          <v-select
            v-model="form.rackType" 
            @change="e6 = 5"
            :items="rack_types"
            item-text="name"
            item-value="id"
            label="Rack Types"
            rounded
            solo
            return-object
          />
        </v-stepper-content>
        <v-stepper-step
          :complete="e6 > 5" 
          editable
          step="5"
        >
          Select Game {{ selectedGameType }}
        </v-stepper-step>
        <v-stepper-content step="5">
          <v-select
            v-model="form.gameType" 
            @change="e6 = 6"
            :items="game_types"
            item-text="name"
            item-value="id"
            label="Games"
            rounded
            solo
            return-object
          />
        </v-stepper-content>        
        <v-stepper-step 
          editable
          step="6"
        >
          Enter Scores
          <small>You will have the option to add opponent after that!</small>
        </v-stepper-step>
        <v-stepper-content 
          step="6"
          class="text-right"
        >
          <v-btn
            small
            elevation="10"
            right
            color="success"
            @click="submit()"
          >
            Next
            <v-icon right>
              mdi-duck
            </v-icon>
          </v-btn>
        </v-stepper-content>
      </v-stepper>      
    </v-form>
  </v-sheet>
</template>
<script>

import { mapGetters, mapActions } from 'vuex';
import store from '@/store/index';

export default {
  name: 'AddMatch',
  data() {
    return {
        form: {
          format: {
            id: '',
            name: '',
          },
          venue: {
            id: '',
            name: '',
          },
          tableType: {
            id: '',
            name: '',
          },
          rackType: {
            id: '',
            name: '',
          },
          gameType: {
            id: '',
            name: '',
          }
        },
        e6: 1,
    };
  },
  methods: {
    ...mapActions({
      feedback: 'feedback/feedback',
      setFeedback: 'feedback/setFeedback',
      addMatch: 'matches/addMatch',
      setActiveScoreCard: 'userMatches/setActiveScoreCard',
      getData() {
        store.dispatch('formats/getFormats');
        store.dispatch('venues/getVenues');
        store.dispatch('tableTypes/getTableTypes');
        store.dispatch('rackTypes/getRackTypes');
        store.dispatch('gameTypes/getGameTypes');
      },
      submit() {
        let record = {
          user: this.currentUser,
          format: this.form.format,
          venue: this.form.venue,
          tableType: this.form.tableType,
          rackType: this.form.rackType,
          gameType: this.form.gameType
        }
        this.addMatch(record)
          .then(() => {
            let scoreCard = {
              match_id: this.activeMatch.id,
              user_id: this.currentUser.id,
              full_name: this.currentUser.full_name
            }
            this.setActiveScoreCard(scoreCard)
              .then(() => {
                this.$router.push('/add-user-match')
              })            
          })
          .catch((err) => {
          
            this.setFeedback({
              feedback: {
                message: err.data
              }
            })
          });
    },
    }),
  },
  computed: {
    ...mapGetters({
      currentUser: 'auth/user',
      formats: 'formats/formats',
      venues: 'venues/venues',
      table_types: 'tableTypes/tableTypes',
      rack_types: 'rackTypes/rackTypes',
      game_types: 'gameTypes/gameTypes',
      activeMatch: 'matches/activeMatch'
    }),
    selectedFormat: {
      get: function() {
        let name = '';
        if (this.form.format.name) {
          name = "("+this.form.format.name+")";
        }
        return name;        
      }
    },
    selectedVenue: {
      get: function() {
        let name = '';
        if (this.form.venue.name) {
          name = "("+this.form.venue.name+")";
        }
        return name;        
      }
    },
    selectedTableType: {
      get: function() {
        let name = '';
        if (this.form.tableType.name) {
          name = "("+this.form.tableType.name+")";
        }
        return name;        
      }
    },
    selectedRackType: {
      get: function() {
        let name = '';
        if (this.form.rackType.name) {
          name = "("+this.form.rackType.name+")";
        }
        return name;        
      }
    },
    selectedGameType: {
      get: function() {
        let name = '';
        if (this.form.gameType.name) {
          name = "("+this.form.gameType.name+")";
        }
        return name;        
      }
    } 
  },
  created() {
      this.getData();
  },
};
</script>

<style scoped>
</style>