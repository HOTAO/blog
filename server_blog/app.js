const Koa = require('koa')
const routers = require('./src/routers/index')
const cors = require('koa-cors')
const bodyParser = require('koa-bodyparser')

const app = new Koa()

app.use(
  cors({
    methods: ['GET', 'POST', 'DELETE', 'PATCH']
  })
)

app.use(bodyParser())

app.use(routers.routes()).use(routers.allowedMethods())

app.listen(4000, () => {
  console.log('监听4000端口')
})
