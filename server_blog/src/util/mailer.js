const nodemailer = require('nodemailer')

const _sendEmail = (comment, toEmail = '1019872217@qq.com') => {
  nodemailer.createTestAccount((err, account) => {
    let transport = nodemailer.createTransport({
      host: 'smtp.qq.com',
      port: '465',
      auth: {
        user: '1019872217@qq.com',
        pass: 'dtyozfyfvfyvbbdf'
      }
    })
    let options = {
      from: '1019872217@qq.com',
      to: toEmail,
      subject: 'HoTao的博客',
      text: `来自${comment.name}的留言：${comment.content}`
    }
    transport.sendMail(options, (error, info) => {
      if (error) {
        console.log('邮件发送错误', error)
      } else {
        console.log('邮件发送成功', info.messageId)
      }
    })
  })
}

module.exports = { _sendEmail }
