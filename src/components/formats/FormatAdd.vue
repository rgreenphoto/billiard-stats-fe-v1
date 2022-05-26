<template>
  <v-card class="card--flex-toolbar elevation-5 flat">
    <v-toolbar
      color="blue-grey darken-1"
      dark
      card
      prominent
    >
      <v-toolbar-title>Formats Details</v-toolbar-title>
      <v-spacer />
      <v-btn
        color="blue-grey lighten-1"
        to="/formats"
      >
        Match Formats List
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <div class="elevation-5 p-3">
        <v-form>
          <input
            type="text"
            v-model="$v.form.id.$model"
          >
          <v-select
            id="competition_type_id"
            name="competition_type_id"
            :items="competitionTypes"
            item-text="name"
            item-value="id"
            label="Competition Type"
            v-model="$v.form.competition_type_id.$model"
          />
          <v-select
            id="club_id"
            name="club_id"
            :items="clubs"
            item-text="name"
            item-value="id"
            label="Club"
            v-model="$v.form.club_id.$model"
          />
          <v-text-field
            id="name"
            v-model="$v.form.name.$model"
            :error-messages="nameErrors"
            label="Name"
            required
            clearable
            @input="$v.form.name.$touch()"
            @blur="$v.form.name.$touch()"
          />
          <div class="text-lg-right">
            <v-btn
              @click.stop.prevent="submit"
              color="blue-grey lighten-1"
            >
              save
            </v-btn>
          </div>
        </v-form>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import { required, minLength } from 'vuelidate/lib/validators';
import store from '@/store/store';
import formats from '@/services/Formats';

export default {
  name: 'AddCompetition',
  props: ['id'],
  data() {
    return {
      form: {
        id: '',
        name: '',
        competition_type_id: '',
        club_id: '',
      },
    };
  },
  methods: {
    ...mapActions({
      setFeedback: 'feedback/setFeedback',
    }),
    getData() {
      let error = '';
      store.dispatch('formats/getFormat', this.id)
        .catch(error = store.dispatch('feedback/setFeedback', { message: error.data, type: 'error' })
          .then(store.dispatch('clubs/getClubs').then(store.dispatch('competitionTypes/getCompetitionTypes'))));
      this.form = this.competition;
    },
    submit() {
      this.$v.form.$touch();
      if (this.$v.form.$error) {
        return;
      }
      formats.addFormat(this.$v.form.$model)
        .then(() => this.setFeedback({ feedback: { message: 'Format Added', type: 'success' } }))
        .catch(error => this.setFeedback({ message: error.message.message, type: 'warning' }));
      this.$router.push('/formats');
    },
  },
  computed: {
    ...mapGetters({
      format: 'formats/format',
    }),
    nameErrors() {
      const errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      if (!this.$v.form.name.required) errors.push('Name is required');
      return errors;
    },
  },
  created() {
    this.form = '';
    this.getData();
  },
  validations: {
    form: {
      id: {
        minLength: minLength(1),
      },
      name: {
        required,
      },
      competition_type_id: {
        required,
      },
      club_id: {
        required,
      },
    },
  },
};
</script>

<style scoped>

</style>
