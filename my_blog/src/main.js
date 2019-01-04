import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './vuex/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import timeFormat from './filters/time'
import 'mavon-editor/dist/css/index.css'
import { mavonEditor } from 'mavon-editor'
import photoPreview from '@/components/photo-preview'
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'

Vue.config.productionTip = false

Vue.component('mavon-editor', mavonEditor)

Vue.use(photoPreview)
Vue.use(ElementUI)
Vue.filter('timeFormat', timeFormat)
Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach(block => {
    hljs.highlightBlock(block)
  })
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
