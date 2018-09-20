import * as type from '../types'
import api from '../../api/index'

const state = {
  categorysInfo: {},
  tagsInfo: {}
}

const getters = {
  categorysInfo: state => state.categorysInfo,
  tagsInfo: state => state.tagsInfo
}

const mutations = {
  [type.SET_CATEGORYS](state, data) {
    console.log(data)
    state.categorysInfo = data
  },
  [type.SET_TAGS](state, data) {
    console.log(data)
    state.tagsInfo = data
  }
}

const actions = {
  async getCategory(store, params) {
    console.log('test')
    const result = await api.getCategory(params)
    store.commit(type.SET_CATEGORYS, result)
    console.log(result)
    return result
  },
  async insertCategory(store, data) {
    const result = await api.insertCategory(data)
    console.log(result)
    return result
  },
  async updateCategory(store, params) {
    const id = params.id
    delete params.id
    const options = params
    const result = await api.updateCategory(id, options)
    console.log(result)
    return result
  },
  async deleteCategory(store, id) {
    const result = await api.deleteCategory(id)
    console.log(result)
    return result
  },

  async getTags(store, params) {
    const result = await api.getTags(params)
    store.commit(type.SET_TAGS, result)
    console.log(result)
    return result
  },
  async insertTag(store, data) {
    const result = await api.insertTag(data)
    console.log(result)
    return result
  },
  async updateTag(store, params) {
    const id = params.id
    delete params.id
    const options = params
    const result = await api.updateTag(id, options)
    console.log(result)
    return result
  },
  async deleteTag(store, id) {
    const result = await api.deleteTag(id)
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
