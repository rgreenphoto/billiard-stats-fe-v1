<template>
  <div>
    <v-data-table
      :items="users"
      :loading="true"
      class="elevation-5"
      title="Users"
    >
      <v-progress-linear
        slot="progress"
        color="blue"
        indeterminate
        v-show="progressBar"
      />
      <template
        slot="items"
        slot-scope="props"
      >
        <td>{{ props.item.name }}</td>
      </template>
      <template
        slot="no-data"
        v-if="!progressBar"
      >
        <v-alert
          :value="true"
          color="error"
          icon="warning"
        >
          Sorry, nothing to display here :(
        </v-alert>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import store from '../../store/store';
import users from '@/services/Users';

export default {
  name: 'UserList',
  data() {
    return {
      progressBar: true,
      headers: [
        {
          text: 'User',
          value: 'name',
        },
      ],
    };
  },
  methods: {
    ...mapActions({
      setFeedback: 'feedback/setFeedback',
      getData() {
        let error = '';
        store.dispatch('users/getUsers')
          .catch(error = store.dispatch('feedback/setFeedback', { message: error.data, type: 'warning' }));
      },
    }),
  },
  computed: {
    ...mapGetters({
      users: 'users/users',
    }),
  },
  created() {
    this.getData();
  },
  watch: {
    users() {
      this.progressBar = false;
    },
  },
};
</script>

<style scoped>

</style>
