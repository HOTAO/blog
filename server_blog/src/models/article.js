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
    query = query.replace('status', 'a.status')
    delete query.status
    let result = []
    const _sql = `
    select a.id as id, title, cover, pageview, a.status as status, isSecret, category_id, c.name as categoryName, a.create_time as createTime, a.update_time as updateTime, a.publish_time as publishTime, a.delete_time as deleteTime, content, html_content, a.dec from ${table_name} a left join category c on a.category_id = c.id  ${query}  order by a.create_time desc limit ${(page -
      1) *
      pageSize}, ${pageSize} `
    result = await dbUtils.query(_sql)
    result.map(item => {})
    return result
  },

  /**
   * @description 根据文章id数组，获取文章列表信息
   * @author HOTAO
   * @date 2018-09-19
   * @param {*} [{
   *     page = 1,
   *     pageSize = 10,
   *     status = '',
   *     aids = ''
   *   }={}]
   * @returns
   */
  async getArticlesByAids({
    page = 1,
    pageSize = 10,
    status = '',
    aids = ''
  } = {}) {
    let query = ''
    aids.map(item => {
      query += ` '${item}',`
    })
    query = query.substring(0, query.length - 1)
    let result = []
    const _sql = `
    select a.id as id, title, cover, pageview, a.status as status, isSecret, category_id, c.name as categoryName, a.create_time as createTime, a.update_time as updateTime, a.publish_time as publishTime, a.delete_time as deleteTime, content, html_content, a.dec from ${table_name} a left join category c on a.category_id = c.id  where a.id in (${query}) and a.status = '2' order by a.create_time desc limit ${(page -
      1) *
      pageSize}, ${pageSize} `
    result = await dbUtils.query(_sql)
    return result
  },

  /**
   * @description 根据aid获取文章详情
   * @author HOTAO
   * @date 2018-09-14
   * @param {String} aid
   * @returns
   */
  async getArticleInfoById(aid) {
    const _sql1 = `
    select a.id as id, title, cover, pageview, a.status as status, isSecret, category_id, c.name as categoryName, a.create_time as create_time, a.update_time as update_time, a.publish_time as publish_time, a.delete_time as deleteTime, content, html_content, a.dec from ${table_name} a left join category c on a.category_id = c.id  where a.id = '${aid}'`
    // const _sql2 = `SELECT tag_id, t.name as tag_name  from article_tag_mapper atm left join tag t on atm.tag_id = t.id where atm.article_id = '${aid}'`
    // tags = await dbUtils.query(_sql2)
    articleInfo = await dbUtils.query(_sql1)
    articleInfo[0].pageview += 1
    let options = { pageview: articleInfo[0].pageview }
    await dbUtils.updateData(table_name, options, aid)
    return { articleInfo }
  },

  /**
   * @description 根据文章id更新文章内容
   * @author HOTAO
   * @date 2018-10-16
   * @param {String} aid
   * @param {Object} options
   * @returns
   */
  async updateArticleById(aid, options) {
    const result = await dbUtils.updateData(table_name, options, aid)
    return result
  },

  /**
   * @description 修改文章的分类
   * @author HOTAO
   * @date 2018-10-16
   * @param {String} cid
   * @param {Object} options
   * @returns
   */
  async updateArticleByCateGoryId(cid, options) {
    const _sql = `UPDATE ${table_name} SET category_id = ${
      options.category_id
    } WHERE category_id = ${cid}`
    const result = await dbUtils.query(_sql)
    return result
  },

  /**
   * @description 修改文章状态
   * @author HOTAO
   * @date 2018-10-16
   * @param {String} aid
   * @param {Object} options
   * @returns
   */
  async updateArticleByStatus(aid, options) {
    const _sql = `UPDATE ${table_name} SET status = ${
      options.status
    } WHERE id = '${aid}'`
    const result = await dbUtils.query(_sql)
    return result
  },

  /**
   * @description 根据ID删除文章
   * @author HOTAO
   * @date 2018-10-16
   * @param {String} aid
   * @returns
   */
  async deleteArticleById(aid) {
    const result = await dbUtils.deleteDataById(table_name, aid)
    return result
  },

  /**
   * @description 获取文章列表的总数
   * @author HOTAO
   * @date 2018-10-16
   * @param {Object} [{ category_id = '', tag_id = '', status = 2 }={}]
   * @returns
   */
  async getArticlesCount({ category_id = '', tag_id = '', status = 2 } = {}) {
    let query = dbMethods.andWhere(arguments[0])
    const _sql = `select count(*) as total_count from ${table_name} ${query}`
    const result = await dbUtils.query(_sql)
    return result
  }
}
module.exports = article
