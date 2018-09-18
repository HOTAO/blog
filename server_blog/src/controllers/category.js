const db_category = require('../models/category')
const db_article = require('../models/article')
const md5 = require('../util/md5')

const category = {
  async insertCateGory(ctx) {
    const postData = ctx.request.body
    const list = await db_category.getCateGorys()
    const categoryKeyList = []
    list.map(item => {
      categoryKeyList[item.name] = true
    })
    if (categoryKeyList[postData.name]) {
      console.log(categoryKeyList[postData.name])
      ctx.status = 400
      ctx.body = { error: '当前分类已存在' }
      return
    }
    postData.id = md5.creatId()
    await db_category.insertCateGory(postData)
    ctx.body = { success: '添加成功' }
  },
  async deleteCateGoryById(ctx) {
    const category_id = ctx.query.category_id
    const options = { category_id: 0 }
    await db_article.updateArticleByCateGoryId(category_id, options)
    await db_category.deleteCateGoryById(category_id)
    ctx.body = {
      success: '删除成功'
    }
  },
  async updateCateGoryById(ctx) {
    const tagId = ctx.params.category_id
    const cateGoryOption = ctx.request.body
    await db_category.updateCateGory(tagId, cateGoryOption)
    ctx.body = { success: '更新成功' }
  },
  async getCateGory(ctx) {
    const list = await db_category.getCateGorys()
    ctx.body = { list }
  }
}

module.exports = category
