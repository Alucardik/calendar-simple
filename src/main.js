import Vue from 'vue';
import App from './App.vue';
import Home from "./components/Home";
import Main from "./components/Main";

Vue.config.productionTip = false;

import resize from "vue-element-resize-detector";
Vue.use(resize);

import VueRouter from "vue-router";
Vue.use(VueRouter);


const routes = [
  {
    path: "/workspace",
    component: Main
  },
  {
    path: "*",
    component: Home
  },
];

const router = new VueRouter({routes});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
