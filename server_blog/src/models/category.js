const dbUtils = require('../util/db')
const dbMethod = require('../util/db-methods')
const table_name = 'category'

const category = {
  async insertCateGory(model) {
    model.create_time = +new Date()
    model.update_time = +new Date()
    const result = await dbUtils.insertData(table_name, model)
    return result
  },
  async deleteCateGoryById(cid) {
    const result = await dbUtils.deleteDataById(table_name, cid)
    return result
  },
  async updateCateGory(cid, options) {
    const result = await dbUtils.updateData(table_name, options, cid)
    return result
  },
  async getCateGorys({ page = 1, pageSize = 10 } = {}) {
    const _sql = `select * from category limit ${(page - 1) *
      pageSize}, ${pageSize} `
    const result = await dbUtils.query(_sql)
    return result
  },
  async getCateGoryCount({ status = 1 } = {}) {
    let query = dbMethod.andWhere(arguments[0])
    const _sql = `select count(*) as total_count from ${table_name} ${query}`
    const result = await dbUtils.query(_sql)
    return result
  },
  async getCateGoryNameById(id) {
    const _sql = `select name from ${table_name} where id = ${id}`
    const result = await dbUtils.query(_sql)
    return result
  }
}

module.exports = category
