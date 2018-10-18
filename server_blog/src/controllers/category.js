const db_category = require('../models/category')
const db_article = require('../models/article')
const md5 = require('../util/md5')
const sysLog = require('../models/sys-log')

const category = {
  async insertCateGory(ctx) {
    const postData = ctx.request.body
    const list = await db_category.getCateGorys()
    const categoryKeyList = []
    list.map(item => {
      categoryKeyList[item.name] = true
    })
    if (categoryKeyList[postData.name]) {
      ctx.status = 400
      ctx.body = { error: '当前分类已存在' }
      return
    }
    postData.id = md5.creatId()
    await db_category.insertCateGory(postData)
    await sysLog.insertSysLog(
      `管理员${global.userInfo.username}添加了新分类“${postData.name}”`
    )
    ctx.body = { success: '添加成功' }
  },
  async deleteCateGoryById(ctx) {
    const category_id = ctx.params.id
    const options = { category_id: 'default' }
    const categoryName = await db_category.getCateGoryNameById(category_id)
    await db_article.updateArticleByCateGoryId(category_id, options)
    const oldCategory = await db_category.getCateGoryById( category_id )
    const defaultGategory = await db_category.getCateGoryById('default')
    await db_category.updateCateGory('default', {
      article_count:
        defaultGategory[0].article_count + oldCategory[0].article_count
    })
    await db_category.deleteCateGoryById(category_id)
    await sysLog.insertSysLog(
      `管理员${global.userInfo.username}删除了分类“${categoryName}”`
    )
    ctx.body = {
      success: '删除成功'
    }
  },
  async updateCateGoryById(ctx) {
    const tagId = ctx.params.category_id
    const cateGoryOption = ctx.request.body
    const oldName = await db_category.getCateGoryNameById(category_id)
    await db_category.updateCateGory(tagId, cateGoryOption)
    const newName = await db_category.getCateGoryNameById(category_id)
    await sysLog.insertSysLog(
      `管理员${global.userInfo.username}修改了分类“${oldName}”为“${newName}”`
    )
    ctx.body = { success: '更新成功' }
  },
  async getCateGory(ctx) {
    const list = await db_category.getCateGorys()
    const count = await db_category.getCateGoryCount()
    ctx.body = { list, count: count[0].total_count || 0 }
  }
}

module.exports = category
