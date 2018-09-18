import request from '../axios'

export default {
  getUploadToken() {
    return request.get('/getUploadToken')
  }
}
