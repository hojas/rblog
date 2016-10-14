import 'babel-polyfill';
import path from 'path';
import Koa from 'koa';
import send from 'koa-send';
import mongoose from 'mongoose';
import views from 'koa-nunjucks-next';

import routes from './routes';

const app = new Koa();

// Use native promises
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/kblog');
mongoose.connection.on('error', console.error.bind(console, '连接数据库失败'));

app.use(views('../views'));
app.use(async (ctx, next) => {
    await send(ctx, ctx.path, { root: path.resolve(__dirname, '../static') });

    if (ctx.status === 404) {
        await next();
    }
});

routes(app);

app.listen(3000);

