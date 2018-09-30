const dbUtils = require('../util/db')
// const dbMethods = require('../util/db-methods')
const table_name = 'user'

const admin = {
  async isHasUserByUserName(username) {
    const _sql = `select user_id from ${table_name} where username = "${username}" limit 1;`
    console.log(_sql)
    const result = await dbUtils.query(_sql)
    return result.length > 0
  },
  /**
   * 根据用户名和密码查找用户
   * @param  {object} options 用户名密码对象
   * @return {object|null}         查找结果
   */
  async getOneByUserNameAndPassword(options) {
    let _sql = `
      SELECT * from ${table_name}
        where password="${options.password}" and username="${options.username}"
        limit 1`
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
      result = {
        status: 200,
        data: result[0]
      }
    } else {
      result = { status: 400, error: '密码不正确' }
    }
    return result
  }
}
module.exports = admin
