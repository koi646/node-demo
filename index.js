const Koa = require('koa')
const app = new Koa()
app.use(async ctx => {
    ctx.body = 'Nodejs 运行成功'
})
app.listen(8080)
console.log('Node 服务启动成功', 'http://127.0.0.1:8080')