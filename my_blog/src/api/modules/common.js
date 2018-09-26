import request from '../axios'

export default {
  getUploadToken() {
    return request.get('/getUploadToken')
  },
  getHomeStatistics() {
    return request.get('/verify/getHomeStatistics')
  }
}
