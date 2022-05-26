<template>
  <v-card
    class="card--flex-toolbar elevation-5"
    flat
  >
    <v-toolbar
      color="blue-grey darken-1"
      dark
      card
      prominent
    >
      <v-toolbar-title>Match Format Dashboard</v-toolbar-title>
      <v-spacer />
      <v-btn
        color="blue-grey lighten-1"
        to="format-add"
      >
        Add Match Format
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="formats"
        :loading="true"
        class="elevation-5"
        title="Formats"
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
          <td>{{ props.item.id }}</td>
          <td>
            <v-edit-dialog
              @save="test()"
              :return-value.sync="props.item.name"
              large
              lazy
              persistent
            >
              {{ props.item.name }}
              <v-text-field
                slot="input"
                v-model="props.item.name"
                label="Edit"
                single-line
                autofocus
              />
            </v-edit-dialog>
          </td>
          <td class="justify-center layout px-0">
            <v-btn
              flat
              icon
              @click.stop.prevent="editItem(props.item.id)"
            >
              <v-icon
                small
                class="mr-2"
              >
                edit
              </v-icon>
            </v-btn>
            <v-icon
              small
              @click="deleteItem(props.item)"
            >
              delete
            </v-icon>
          </td>
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
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import store from '../../store/index';
import format from '@/services/Formats';

export default {
  name: 'Formats',
  components: {
  },
  data() {
    return {
      dialog: false,
      form: {
        name: '',
      },
      headers: [
        {
          text: 'ID',
          value: 'id',
        },
        {
          text: 'Format',
          value: 'name',
        },
        {
          text: 'Actions',
          value: '',
          align: 'center',
          sortable: false,
        },
      ],
      progressBar: true,
      editedIndex: -1,
      editedItem: {
        club_id: '',
        competition_type_id: '',
        name: '',
      },
      defaultItem: {
        club_id: '',
        competition_type_id: '',
        name: '',
      },
    };
  },
  validations: {
    form: {
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
  methods: {
    ...mapActions({
      setFeedback: 'feedback/setFeedback',
      getData() {
        let error = '';
        store.dispatch('formats/getFormats')
          .catch(error = store.dispatch('feedback/setFeedback', { message: error.data, type: 'warning' }));
      },
      deleteItem(item) {
        const index = this.formats.indexOf(item);
        return index;
      },
      save() {
        this.$v.form.$touch();
        if (this.$v.form.$error) {
          return;
        }
        if (this.editedIndex > -1) {
          format.addFormat(this.$v.form.$model)
            .then(() => this.setFeedback({ feedback: { message: 'Format Added', type: 'success' } }))
            .catch(error => this.setFeedback({ message: error.message.message, type: 'warning' }));
        } else {
          this.desserts.push(this.editedItem);
        }
        this.close();
      },
      test() {
      },
    }),
    // eslint-disable-next-line no-unused-vars
    editItem(id) {
      this.$router.push('/formats/');
    },
  },
  computed: {
    ...mapGetters({
      formats: 'formats/formats',
    }),
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      if (!this.$v.form.name.required) errors.push('Name is required');
      return errors;
    },
  },
  created() {
    this.getData();
    // this.getDropdownData();
  },
  watch: {
    formats() {
      this.progressBar = false;
    },
  },
};
</script>

<style scoped>

</style>
