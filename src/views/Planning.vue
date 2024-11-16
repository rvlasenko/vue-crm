<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Menu_Planning' | localize }}</h3>
      <h4>{{info.bill | currency('RUB')}}</h4>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">{{ 'NoCategories' | localize }}. <router-link to="/categories">{{ 'AddFirst' | localize }}.</router-link></p>

    <section v-else>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{cat.title}}:</strong>
          {{cat.spend | currency}} {{ 'Of' | localize }} {{cat.limit | currency}}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
              class="determinate"
              :class="cat.progressColor"
              :style="{width: cat.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'

export default {
  metaInfo() {
    return {
      title: this.$title('Menu_Planning'),
    }
  },
  name: 'planning',
  data: () => ({
    loading: true,
    categories: [],
  }),
  computed: {
    ...mapGetters(['info']),
  },
  async mounted() {
    var records = await this.$store.dispatch('fetchRecords');
    var categories = await this.$store.dispatch('fetchCategories');

    this.categories = categories.map(cat => {
      var spend = records
        .filter(r => r.categoryId === cat.id)
        .filter(r => r.type === 'outcome')
        .reduce((total, record) => {
          return total += +record.amount;
        }, 0);

      var tooltipValue = cat.limit - spend;
      var tooltip = `${tooltipValue < 0 ? localizeFilter('MoreThan') : localizeFilter('Stayed')} ${currencyFilter(Math.abs(tooltipValue))}`;
      var percent = 100 * spend / cat.limit;
      var progressPercent = percent > 100 ? 100 : percent;
      var progressColor = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red';

      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip
      };
    });

    this.loading = false;
  }
}
</script>
