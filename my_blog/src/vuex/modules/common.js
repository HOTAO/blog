import * as type from '../types'
import api from '../../api/index'

const state = {
  screenInfo: {},
  isBackEnd: false,
  uploadToken: {},
  staticleInfo: {},
  syslogInfo: {}
}

const getters = {
  isBackEnd: state => state.isBackEnd,
  uploadToken: state => state.uploadToken,
  staticleInfo: state => state.staticleInfo,
  syslogInfo: state => state.syslogInfo,
  screenInfo: state => state.screenInfo
}

const mutations = {
  [type.IS_BACKEND](state, data) {
    state.isBackEnd = data
  },
  [type.SET_UPLOADTOKEN](state, data) {
    state.uploadToken = data
  },
  [type.SET_STATISTICSINFO](state, data) {
    state.staticleInfo = data
  },
  [type.SET_SYSLOG](state, data) {
    state.syslogInfo = data
  },
  [type.SET_SCREEN](state, screen) {
    state.screenInfo = screen
  }
}

const actions = {
  async getUploadToken(store) {
    const result = await api.getUploadToken()
    store.commit(type.SET_UPLOADTOKEN, result)
    return result
  },
  async getHomeStatistics(store) {
    const result = await api.getHomeStatistics()
    store.commit(type.SET_STATISTICSINFO, result)
    return result
  },
  async getSysLog(store, params) {
    const result = await api.getSysLog(params)
    store.commit(type.SET_SYSLOG, result)
    return result
  },
  async setScreenInfo(store, screen) {
    store.commit(type.SET_SCREEN, screen)
  }
}

export default {
  // namespaced: true,
  state,
  mutations,
  getters,
  actions
}
