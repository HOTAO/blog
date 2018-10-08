import request from '../axios'

export default {
  getAllComments(params) {
    return request.get('/getAllComments', { params })
  },
  getComments(params) {
    return request.get('/getComments', { params })
  },
  insertComment(data) {
    return request.post('/verify/insertComment', data)
  },
  updateComment(cid, options) {
    return request.patch(`/verify/updateComment/${cid}`, options)
  },
  deleteComment(cid) {
    return request.delete(`/verify/deleteComment/${cid}`)
  }
}
