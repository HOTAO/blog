const dbFriendType = require('../models/friend-type')

const friendType = {
  async insertFriendType(ctx) {
    const postData = ctx.require.body
    await dbFriendType.insertFriendType(postData)
    ctx.body = { success: '添加成功' }
  },
  async deleteFriendTypeById(ctx) {
    await dbFriendType.deleteFriendTypeById(ctx.query.friend_id)
    ctx.body = { success: '删除成功' }
  },
  async updateFriendType(ctx) {
    const friendId = ctx.params.id
    const friendOption = ctx.request.body
    await dbFriendType.updateFriendTypeById(friendId, friendOption)
    ctx.body = { success: '更新成功' }
  },
  async getFriendTypes(ctx) {
    const list = await dbFriendType.getFriendTypes()
    ctx.body = { list }
  }
}

module.exports = friendType
