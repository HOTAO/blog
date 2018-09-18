const dbUtil = require('../util/db')
const table_name = 'friends_type'

const friendType = {
  async insertFriendType(model) {
    const result = await dbUtil.insertData(table_name, model)
    return result
  },
  async deleteFriendTypeById(id) {
    const result = await dbUtil.deleteDataById(table_name, id)
    return result
  },
  async updateFriendTypeById(options, id) {
    const result = await dbUtil.updateData(table_name, options, id)
    return result
  },
  async getFriendTypes() {
    const _sql = `select * from ${table_name}`
    const result = await dbUtil.query(_sql)
    return result
  }
}

module.exports = friendType
