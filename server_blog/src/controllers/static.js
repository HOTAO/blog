const db_article = require('../models/article')
const db_category = require('../models/category')
const db_tag = require('../models/tag')

const MyResume = {
  async getHomeStatistics(ctx) {
    const publish_count = await db_article.getArticlesCount({ status: 2 })
    const drafts_count = await db_article.getArticlesCount({ status: 1 })
    const deleted_count = await db_article.getArticlesCount({ status: 0 })
    const category_count = await db_category.getCateGoryCount()
    const tag_count = await db_tag.getTagsCount()
    // TODO 评论功能
    // const comments_count = await db_article.getArticlesCount({ status: 2 })

    ctx.body = {
      publish_count: publish_count[0].total_count,
      drafts_count: drafts_count[0].total_count,
      deleted_count: deleted_count[0].total_count,
      category_count: category_count[0].total_count,
      tag_count: tag_count[0].total_count
    }
  }
}
module.exports = MyResume
