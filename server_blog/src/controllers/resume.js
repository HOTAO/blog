const db_resume = require('../models/resume')
const sysLog = require('../models/sys-log')

const MyResume = {
  async insertMyResume(ctx) {
    const post_data = ctx.request.body
    await db_resume.insertMyResume(post_data)
    await sysLog.insertSysLog(`管理员${global.userInfo.username}编辑了‘我的简历页面’`)
    ctx.body = { success: '新增成功' }
  },
  async updateMyResume(ctx) {
    const id = ctx.params.id
    const options = ctx.request.body
    await db_resume.updateMyResume(id, options)
    await sysLog.insertSysLog(`管理员${global.userInfo.username}编辑了‘我的简历页面’`)
    ctx.body = { success: '更新成功' }
  },

  async getMyResume(ctx) {
    const result = await db_resume.getMyResume()
    ctx.body = result
  }
}
module.exports = MyResume
