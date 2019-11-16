import Vue from 'vue';
import App from './App.vue';
import router from './router';
import BootstrapVue from 'bootstrap-vue';
import store from './store';
import './assets/css/photon.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// tslint:disable-next-line:no-var-requires
const VueMask = require('v-mask').default;


Vue.use(BootstrapVue);
Vue.use(VueMask);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
