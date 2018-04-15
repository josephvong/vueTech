import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import createRouter from './router/router'
import createStore from './store/index'

import './assets/styles/global.styl'

Vue.use(VueRouter)
const router = createRouter()
Vue.use(Vuex) // 注册Vuex
const store = createStore()

// 动态创建一个 vuex 模块
store.registerModule('c', {
  state: {
    mctext: 'c'
  }
})

store.watch((state) => { return state.count }, (newCount) => {
  console.log(`newCount: ${newCount}`)
})

store.subscribe((mutation, state) => {
  console.log(mutation.type)
  console.log(mutation.payload)
})

router.beforeEach((to, from, next) => {
  console.log('before each invoked')
  next()
})

router.beforeResolve((to, from, next) => {
  console.log('before resolve invoked')
  next()
})

router.afterEach((to, from) => {
  console.log('after each invoked')
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
