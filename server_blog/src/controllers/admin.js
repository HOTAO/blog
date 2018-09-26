const db_admin = require('../models/admin')
const authEntication = require('../util/auth-entication')
const sysLog = require('../models/sys-log')

const admin = {
  async login(ctx) {
    const post_data = ctx.request.body
    const result = await db_admin.isHasUserByUserName(post_data.name)
    if (!result) {
      ctx.response.status = 400
      ctx.response.body = { error: '当前用户不存在' }
      return
    }

    const result = await db_admin.getOneByUserNameAndPassword(post_data)
    if (result.status === 200) {
      let authInfo = authEntication.generateToken({
        username: result.data.username,
        password: result.data.password
      })
      delete result.data.password
      await sysLog.insertSysLog(`管理员${result.data.username}登录了系统`)
      ctx.response.body = { userInfo: result, authInfo }
    } else {
      ctx.response.body = { result }
    }
  }
}

module.exports = admin
