<template>
  <v-layout
    justify-center
    row
  >
    <v-flex
      xs12
      sm6
    >
      <v-card>
        <v-toolbar
          card
          color="grey"
          dark
        >
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <form>
            <v-text-field
              id="first_name"
              v-model="$v.form.first_name.$model"
              :error-messages="firstNameErrors"
              label="First Name"
              required
              clearable
              @input="$v.form.first_name.$touch()"
              @blur="$v.form.first_name.$touch()"
            />
            <v-text-field
              id="last_name"
              v-model="$v.form.last_name.$model"
              :error-messages="lastNameErrors"
              label="Last Name"
              required
              clearable
              @input="$v.form.last_name.$touch()"
              @blur="$v.form.last_name.$touch()"
            />
            <v-text-field
              id="email"
              v-model="$v.form.email.$model"
              :error-messages="emailErrors"
              label="Email"
              required
              clearable
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
              @input="$v.form.password.$touch()"
              @blur="$v.form.password.$touch()"
            />
            <v-text-field
              id="password-confirmation"
              type="password"
              v-model="$v.form.password_confirmation.$model"
              :error-messages="passwordConfirmationErrors"
              label="Confirm Password"
              required
              clearable
              @input="$v.form.password_confirmation.$touch()"
              @blur="$v.form.password_confirmation.$touch()"
            />
            <v-btn @click="submit">
              submit
            </v-btn>
          </form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

import { mapActions } from 'vuex';
import { required, email, sameAs } from 'vuelidate/lib/validators';
import Auth from '../../services/Auth';

export default {
  name: 'Register',
  data() {
    return {
      form: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
    };
  },
  validations: {
    form: {
      first_name: {
        required,
      },
      last_name: {
        required,
      },
      email: {
        required,
        email,
      },
      password: {
        required,
      },
      password_confirmation: {
        required,
        sameAsPassword: sameAs('password'),
      },
    },
  },
  computed: {
    firstNameErrors() {
      const errors = [];
      if (!this.$v.form.first_name.$dirty) return errors;
      if (!this.$v.form.first_name.required) errors.push('First Name is required');
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.form.last_name.$dirty) return errors;
      if (!this.$v.form.last_name.required) errors.push('Last Name is required');
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.form.email.$dirty) return errors;
      if (!this.$v.form.email.email) errors.push('Must be valid email.');
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
    passwordConfirmationErrors() {
      const errors = [];
      if (!this.$v.form.password_confirmation.$dirty) return errors;
      if (!this.$v.form.password_confirmation.required) errors.push('Passwords must match');
      return errors;
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
      Auth.register(this.$v.form.$model)
        .then(() => this.setDelayedFeedback({ feedback: { message: 'Thank you', type: 'success' } }))
        .then(() => this.$router.push({ path: '/' }))
        .catch(error => this.setFeedback({ message: error.data.errors, type: 'warning' }));
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
