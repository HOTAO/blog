const db_friends = require('../models/friends')

const friends = {
  async insertFriends(ctx) {
    const postData = ctx.require.body
    await db_friends.insertFriend(postData)
    ctx.body = { success: '添加成功' }
  },
  async deleteFriendById(ctx) {
    await db_friends.deleteFriend(ctx.query.friend_id)
    ctx.body = { success: '删除成功' }
  },
  async updateFriend(ctx) {
    const friendId = ctx.params.id
    const friendOption = ctx.request.body
    await db_friends.updateFriendById(friendId, friendOption)
    ctx.body = { success: '更新成功' }
  },
  async getFriends(ctx) {
    const list = await db_friends.getFriends()
    ctx.body = { list }
  }
}

module.exports = friends
