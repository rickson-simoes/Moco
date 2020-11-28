import Vue from 'vue';
import '@/plugins/bootstrapPlugin';
import '@/styles/global.css';

import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
