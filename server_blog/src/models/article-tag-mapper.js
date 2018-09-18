const dbUtils = require('../util/db')
const tableNmae = 'article_tag_mapper'

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
