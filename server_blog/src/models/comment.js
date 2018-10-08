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
  async getCommentsByOptions(options) {
    let query = options ? dbMethods.andWhere(options) : ''
    const _sql = `select * from ${table_name} ${query}`
    const result = await dbUtil.query(_sql)
    return result
  },
  async getComments({ page = 1, pageSize = 10 } = {}) {
    let query = arguments[0] ? dbMethods.andWhere(arguments[0]) : ''
    let query1 = query + ' and parent_id = 0 and status = 0'
    const _sql1 = `select * from ${table_name} ${query1} limit ${(page - 1) *
      pageSize}, ${pageSize}`
    const result = await dbUtil.query(_sql1)
    const len = result.length
    for (let index = 0; index < len; index++) {
      let item = result[index]
      let query2 = query + ` and parent_id = ${item.id} and status = 0`
      const _sql2 = `select * from ${table_name} ${query2} limit ${(page - 1) *
        pageSize}, ${pageSize}`
      const children = await dbUtil.query(_sql2)
      item.children = children
    }
    return result
  },
  async getAllComments({ page = 1, pageSize = 10 } = {}) {
    let query = arguments[0] ? dbMethods.andWhere(arguments[0]) : ''
    const _sql = `select c.id,c.create_time,c.is_author,c.name,c.status,c.parent_id,c.reply_id,c.email,c.content,c.article_id,a.title from ${table_name} c left join article a on c.article_id = a.id ${query}  order by c.create_time desc limit ${(page -
      1) *
      pageSize}, ${pageSize}`
    const result = await dbUtil.query(_sql)
    return result
  },
  async getCommentsCounts({ articli_id = 0 } = {}) {
    let query = dbMethods.andWhere(arguments[0])
    const _sql = `select count(*) as total_count from ${table_name} ${query}`
    const result = await dbUtil.query(_sql)
    return result
  }
}

module.exports = friends
