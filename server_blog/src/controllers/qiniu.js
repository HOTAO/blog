const QN = require('../util/qiniu')

const qiniu = {

  /**
   * @description 获取七牛token
   * @author HOTAO
   * @date 2018-09-13
   * @param {*} ctx
   */
  async getUploadToken(ctx) {
    const token = await QN.getUploadToken()
    ctx.body = { token }
  }
}

module.exports = qiniu
