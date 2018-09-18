import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './vuex/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import timeFormat from './filters/time'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.filter('timeFormat', timeFormat)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
