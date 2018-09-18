const db_me = require('../models/me')

const aboutMe = {
  async insertMe(ctx) {
    const post_data = ctx.request.body
    await db_me.insertMe(post_data)
    ctx.body = { success: '添加成功' }
  },
  async updateMe(ctx) {
    const id = ctx.params.id
    const options = ctx.request.body
    await db_me.updateMe(id, options)
    ctx.body = { success: '更新成功' }
  },
  async getMe(ctx) {
    const result = await db_me.getMe()
    ctx.body = result
  }
}

module.exports = aboutMe
