const db_config = require('../models/web-config')
const sysLog = require('../models/sys-log')

const config = {
  async insertConfig(ctx) {
    // const params = ctx.query
    const post_data = ctx.request.body
    if (post_data.settingPassword === 'true') {
      if (post_data.view_password.trim() === '') {
        ctx.status = 400
        ctx.body = {
          error: '新密码不能为空'
        }
        return
      } else {
        // TODO 判断密码
        if (post_data.oldPassword !== '123456') {
          ctx.status = 400
          ctx.body = { error: '旧密码错误' }
          return
        }
      }
    }
    delete post_data.settingPassword
    delete post_data.oldPassword
    await db_config.insertConfig(post_data)
    await sysLog.insertSysLog(`管理员${global.userInfo.username}配置了博客基本信息`)
    ctx.body = { success: '新增成功' }
  },
  async updateConfig(ctx) {
    const configId = ctx.params.id
    const configOption = ctx.request.body
    await db_config.updateConfig(configId, configOption)
    await sysLog.insertSysLog(`管理员${global.userInfo.username}更新了博客基本信息`)
    ctx.body = { success: '更新成功' }
  },

  async getConfig(ctx) {
    const result = await db_config.getConfig()
    ctx.body = result
  }
}

module.exports = config
