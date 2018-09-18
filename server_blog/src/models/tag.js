const dbUtils = require('../util/db')
const table_name = 'tag'
const tag = {
  async insertTag(model) {
    model.create_time = +new Date()
    model.update_time = +new Date()
    let result = await dbUtils.insertData(table_name, model)
    return result
  },
  async getTags({ page = 1, pageSize = 10 } = {}) {
    let result = []
    const _sql = `select * from tag limit ${(page - 1) *
      pageSize}, ${pageSize} `
    result = await dbUtils.query(_sql)
    return result
  },
  async deleteTag(tid) {
    const _sql = `delete from ${table_name} where tag_id = ${tid}`
    return dbUtils.query(_sql)
  },
  async updateTag(tid, options) {
    const result = await dbUtils.updateData(table_name, options, tid)
    return result
  }
}

module.exports = tag
