import 'babel-polyfill';
import Koa from 'koa';

const app = new Koa();

app.use(async (ctx, next) => {
    ctx.body = 'hello';
});

app.listen(3000);


