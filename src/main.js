import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

import resize from "vue-element-resize-detector";

Vue.use(resize);

new Vue({
  render: h => h(App),
}).$mount('#app')
