const dbUtils = require('../util/db')
const dbMethods = require('../util/db-methods')
const table_name = 'article'

const article = {
  /**
   * @description 新增文章
   * @author HOTAO
   * @date 2018-07-09
   * @param {object} model article数据模型
   * @returns {object}     mysql执行结果
   */
  async insertArticle(model) {
    let result = await dbUtils.insertData('article', model)
    return result
  },

  /**
   * @description 获取文章列表
   * @author HOTAO
   * @date 2018-09-05
   * @param {*} [{
   *     page = 1,
   *     pageSize = 10,
   *     status = '',
   *     keyword = '',
   *     tag = ''
   *   }={}]
   * @returns
   */
  async getArticles({
    page = 1,
    pageSize = 10,
    status = '',
    keyword = '',
    tag = ''
  } = {}) {
    let query = arguments[0] ? dbMethods.andWhere(arguments[0]) : ''
    console.log(query)
    query = query.replace('status', 'a.status')
    delete query.status
    console.log(query)
    let result = []
    const _sql = `
    select a.id as id, title, cover, pageview, a.status as status, isSecret, category_id, c.name as categoryName, a.create_time as createTime, a.update_time as updateTime, a.publish_time as publishTime, a.delete_time as deleteTime, content, html_content from ${table_name} a left join category c on a.category_id = c.id  ${query} limit ${(page -
      1) *
      pageSize}, ${pageSize} `
    result = await dbUtils.query(_sql)
    return result
  },

  /**
   * @description 根据aid获取文章详情
   * @author HOTAO
   * @date 2018-09-14
   * @param {*} aid
   * @returns
   */
  async getArticleInfoById(aid) {
    const _sql1 = `
    select a.id as id, title, cover, pageview, a.status as status, isSecret, category_id, c.name as categoryName, a.create_time as create_time, a.update_time as update_time, a.publish_time as publish_time, a.delete_time as deleteTime, content, html_content, a.dec from ${table_name} a left join category c on a.category_id = c.id  where a.id = '${aid}'`
    const _sql2 = `SELECT tag_id, t.name as tag_name  from article_tag_mapper atm left join tag t on atm.tag_id = t.id where atm.article_id = '${aid}'`
    articleInfo = await dbUtils.query(_sql1)
    tags = await dbUtils.query(_sql2)
    return { articleInfo, tags }
  },
  async updateArticleById(aid, options) {
    const result = await dbUtils.updateData(table_name, options, aid)
    return result
  },
  async updateArticleByCateGoryId(cid, options) {
    const _sql = `UPDATE ${table_name} SET category_id = ${
      options.category_id
    } WHERE category_id = ${cid}`
    const result = await dbUtils.query(_sql)
    return result
  },
  async updateArticleByStatus(aid, options) {
    const _sql = `UPDATE ${table_name} SET status = ${
      options.status
    } WHERE id = '${aid}'`
    const result = await dbUtils.query(_sql)
    return result
  },
  async deleteArticleById(aid) {
    const result = await dbUtils.deleteDataById(table_name, aid)
    return result
  },
  async getArticlesCount({ category_id = '', tag_id = '' } = {}) {
    let query = dbMethods.andWhere(arguments[0])
    const _sql = `select count(*) as total_count from ${table_name} ${query}`
    const result = await dbUtils.query(_sql)
    return result
  }
}
module.exports = article
