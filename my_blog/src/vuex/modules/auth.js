import * as type from '../types'
import api from '../../api/index'
import cache from '../../cache/index'
const state = {
  isLogin: cache.lsCache.get('token') || null,
  userInfo: cache.lsCache.get('userInfo') || null
}

const getters = {
  isLogin: state => state.isLogin,
  userInfo: state => state.userInfo
}

const mutations = {
  [type.SET_USERINFO](state, data) {
    console.log(data)
    cache.lsCache.set('token', data.authInfo.token, data.authInfo.exp)
    cache.lsCache.set('userInfo', data.userInfo.data, data.authInfo.exp)
    state.userInfo = data
  }
}

const actions = {
  async login(store, params) {
    const result = await api.login(params)
    store.commit(type.SET_USERINFO, result)
    console.log(result)
    return result
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
