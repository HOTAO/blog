const db_syslog = require('../models/sys-log')

const syslog = {
  async getSysLog(ctx) {
    const list = await db_syslog.getSysLog(ctx.query)
    const count = await db_syslog.getSysLogCount()
    ctx.body = { list, count: count[0].total_count || 0 }
  }
}

module.exports = syslog
