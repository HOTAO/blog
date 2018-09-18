const dbUtil = require('../util/db')
const table_name = 'friends'

const friends = {
  async insertFriend(model) {
    const result = await dbUtil.insertData(table_name, model)
    return result
  },
  async deleteFriend(id) {
    const result = await dbUtil.deleteDataById(table_name, id)
    return result
  },
  async updateFriendById(id, options) {
    const result = await dbUtil.updateData(table_name, options, id)
    return result
  },
  async getFriends(){
    const _sql = `select * from ${table_name}`
    const result = await dbUtil.query(_sql)
    return result
  }
}

module.exports = friends
