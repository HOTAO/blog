import request from '../axios'

export default {
  getCategory(params) {
    return request.get('/getCategory', { params })
  },
  insertCategory(data) {
    return request.post('/insertCategory', data)
  },
  updateCategory(cid, options) {
    return request.patch(`/updateCategory/${cid}`, options)
  },
  deleteCategory(cid) {
    return request.delete(`/deleteCategory/${cid}`)
  },

  getTags(params) {
    return request.get('/getTags', { params })
  },
  insertTag(data) {
    return request.post('/insertTag', data)
  },
  updateTag(tid, options) {
    return request.patch(`/updateTag/${tid}`, options)
  },
  deleteTag(tid) {
    return request.delete(`/deleteTag/${tid}`)
  }
}
