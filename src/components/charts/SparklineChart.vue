<template>
  <v-card
    class="mt-4 mx-auto"
    max-width="800"
  >
    <v-card-title>
      <v-row no-gutters>
        <v-col cols="9">
          Trends
        </v-col>
        <v-col 
          cols="3"
          class="text-right"
        >
          <v-btn 
            small
            color="success"
            to="/advanced-charts"
          >
            Advanced Charts
            <v-icon right>
              mdi-chart-bar
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-subtitle>
      Simple trends of your last 5 matches. Use the menu below chart for data display options.
    </v-card-subtitle>
    <v-card-text>
      <v-sheet
        dark
        elevation="15"
      >
        <v-sparkline
          :labels="labels"
          :value="value"
          :gradient="gradient"
          gradient-direction="bottom"
          smooth="6"
          line-width="15"
          width="775"
          height="400"
          radius="10"
          padding="35"
          stroke-linecap="round"
          type="trend"
          label-size="15"
          auto-draw
        >
          <template v-slot:label="item">
            {{ item.value }}
          </template>
        </v-sparkline>
      </v-sheet>
      <v-row no-gutters>
        <v-col>
          <div class="title font-weight-black mb-6 pb-2">
            {{ selectedStat }}
          </div>
        </v-col>
        <v-col>
          <div class="text-right pa-2">
            <v-menu 
              top 
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="success"
                  small
                  v-bind="attrs"
                  v-on="on"
                >
                  Stats
                  <v-icon right>
                    mdi-chart-line
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in items"
                  :key="index"
                  @click="getUserStats(item.key)"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-col>
      </v-row>
    </v-card-text>  
  </v-card>
</template>
<script>

import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
  name: 'TrendsWidget',
  data() {
    return {
      value: [],
      labels: [],
      gradient: ['red', 'orange', 'yellow', 'green'],
      items: [
        { title: 'Match Points', key: 'matchPoints'},
        { title: 'Match Score', key: 'matchScore'},
        { title: 'Break & Runs', key: 'breakRuns'},
        { title: 'Table Runs', key: 'tableRuns'},
        { title: 'On Snaps', key: 'onSnaps'},
        { title: 'Rackless', key: 'rackless'},
        { title: 'Innings', key: 'innings'},
        { title: 'Wins', key: 'isWin'}

      ],
      selectedStat: 'Match Points'
    };
  },
  methods: {
    getUserStats(key) {
      this.labels = [];
      this.value = [];
      this.user_matches.forEach(element => {
        this.value.push(parseInt(element[key]));
        this.labels.push(moment(element.created_at).format('MMM Do'));  
      });
      // set title for selected stat
      this.items.forEach(title => {
          if (key === title.key) {
              this.selectedStat = title.title;
          }
      });
    }
  },
  computed: {
    ...mapGetters({
      user_matches: 'userMatches/user_matches',
      currentUser: 'auth/user',
    }),
  },
  created() {
    this.getUserStats('match_points');
  },
};
</script>

<style scoped>
</style>