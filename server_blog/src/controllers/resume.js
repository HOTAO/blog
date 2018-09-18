const db_resume = require('../models/resume')

const MyResume = {
  async insertMyResume(ctx) {
    const post_data = ctx.request.body
    await db_resume.insertMyResume(post_data)
    ctx.body = { success: '新增成功' }
  },
  async updateMyResume(ctx) {
    const id = ctx.params.id
    const options = ctx.request.body
    await db_resume.updateMyResume(id, options)
    ctx.body = { success: '更新成功' }
  },

  async getMyResume(ctx) {
    const result = await db_resume.getMyResume()
    ctx.body = result
  }
}
module.exports = MyResume
