<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ 'Edit' | localize }}</h4>
      </div>

      <form @submit.prevent="submitForm">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option
              v-for="cat of categories"
              :key="cat.id"
              :value="cat.id"
            >{{cat.title}}</option>
          </select>
          <label>{{ 'SelectCategory' | localize }}</label>
        </div>

        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model="title"
              :class="{invalid: $v.title.dirty && !$v.title.required}"
          >
          <label for="name">{{ 'Title' | localize }}</label>
          <span
            class="helper-text invalid"
            v-if="$v.title.dirty && !$v.title.required"
          >{{ 'Message_CategoryTitle' | localize }}</span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model.number="limit"
              :class="{invalid: $v.limit.dirty && !$v.limit.minValue}"
          >
          <label for="limit">{{ 'Limit' | localize }}</label>
          <span
            class="helper-text invalid"
            v-if="$v.limit.dirty && !$v.limit.minValue"
          >{{ 'Message_MinLength' | localize }} {{$v.limit.$params.minValue.min}}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ 'Update' | localize }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators';
import localizeFilter from '@/filters/localize.filter';

export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    select: null,
    title: '',
    limit: 1,
    current: null,
  }),
  validations: {
    title: {required},
    limit: {minValue: minValue(1)},
  },
  methods: {
    async submitForm() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        var data = {
          id: this.current,
          title: this.title,
          limit: this.limit,
        };
        await this.$store.dispatch('updateCategory', data);
        this.$message(localizeFilter('Category_HasBeenUpdated'));
        this.$emit('updated', data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    current(catId) {
      var {title, limit} = this.categories.find(c => c.id === catId);
      this.title = title;
      this.limit = limit;
    }
  },
  created() {
    var {id, title, limit} = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
}
</script>
