import * as type from '../types'
import api from '../../api/index'

const state = {
  screenInfo: {},
  isBackEnd: false,
  uploadToken: {},
  staticleInfo: {},
  syslogInfo: {},
  articleMenuInfo: [],
  articleMenuTag: '',
  hasArticleMenu: false,
  sourceArticleMenuInfo: [],
  rightNavStatus: false
}

const getters = {
  isBackEnd: state => state.isBackEnd,
  uploadToken: state => state.uploadToken,
  staticleInfo: state => state.staticleInfo,
  syslogInfo: state => state.syslogInfo,
  screenInfo: state => state.screenInfo,
  articleMenuInfo: state => state.articleMenuInfo,
  articleMenuTag: state => state.articleMenuTag,
  hasArticleMenu: state => state.hasArticleMenu,
  sourceArticleMenuInfo: state => state.sourceArticleMenuInfo,
  rightNavStatus: state => state.rightNavStatus
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
  },
  [type.SET_ARTICLE_MENU_INFO](state, data) {
    state.articleMenuInfo = data
  },
  [type.SET_ARTICLE_MENU_TAG](state, data) {
    state.articleMenuTag = data
  },
  [type.SET_ARTICLE_MENU_STATUS](state, data) {
    state.hasArticleMenu = data
  },
  [type.SET_SCORE_ARTICLE_MENU_INFO](state, data) {
    state.sourceArticleMenuInfo = data
  },
  [type.SET_RIGHT_NAV_STATUS](state, data) {
    state.rightNavStatus = data
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
  },
  async uploadToQiniu(store, params) {
    const result = await api.uploadToQiniu(params)
    return result
  },
  async setArticleMenuInfo(store, data) {
    store.commit(type.SET_ARTICLE_MENU_INFO, data)
  },
  async setArticleMenuTag(store, data) {
    store.commit(type.SET_ARTICLE_MENU_TAG, data)
  },
  async setArticleMenuStatus(store, data) {
    store.commit(type.SET_ARTICLE_MENU_STATUS, data)
  },
  async setSourceArticleMenuInfo(store, data) {
    store.commit(type.SET_SCORE_ARTICLE_MENU_INFO, data)
  },
  async setRightNavStatus(store, data) {
    store.commit(type.SET_RIGHT_NAV_STATUS, data)
  }
}

export default {
  // namespaced: true,
  state,
  mutations,
  getters,
  actions
}
