const moment = require('moment')
moment.locale('zh-cn')
export default function timestampFormatter(timestamp, format) {
  let result = ''
  timestamp = parseInt(timestamp, 0)
  if (!timestamp) {
    result = '-'
  } else if (format) {
    result = moment(timestamp).format(format)
  } else {
    result = moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
  }
  return result
}
