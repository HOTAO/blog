import * as type from '../types'
import api from '../../api/index'

const state = {
  commentsInfo: {}
}

const getters = {
  commentsInfo: state => state.commentsInfo
}

const mutations = {
  [type.SET_COMMENTS_INFO](state, data) {
    console.log(data)
    state.commentsInfo = data
  }
}

const actions = {
  async getAllComments(store, params) {
    const result = await api.getAllComments(params)
    store.commit(type.SET_COMMENTS_INFO, result)
    console.log(result)
    return result
  },
  async getComments(store, params) {
    console.log('test')
    const result = await api.getComments(params)
    store.commit(type.SET_COMMENTS_INFO, result)
    console.log(result)
    return result
  },
  async insertComment(store, data) {
    const result = await api.insertComment(data)
    console.log(result)
    return result
  },
  async updateComment(store, params) {
    const id = params.id
    delete params.id
    const options = params
    const result = await api.updateComment(id, options)
    console.log(result)
    return result
  },
  async deleteComment(store, id) {
    const result = await api.deleteComment(id)
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
