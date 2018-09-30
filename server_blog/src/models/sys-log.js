const dbUtils = require('../util/db')
const table_name = 'sys_log'

const sysLog = {
  /**
   * @description 添加系统日志记录
   * @author HOTAO
   * @date 2018-09-26
   * @param {*} content 日志内容
   * @returns
   */
  async insertSysLog(content) {
    const model = {}
    model.time = +new Date()
    model.ip = global.clientIp
    model.content = content
    const result = await dbUtils.insertData(table_name, model)
    return result
  },

  /**
   * @description 获取系统日志
   * @author HOTAO
   * @date 2018-09-26
   * @param {*} [{ page = 1, pageSize = 10 }={}]
   * @returns
   */
  async getSysLog({ page = 1, pageSize = 10 } = {}) {
    const _sql = `select * from ${table_name} limit ${(page - 1) *
      pageSize}, ${pageSize} `
    const result = await dbUtils.query(_sql)
    return result
  },

  async getSysLogCount() {
    const result = await dbUtils.count(table_name)
    return result
  }
}

module.exports = sysLog
