// Polyfills
import 'es6-promise/auto'
import 'babel-polyfill'

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import App from './App'
// import VueRouter from 'vue-router';
import store from './store'
import router from './router'
import VuesticPlugin from '@/vuestic-theme/vuestic-plugin'
import './i18n'
import YmapPlugin from 'vue-yandex-maps'
import VueKonva from 'vue-konva'
// import Axios from 'axios'
// import VueChart from 'vue-chartjs'
const VueCookie = require('vue-cookie')

Vue.use(VuesticPlugin)
Vue.use(YmapPlugin)
Vue.use(VueCookie)
Vue.use(VueKonva)
// Vue.use(VueChart)
// Vue.use(VueRouter);
// Vue.use(Axios)
// let vrouter = new VueRouter({mode:})
// NOTE: workaround for VeeValidate + vuetable-2
Vue.use(VeeValidate, { fieldsBagName: 'formFields' })
// Vue.component('Users')
router.beforeEach((to, from, next) => {
  store.commit('setLoading', true)
  next()
})

router.afterEach((to, from) => {
  store.commit('setLoading', false)
})

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
