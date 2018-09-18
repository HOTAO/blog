const dbUtils = require('../util/db')
const db_method = require('../util/db-methods')
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
  }
}

module.exports = category
