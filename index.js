const Koa = require('koa')
const Router = require('koa-router')
const v1 = require('cloudevents-sdk/v1')
require('./event')
let config = {
    method: 'POST',
    url   : 'http://127.0.0.1:8080/event'
}
let binding = new v1.StructuredHTTPEmitter(config)
const app = new Koa()
const appRouter = new Router()
appRouter.get('/', async ctx => {
    ctx.body = 'Nodejs 运行成功'
})
appRouter.get('/emit', async ctx => {
    const event = v1.event()
    .type('com.github.pull.create')
    .source('urn:event:from:myapi:resource/123')
    .id('890b9492-abb0-4cd9-8230-38fb356105b9')
    .data('test-demo')
    const res = await binding.emit(event)
    console.log(res.data)
    ctx.body = {
        code: 0,
        data: res.data,
        msg: '触发成功'
    }

})
app.use(appRouter.routes())
    .use(appRouter.allowedMethods())
app.listen(8000, () => {
    console.log('Node 服务启动成功', 'http://127.0.0.1:8000')
})


