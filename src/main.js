import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueMeta from 'vue-meta'
import Paginate from 'vuejs-paginate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'
import tooltipDirective from '@/directives/tooltip.directive'
import messagePlugin from '@/utils/message.plugin'
import titlePlugin from '@/utils/title.plugin'
import Loader from '@/components/app/Loader'
import 'materialize-css/dist/js/materialize.min'

Vue.config.productionTip = false

Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.use(titlePlugin);
Vue.use(VueMeta);

Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.filter('localize', localizeFilter);

Vue.directive('tooltip', tooltipDirective);

Vue.component('Loader', Loader);
Vue.component('Paginate', Paginate);

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
});

var app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router: router,
      store: store,
      render: h => h(App)
    }).$mount('#app');
  }
});
