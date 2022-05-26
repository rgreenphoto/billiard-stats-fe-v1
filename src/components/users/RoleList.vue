<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="roles"
      :loading="true"
      class="elevation-5"
      title="Roles"
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
        <td>{{ props.item.guard_name }}</td>
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
// import roles from '@/services/Roles';

export default {
  name: 'RoleList',
  data() {
    return {
      progressBar: true,
      headers: [
        {
          text: 'Role',
          value: 'name',
        },
        {
          text: 'Guard Name',
          value: 'guard_name',
        },
      ],
    };
  },
  methods: {
    ...mapActions({
      setFeedback: 'feedback/setFeedback',
      getData() {
        let error = '';
        store.dispatch('roles/getRoles')
          .catch(error = store.dispatch('feedback/setFeedback', { message: error.data, type: 'warning' }));
      },
    }),
  },
  computed: {
    ...mapGetters({
      roles: 'roles/roles',
    }),
  },
  created() {
    this.getData();
  },
  watch: {
    roles() {
      this.progressBar = false;
    },
  },
};
</script>

<style scoped>

</style>
