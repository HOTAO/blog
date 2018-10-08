const db_comment = require('../models/comment')

const comment = {
  async insertComment(ctx) {
    const postData = ctx.request.body
    if (Number(postData.reply_id)) {
      const result = await db_comment.getCommentsByOptions({
        id: postData.reply_id
      })
      if (result.length <= 0) {
        ctx.body = { error: '回复的评论已经不存在了~' }
      }
      postData.parent_id = result[0].parent_id ? result[0].parent_id : result[0].id
    }
    await db_comment.insertComment(postData)
    ctx.body = { success: '添加成功' }
  },
  async deleteCommentById(ctx) {
    await db_comment.deleteComment(ctx.params.id)
    ctx.body = { success: '删除成功' }
  },
  async updateComment(ctx) {
    const commentId = ctx.params.id
    const commentOption = ctx.request.body
    await db_comment.updateCommentById(commentId, commentOption)
    ctx.body = { success: '更新成功' }
  },
  async getComments(ctx) {
    const list = await db_comment.getComments(ctx.query)
    const count = await db_comment.getCommentsCounts(ctx.query)
    ctx.body = { list, count: count[0].total_count || 0 }
  },
  async getAllComments(ctx) {
    const list = await db_comment.getAllComments(ctx.query)
    const count = await db_comment.getCommentsCounts(ctx.query)
    ctx.body = { list, count: count[0].total_count || 0 }
  }
}

module.exports = comment
