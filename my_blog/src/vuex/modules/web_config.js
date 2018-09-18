import * as type from '../types'
import api from '../../api/index'

const state = {
  meInfo: {},
  resumeInfo: {},
  baseInfo: {},
  friendInfo: {},
  friendType: []
}

const getters = {
  meInfo: state => state.meInfo,
  resumeInfo: state => state.resumeInfo,
  baseInfo: state => state.baseInfo,
  friendInfo: state => state.friendInfo,
  friendType: state => state.friendType
}

const mutations = {
  [type.SET_ME](state, data) {
    state.meInfo = data[0]
  },
  [type.SET_RESUME](state, data) {
    state.resumeInfo = data[0]
  },
  [type.SET_WEBCONFIG](state, data) {
    state.baseInfo = data[0]
  },
  [type.SET_FRIEND](state, data) {
    state.friendInfo = data
  },
  [type.SET_FRIENDTYPE](state, data) {
    state.friendType = data
  }
}

const actions = {
  /**
   * me
   */
  async getMe(store) {
    const result = await api.getMe()
    store.commit(type.SET_ME, result)
    return result
  },
  async insertMe(store, data) {
    console.log(data)
    const result = await api.insertMe(data)
    return result
  },
  async updateMe(store, data) {
    const id = data.id
    delete data.id
    const result = await api.updateMe(id, data)
    return result
  },
  /**
   * resume
   */
  async getResume(store) {
    const result = await api.getResume()
    store.commit(type.SET_RESUME, result)
    return result
  },
  async insertResume(store, data) {
    console.log(data)
    const result = await api.insertResume(data)
    return result
  },
  async updateResume(store, data) {
    const id = data.id
    delete data.id
    const result = await api.updateResume(id, data)
    return result
  },
  /**
   * web_config
   */
  async getWebConfig(store) {
    const result = await api.getWebConfig()
    store.commit(type.SET_WEBCONFIG, result)
    return result
  },
  async insertWebConfig(store, data) {
    console.log(data)
    const result = await api.insertWebConfig(data)
    return result
  },
  async updateWebConfig(store, data) {
    const id = data.id
    // delete data.id
    const result = await api.updateWebConfig(id, data)
    return result
  },
  /**
   * friend
   */
  async getFriends(store, params) {
    const result = await api.getFriends(params)
    store.commit(type.SET_FRIEND, result)
    return result
  },
  async getFriendType(store, params) {
    const result = await api.getFriendType(params)
    store.commit(type.SET_FRIENDTYPE, result)
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
