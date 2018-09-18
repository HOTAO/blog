import * as type from '../types'
import api from '../../api/index'

const state = {
  articleListInfo: {},
  articleData: {}
}

const getters = {
  articleListInfo: state => state.articleListInfo,
  articleData: state => state.articleData
}

const mutations = {
  [type.SET_ARTICLE_LIST_INFO](state, data) {
    state.articleListInfo = data
  },
  [type.SET_ARTICLEINFO](state, data) {
    state.articleData = data
  }
}

const actions = {
  async getArticles(store, params) {
    const result = await api.getArticles(params)
    store.commit(type.SET_ARTICLE_LIST_INFO, result)
    return result
  },
  async getArticleInfoById(store, aid) {
    const result = await api.getArticleInfoById(aid)
    store.commit(type.SET_ARTICLEINFO, result)
    return result
  },
  async insertArticle(store, data) {
    const result = await api.insertArticle(data)
    return result
  },
  async updateArticleById(store, params) {
    const aid = params.aid
    delete params.aid
    const options = params
    const result = await api.updateArticleById(aid, options)
    return result
  },
  async updateArticleByCateGoryId(store, params) {
    const cid = params.cid
    delete params.cid
    const options = params
    const result = await api.updateArticleByCateGoryId(cid, options)
    return result
  },
  async updateArticleByStatus(stote, params) {
    const aid = params.aid
    delete params.aid
    const options = params
    const result = await api.updateArticleByStatus(aid, options)
    return result
  },
  async deleteArticleById(store, aid) {
    const result = await api.deleteArticleById(aid)
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
