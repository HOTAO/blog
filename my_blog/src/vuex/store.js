import Vue from 'vue'
import Vuex from 'vuex'

import common from './modules/common'
import article from './modules/article'
import classify from './modules/classify'
import webConfig from './modules/web_config'
// import actions from './actions'
// import mutations from './mutations'

Vue.use(Vuex)

const modules = { common, article, classify, webConfig }

const store = new Vuex.Store({
  modules,
  mutations: {},
  actions: {}
})

if (module.hot) {
  module.hot.accept(
    [
      './modules/common',
      './modules/article',
      './modules/classify',
      './modules/web_config'
    ],
    () => {
      store.hotUpdate({
        modules: {
          common: require('./modules/common').default,
          article: require('./modules/article').default,
          classify: require('./modules/classify').default,
          webConfig: require('./modules/web_config').default
        }
      })
    }
  )
}

export default store
