import 'babel-polyfill';
import path from 'path';
import Koa from 'koa';
import koaRouter from 'koa-router';
import serve from 'koa-static';
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

app.use(serve(path.resolve('../static')));
app.use(views('../app', {}));
app.use(router.routes())
    .use(router.allowedMethods());

router.get('/', async (ctx, next) => {
    await ctx.render('home', {});
    await next();
});

router.get('/api/posts', async (ctx, next) => {
    let posts = await Post.find();
    ctx.body = posts;
    await next();
});

router.get('*', async (ctx, next) => {
    await ctx.render('home', {});
    await next();
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

