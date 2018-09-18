const db_article = require('../models/article')
const db_tag = require('../models/tag')
const db_article_tag_mapper = require('../models/article-tag-mapper')
const md5 = require('../util/md5')

const articleController = {
  /**
   * @description 获取articleList
   * @author HOTAO
   * @date 2018-09-04
   * @param {*} ctx
   */
  async getArticles(ctx) {
    const list = await db_article.getArticles(ctx.query)
    const count = await db_article.getArticlesCount(ctx.query)
    ctx.body = { list, count: count[0].total_count || 0 }
  },

  /**
   * @description 根据ID获取文章详细信息
   * @author HOTAO
   * @date 2018-09-14
   * @param {*} ctx
   */
  async getArticleInfoById(ctx) {
    const article_id = ctx.params.article_id
    const result = await db_article.getArticleInfoById(article_id)
    ctx.body = { articleInfo: result.articleInfo[0], tags: tags }
  },

  /**
   * @description 添加article
   * @author HOTAO
   * @date 2018-09-04
   * @param {*} ctx
   */
  async insertArticle(ctx) {
    const now = +new Date()
    const post_data = ctx.request.body
    const a_id = md5.creatId()
    const article = {
      id: a_id,
      title: post_data.title,
      cover: post_data.cover,
      dec: post_data.dec,
      content: post_data.content,
      html_content: post_data.htmlContent,
      cover: post_data.cover,
      category_id: post_data.category_id,
      create_time: now,
      update_time: now,
      status: 2
    }
    // post_data.create_time = parseInt(now / 1000)
    await db_article.insertArticle(article)

    const tags = JSON.parse(post_data.tags)
    // 获取所有的tags
    const result_tags = await db_tag.getTags()
    // 用tagId做属性名，值都为true，用于判断参数中的tag在表中是否已经存在，不存在的，需要插入数据表（两个单独的循环，比两个循环嵌套，要科学得多）
    const tagListKeys = {}
    result_tags.map(item => {
      tagListKeys[item.id] = true
    })
    tags.map(async tag => {
      let tagId = tag
      // 判断是否已经有该tag，没有的话就添加一个新的tag
      if (!tagListKeys[tag]) {
        tagId = md5.creatId()
        await db_tag.insertTag({
          id: tagId,
          name: tag
        })
      }
      // 新增一条tag与article的映射
      db_article_tag_mapper.insertArticleTagMapper({
        article_id: a_id,
        tag_id: tagId
      })
    })

    const result = { status: 200, message: '添加成功' }
    ctx.status = result.status
    ctx.body = result
  },

  /**
   * @description 根据id修改article
   * @author HOTAO
   * @date 2018-09-05
   * @param {*} ctx
   */
  async updateArticleById(ctx) {
    const now = +new Date()
    const post_data = ctx.request.body
    const article_id = ctx.params.id
    console.log(ctx.params.id)
    const article = {
      title: post_data.title,
      cover: post_data.cover,
      dec: post_data.dec,
      content: post_data.content,
      html_content: post_data.htmlContent,
      cover: post_data.cover,
      category_id: post_data.category_id,
      update_time: now,
      status: 2
    }
    // post_data.create_time = parseInt(now / 1000)
    await db_article.updateArticleById(article_id, article)

    const tags = JSON.parse(post_data.tags)
    // 获取所有的tags
    const result_tags = await db_tag.getTags()
    // 用tagId做属性名，值都为true，用于判断参数中的tag在表中是否已经存在，不存在的，需要插入数据表（两个单独的循环，比两个循环嵌套，要科学得多）
    const tagListKeys = {}
    result_tags.map(item => {
      tagListKeys[item.id] = true
    })
    // 循环处理tag与article之前，先把该文章的所有映射删掉
    await db_article_tag_mapper.deleteArticleTagMapperByArticleId(article_id)
    // 循环处理tag与article
    tags.map(async tag => {
      let tagId = tag
      // 判断是否已经有该tag，没有的话就添加一个新的tag
      if (!tagListKeys[tag]) {
        tagId = md5.creatId()
        await db_tag.insertTag({
          id: tagId,
          name: tag
        })
      }
      // 新增一条tag与article的映射
      db_article_tag_mapper.insertArticleTagMapper({
        article_id: article_id,
        tag_id: tagId
      })
    })

    const result = { status: 200, message: '修改成功' }
    ctx.status = result.status
    ctx.body = result
  },
  async updateArticleByStatus(ctx) {
    const post_data = ctx.request.body
    const article_id = ctx.params.id
    await db_article.updateArticleByStatus(article_id, post_data)
    const result = { status: 200, message: '删除成功' }
    ctx.status = result.status
    ctx.body = result
  },
  async deleteArticleById(ctx) {
    await db_article.deleteArticleById(ctx.query.id)
  }
}

module.exports = articleController
