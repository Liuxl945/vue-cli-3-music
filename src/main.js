// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import VueLazyload from 'vue-lazyload'
import fastclick from 'fastclick'

import '@/common/font/icon.css'



fastclick.attach(document.body)


Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('@/common/image/default.png'),
  loading: require('@/common/image/default.png'),
  attempt: 1
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})