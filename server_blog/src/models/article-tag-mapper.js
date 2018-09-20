const dbUtils = require('../util/db')
const tableNmae = 'article_tag_mapper'
const dbMethod = require('../util/db-methods')

const articleTagMapper = {
  async insertArticleTagMapper(model) {
    model.create_time = +new Date()
    let result = await dbUtils.insertData(tableNmae, model)
    return result
  },
  async getArticleTagMapper({ page = 1, pageSize = 10 } = {}) {
    let result = []
    const _sql = `select * from ${tableNmae} limit ${(page - 1) *
      pageSize}, ${pageSize} `
    result = await dbUtils.query(_sql)
    return result
  },

  /**
   * @description 根据标签id获取文章id列表
   * @author HOTAO
   * @date 2018-09-19
   * @param {*} tid
   * @returns
   */
  async getArticlesByTagId(tid) {
    const _sql = `select article_id from ${tableNmae} where tag_id = '${tid}'`
    console.log(_sql)
    const result = await dbUtils.query(_sql)
    return result
  },

  async getCount({ status = 1 } = {}){
    let query = dbMethod.andWhere(arguments[0])
    const _sql = `select count(*) as total_count from ${tableNmae} ${query}`
    const result = await dbUtils.query(_sql)
    return result
  },

  /**
   * @description 根据文章id获取标签id列表
   * @author HOTAO
   * @date 2018-09-19
   * @param {*} aid
   * @returns
   */
  async getTagsByArticleId(aid) {
    const _sql2 = `SELECT tag_id, t.name as tag_name  from ${tableNmae} atm left join tag t on atm.tag_id = t.id where atm.article_id = '${aid}'`
    tags = await dbUtils.query(_sql2)
    return tags
  },

  async deleteArticleTagMapperByTagId(tagId) {
    const _sql = `DELETE FROM ${tableNmae} WHERE tag_id = ${tagId}`
    await dbUtils.query(_sql)
    result = {
      success: '删除成功'
    }
  },
  async deleteArticleTagMapperByArticleId(articleId) {
    const _sql = `DELETE FROM ${tableNmae} WHERE article_id = '${articleId}'`
    await dbUtils.query(_sql)
    result = { success: '删除成功' }
  }
}
module.exports = articleTagMapper
