import * as type from '../types'
import api from '../../api/index'

const state = {
  isBackEnd: false,
  uploadToken: {},
  staticleInfo: {},
  syslogInfo: {}
}

const getters = {
  isBackEnd: state => state.isBackEnd,
  uploadToken: state => state.uploadToken,
  staticleInfo: state => state.staticleInfo,
  syslogInfo: state => state.syslogInfo
}

const mutations = {
  [type.IS_BACKEND](state, data) {
    console.log(data)
    state.isBackEnd = data
  },
  [type.SET_UPLOADTOKEN](state, data) {
    console.log(data)
    state.uploadToken = data
  },
  [type.SET_STATISTICSINFO](state, data) {
    console.log(data)
    state.staticleInfo = data
  },
  [type.SET_SYSLOG](state, data) {
    console.log(data)
    state.syslogInfo = data
  }
}

const actions = {
  async getUploadToken(store) {
    console.log('test')
    const result = await api.getUploadToken()
    store.commit(type.SET_UPLOADTOKEN, result)
    console.log(result)
    return result
  },
  async getHomeStatistics(store) {
    const result = await api.getHomeStatistics()
    store.commit(type.SET_STATISTICSINFO, result)
    console.log(result)
    return result
  },
  async getSysLog(store, params) {
    const result = await api.getSysLog(params)
    store.commit(type.SET_SYSLOG, result)
    return result
  }
}

export default {
  // namespaced: true,
  state,
  mutations,
  getters,
  actions
}
