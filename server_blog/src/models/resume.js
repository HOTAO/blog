const dbUtils = require('../util/db')
const table_name = 'pages'

const MyResume = {
  async insertMyResume(model) {
    const result = dbUtils.insertData(table_name, model)
    return result
  },
  async updateMyResume(id, options) {
    const result = dbUtils.updateData(table_name, options, id)
    return result
  },
  async getMyResume() {
    const _sql = `select * from ${table_name} where type = 'resume'`
    const result = dbUtils.query(_sql)
    return result
  }
}

module.exports = MyResume
