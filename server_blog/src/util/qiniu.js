const QN = require('qiniu')

const accessKey = 'Jkw4SrEzYOOf6_oHvczDjtfH0igsPEClGJdUsRQ4',
  secretKey = 'PuSZo74LajRKVwNgayZpvXRgG0gcjbtdHqGSFaKo',
  expires = 7200,
  Bucket = 'hotaoblog',
  keyToOverwrite = ''

let putPolicy = null

const options = {
  scope: Bucket,
  expires,
  returnBody: `{
    "url": "http://pez46i4f2.bkt.clouddn.com/$(key)"
  }`
}
const config = new QN.conf.Config()
// 空间对应的机房
config.zone = QN.zone.Zone_z2

const qiniu = {
  async getUploadToken() {
    putPolicy = new QN.rs.PutPolicy(options)
    const mac = new QN.auth.digest.Mac(accessKey, secretKey)
    const uploadToken = putPolicy.uploadToken(mac)
    return uploadToken
  }
}

module.exports = qiniu
