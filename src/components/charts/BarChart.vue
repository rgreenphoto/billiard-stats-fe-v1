<script>
import { Bar } from 'vue-chartjs'
import { mapGetters } from 'vuex';
import moment from 'moment';
import store from '@/store/index';

export default {
  name: 'BarChart',
  extends: Bar,
  data () {
    return {
        datacollection: {
            labels: this.getLabels(),
            datasets: [
                {
                    label: 'Match Score',
                    backgroundColor: '#ffffff',
                    pointBackgroundColor: 'black',
                    borderWidth: 1,
                    pointBorderColor: '#ffffff',
                    data: this.getData(),
                }
            ]
        },
        options: {
            scales: {
                yAxis: [{
                    ticks: {
                        beginAtZero: true
                    },
                    gridLines: {
                        display: true
                    }
                }],
                xAxis: [{
                    gridLines: {
                        display: false
                    }
                }]
            },
            legend: {
                display: true
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
computed: {
    ...mapGetters({
      currentUser: 'auth/user',
      user_matches: 'userMatches/user_matches',
    }),
},
methods: {
      getData() {
        let data = [];
        this.user_matches.filter(match => {
            data.push(match.match_score);
        })
        return data;
      },
      getLabels() {
          let labels = [];
          this.user_matches.filter(match => {
              labels.push(moment(match.created_at).format('MMM Do YYYY'))
          })
          return labels;
      }
},
    mounted () {
        store.dispatch('userMatches/getUserMatches');
        console.log(this.user_matches);
        this.renderChart(this.datacollection, this.options);
    }
}
</script>