const dbUtils = require('../util/db')
const table_name = 'web_config'

const webConfig = {
  async insertConfig(model) {
    console.log('model:', model)
    const result = await dbUtils.insertData(table_name, model)
    return result
  },
  async updateConfig(id, options) {
    const result = await dbUtils.updateData(table_name, options, id)
    return result
  },
  async getConfig() {
    const _sql = `select * from ${table_name}`
    const result = await dbUtils.query(_sql)
    console.log(result)
    return result
  }
}

module.exports = webConfig
