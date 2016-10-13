import 'babel-polyfill';
import path from 'path';
import Koa from 'koa';
import koaRouter from 'koa-router';
import serve from 'koa-static';
import send from 'koa-send';
import mongoose from 'mongoose';
import views from 'koa-nunjucks-next';

const app = new Koa();
const router = koaRouter();

import User from './models/user';
import Post from './models/post';

// Use native promises
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/kblog');
mongoose.connection.on('error', console.error.bind(console, '连接数据库失败'));

//app.use(serve('../static'));
app.use(async (ctx, next) => {
    await send(ctx, ctx.path, { root: path.resolve(__dirname, '../static') });

    if (ctx.status === 404) {
        await next();
    }
});
app.use(views('../views'));
app.use(router.routes())
    .use(router.allowedMethods());

router.get('/', async (ctx, next) => {
    await ctx.render('home', {});
});

router.get('/api/posts', async (ctx, next) => {
    let posts = await Post.find();
    ctx.body = posts;
});

router.get('*', async (ctx, next) => {
    await ctx.render('home', {});
});

/*
router.post('/', async (ctx, next) => {
    let name = ctx.params.name;
    let email = ctx.params.email;

    let user = new User({
        username: name,
        password: '123456',
        email,
    });

    let msg = await User.add(user);

    return console.log('msg ', msg);
});
*/

app.listen(3000);

