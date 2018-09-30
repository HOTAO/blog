const dbUtil = require('../util/db')
const dbMethods = require('../util/db-methods')
const table_name = 'comments'

const friends = {
  /**
   * @description
   * @author HOTAO
   * @date 2018-09-30
   * @param {*} model {article_id,parent_id,reply_id,name,email,content,is_author}
   * @returns
   */
  async insertComment(model) {
    model.create_time = +new Date()
    const result = await dbUtil.insertData(table_name, model)
    return result
  },
  async deleteComment(id) {
    const result = await dbUtil.deleteDataById(table_name, id)
    return result
  },
  async updateCommentById(id, options) {
    const result = await dbUtil.updateData(table_name, options, id)
    return result
  },
  async getComments({ page = 1, pageSize = 10 } = {}) {
    let query = arguments[0] ? dbMethods.andWhere(arguments[0]) : ''
    const _sql = `select * from ${table_name} ${query} limit ${(page - 1) *
      pageSize}, ${pageSize}` 
    const result = await dbUtil.query(_sql)
    return result
  }
}

module.exports = friends
