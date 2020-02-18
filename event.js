const Koa = require('koa')
const Router = require('koa-router')
const v1 = require('cloudevents-sdk/v1')
const structured = new v1.StructuredHTTPReceiver()
const http = require('http')
const bodyParser = require('koa-bodyparser')
const cloudEventApp = new Koa()
const cloudEventRouter = new Router()

cloudEventRouter.post('/event', async ctx => {
    ctx.body = ctx.request.body
})
cloudEventApp.use(bodyParser({
    onerror(e) {
        console.error(e)
    },
    extendTypes: {
        json: ['application/cloudevents+json']
    }
}))
cloudEventApp.use(cloudEventRouter.routes())
    .use(cloudEventRouter.allowedMethods())
cloudEventApp.listen(8080, () => {
    console.log('cloud Event 服务启动成功', 'http://127.0.0.1:8080')
})
// const server = http.createServer((req, res) => {
//     let data = ''
//     req.setEncoding("utf8")
//     req.on('data', function(chunk) {
//         data += chunk;
//     })
 
//     req.on('end', () => {
//         const event = structured.parse(data, req.headers)
   
//         console.log(event, '????')
//     })

// })
// server.listen(8080)
