import request from '../axios'

export default {
  getWebConfig() {
    return request.get('/getWebConfig')
  },
  insertWebConfig(data) {
    console.log(data)
    return request.post('/insertWebConfig', data)
  },
  updateWebConfig(id, data) {
    return request.patch(`/updateWebConfig/${id}`, data)
  },

  getResume() {
    return request.get('/getResume')
  },
  insertResume(data) {
    return request.post('/insertResume', data)
  },
  updateResume(id, data) {
    return request.patch(`/updateResume/${id}`, data)
  },

  getMe() {
    return request.get('/getMe')
  },
  insertMe(data) {
    return request.post('/insertMe', data)
  },
  updateMe(id, data) {
    return request.patch(`/updateMe/${id}`, data)
  },

  getFriends(params) {
    return request.get('/getFriends', { params })
  },
  insertFriend(data) {
    return request.post('/insertFriend', data)
  },
  deleteFriend(fid) {
    return request.delete(`/deleteFriend/${fid}`)
  },
  updateFriend(fid, data) {
    return request.patch(`/updateFriend/${fid}`, data)
  },

  getFriendType(params) {
    return request.get('/getFriendType', { params })
  },
  insertFriendType(data) {
    return request.post('/insertFriendType', data)
  },
  deleteFriendType(ftid) {
    return request.delete(`/deleteFriendType${ftid}`)
  },
  updateFriendType(ftid, data) {
    return request.patch(`/updateFriendType/${ftid}`, data)
  }
}
