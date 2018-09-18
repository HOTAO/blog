import article from './modules/article'
import classify from './modules/classify'
import webConfig from './modules/web_config'
import common from './modules/common'
// import user from './modules/user'

const api = {
  ...article,
  ...classify,
  ...webConfig,
  ...common
}

export default api
