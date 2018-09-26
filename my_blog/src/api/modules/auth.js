import request from '../axios'

export default {
  login(data) {
    return request.post('/login', data)
  }
}
