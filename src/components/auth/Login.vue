<script>

import { mapActions } from 'vuex';
import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    };
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    ...mapActions({
      setFeedback: 'feedback/setFeedback',
      setDelayedFeedback: 'feedback/setDelayedFeedback',
      login: 'auth/login',
    }),
    submit() {
      this.$v.form.$touch();
      if (this.$v.form.$error) {
        return;
      }
      this.login(this.$v.form.$model)
        .then(() => this.$router.push('/'))
        .then(() => this.setFeedback({ message: 'Welcome Back', type: 'success' }))
        .catch(error => this.setDelayedFeedback({ message: error.data, type: 'warning' }));
    },
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.form.email.$dirty) return errors;
      if (!this.$v.form.email.email) errors.push('Must be valid email');
      if (!this.$v.form.email.required) errors.push('E-mail is required');
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.form.password.$dirty) return errors;
      if (!this.$v.form.password.required) errors.push('Password is required');
      return errors;
    },
  },
};
</script>
<template>
  <v-sheet
    class="mt-4 mx-auto"
    max-width="400"
  >
    <v-card
      elevation="10"
      rounded
    >
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <form>
          <v-text-field
            id="email"
            v-model="$v.form.email.$model"
            :error-messages="emailErrors"
            label="Email"
            required
            clearable
            solo-inverted
            @input="$v.form.email.$touch()"
            @blur="$v.form.email.$touch()"
          />
          <v-text-field
            id="password"
            type="password"
            v-model="$v.form.password.$model"
            :error-messages="passwordErrors"
            label="Password"
            required
            clearable
            solo-inverted
            @input="$v.form.password.$touch()"
            @blur="$v.form.password.$touch()"
          />
          <v-btn 
            dark 
            @click="submit"
          >
            submit
          </v-btn>
        </form>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<style scoped>

</style>
