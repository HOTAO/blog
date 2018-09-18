import * as type from '../types'
import api from '../../api/index'

const state = {
  isBackEnd: false,
  uploadToken: {}
}

const getters = {
  isBackEnd: state => state.isBackEnd,
  uploadToken: state => state.uploadToken
}

const mutations = {
  [type.IS_BACKEND](state, data) {
    console.log(data)
    state.isBackEnd = data
  },
  [type.SET_UPLOADTOKEN](state, data) {
    console.log(data)
    state.uploadToken = data
  }
}

const actions = {
  async getUploadToken(store) {
    console.log('test')
    const result = await api.getUploadToken()
    store.commit(type.SET_UPLOADTOKEN, result)
    console.log(result)
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
