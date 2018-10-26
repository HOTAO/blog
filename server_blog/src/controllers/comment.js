const db_comment = require('../models/comment')
const mailer = require('../util/mailer')
const comment = {
  async insertComment(ctx) {
    const postData = ctx.request.body
    // 回复
    if (Number(postData.reply_id)) {
      const result = await db_comment.getCommentsByOptions({
        id: postData.reply_id
      })
      if (result.length <= 0) {
        ctx.body = { error: '回复的评论已经不存在了~' }
      }
      /* 
       * 判断回复的评论是否有父id
       * 有，说明回复的评论也是子评论，则把当前评论的父ID设置为回复评论的父id
       * 无，说明回复的评论是一级评论（即父评论），则把当前评论的父ID设置为回复评论的id
      */
      postData.parent_id = result[0].parent_id
        ? result[0].parent_id
        : result[0].id
      // 评论者 有邮箱
      if (postData.email && global.clientIp !== '127.0.0.1') {
        // 被评论者有邮箱，且与评论者不为同一个邮箱
        if (result[0].email && result[0].email !== postData.email) {
          mailer._sendEmail(postData, result[0].email)
        }
      }
    } else {
      // 直接评论
      if (global.clientIp !== '127.0.0.1') mailer._sendEmail(postData)
    }
    const ipResults = await db_comment.getCommentInfoByOptions({
      ip: global.clientIp
    })
    if (ipResults.length > 0) {
      postData.avatar = ipResults[ipResults.length - 1].avatar
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
