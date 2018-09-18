const db_tag = require('../models/tag')
const db_article_tag_mapper = require('../models/article-tag-mapper')
const md5 = require('../util/md5')

const tag = {
  async insertTag(ctx) {
    const postData = ctx.request.body
    const list = await db_tag.getTags()
    const tagKeyList = []
    list.map(item => {
      tagKeyList[item.name] = true
    })
    if (tagKeyList[postData.name]) {
      console.log(tagKeyList[postData.name])
      ctx.status = 400
      ctx.body = { error: '当前标签已存在' }
      return
    }
    postData.id = md5.creatId()
    await db_tag.insertTag(postData)
    ctx.body = { success: '添加成功' }
  },
  async deleteTagById(ctx) {
    await db_article_tag_mapper.deleteArticleTagMapperByTagId(ctx.query.tag_id)
    await db_tag.deleteTags(ctx.query.tag_id)
    ctx.body = { success: '删除成功' }
  },
  async updateTag(ctx) {
    const tagId = ctx.params.id
    const tagOption = ctx.request.body
    await db_tag.updateTag(tagId, tagOption)
    ctx.body = { success: '更新成功' }
  },
  async getTags(ctx) {
    const list = await db_tag.getTags()
    ctx.body = { list }
  }
}

module.exports = tag
