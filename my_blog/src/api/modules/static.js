import request from '../axios'

export default {
  get_home_statistics() {
    return request.get('/get_home_statistics')
  }
}
