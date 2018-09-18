import request from '../axios'

export default {
  getArticles(params) {
    return request.get('/getArticles', { params })
  },
  getArticleInfoById(aid) {
    return request.get(`/getArticleInfoById/${aid}`)
  },
  insertArticle(data) {
    return request.post('/insertArticle', data)
  },
  updateArticleById(aid, options) {
    return request.patch(`/updateArticleById/${aid}`, options)
  },
  updateArticleByCateGoryId(cid, options) {
    return request.patch(`/updateArticleByCateGoryId/${cid}`, options)
  },
  updateArticleByStatus(aid, options) {
    return request.patch(`/updateArticleByStatus/${aid}`, options)
  },
  deleteArticleById(aid) {
    return request.delete(`/deleteArticleById/${aid}`)
  }
}
