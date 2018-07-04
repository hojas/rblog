const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const json = require('koa-json')
const logger = require('koa-logger')
const Router = require('koa-router')
const next = require('next')

const { connectMongo, initAdmin } = require('./db')
const routers = require('./routers')

const dev = process.env.NODE_ENV !== 'production'
const port = 8080
const app = next({ dir: 'src', dev })
const handle = app.getRequestHandler()

app.prepare().then(async () => {
  await connectMongo()
  initAdmin()

  const server = new Koa()
  server.keys = ['huppyrblog']
  const sessionConfig = {
    key: 'rblog:sss',
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
  }

  server.use(bodyParser())
  server.use(session(sessionConfig, server))
  server.use(json())
  server.use(logger())

  const router = new Router()
  routers(app, router)
  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.use(router.routes())
  server.listen(port, '0.0.0.0', () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})
