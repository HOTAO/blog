const dbUtils = require('../util/db')
const table_name = 'sys_log'

const sysLog = {
  /**
   * @description 添加系统日志记录
   * @author HOTAO
   * @date 2018-09-26
   * @param {*} model {content,ip}
   * @returns
   */
  async insertSysLog(model) {
    console.log('model:', model)
    model.time = +new Date()
    model.ip = global.clientIp
    const result = await dbUtils.insertData(table_name, model)
    return result
  }
}

module.exports = sysLog
