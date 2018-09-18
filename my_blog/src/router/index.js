import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { IS_BACKEND } from '@/vuex/types'
import store from '@/vuex/store'

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.isBackEnd)) {
    store.commit(IS_BACKEND, true)
  } else {
    store.commit(IS_BACKEND, false)
  }
  next()
})

export default router
