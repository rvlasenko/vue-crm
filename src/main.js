import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import tooltipDirective from '@/directives/tooltip.directive'
import messagePlugin from '@/utils/message.plugin'
import Loader from '@/components/app/Loader'
import 'materialize-css/dist/js/materialize.min'

Vue.config.productionTip = false

Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.use(Vuelidate);
Vue.directive('tooltip', tooltipDirective);
Vue.use(messagePlugin);
Vue.component('Loader', Loader);

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH,
  databaseURL: "https://vue-crm-109ff.firebaseio.com",
  projectId: "vue-crm-109ff",
  storageBucket: "vue-crm-109ff.appspot.com",
  messagingSenderId: "607926178953",
  appId: "1:607926178953:web:e30c0d900253695a10a258"
});

var app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
});
