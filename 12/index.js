
const Koa = require('koa')
const app = new Koa()
const compose = require('koa-compose');

const logger = (ctx , next) =>{
  console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
  next();
}


const main = ctx =>{
  ctx.response.body = 'hello world';
}
const middlewares = compose([logger,main])
app.use(middlewares)
app.listen(3000)
console.log('[demo] start-quick is start at http://localhost:3000/ ')