<template>
  <div>
    <div class="page-title">
      <h3>{{'ProfileTitle' | localize}}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandle">
      <div class="input-field">
        <input id="description" type="text" v-model="name" :class="{invalid: $v.name.$dirty && !$v.name.required}" />
        <label for="description" :class="{active: name.length}">{{'Name' | localize}}</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >{{'Message_EnterName' | localize}}</small>
      </div>

      <div class="switch">
        <label>
          Eng
          <input type="checkbox" v-model="isLocaleRu" />
          <span class="lever"></span>
          Рус
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'Update' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators';
import {mapGetters, mapActions} from 'vuex';

export default {
  computed: {
    ...mapGetters(['info'])
  },
  validations: {
    name: {
      required
    },
  },
  data: () => ({
    name: '',
    isLocaleRu: true,
  }),
  mounted() {
    this.isLocaleRu = this.info.locale === 'ru-RU';
    this.name = this.info.name;
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandle() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        this.updateInfo({
          name: this.name,
          locale: this.isLocaleRu ? 'ru-RU' : 'en-US',
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>