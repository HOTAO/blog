const dbUtils = require('../util/db')
const table_name = 'pages'

const aboutMe = {
  async insertMe(model) {
    const result = await dbUtils.insertData(table_name, model)
    return result
  },
  async updateMe(id, options) {
    const result = await dbUtils.updateData(table_name, options, id)
    console.log(result)
    return result
  },
  async getMe() {
    const _sql = `select * from ${table_name} where type = 'me'`
    const result = await dbUtils.query(_sql)
    return result
  }
}

module.exports = aboutMe
