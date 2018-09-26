import article from './modules/article'
import classify from './modules/classify'
import webConfig from './modules/web_config'
import common from './modules/common'
import auth from './modules/auth'

const api = {
  ...article,
  ...classify,
  ...webConfig,
  ...common,
  ...auth
}

export default api
