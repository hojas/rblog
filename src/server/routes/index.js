import koaRouter from 'koa-router';
import data from '../../../data.json';
import { User, Category, Post, Tag } from '../models';
import { user, post, category } from '../api';

const router = koaRouter();

function routes(app) {
    app.use(router.routes())
        .use(router.allowedMethods());

    user(router);
    post(router);
    category(router);

    // 添加初始数据
    router.get('*', async (ctx, next) => {
        data.users.map(async user => {
            let u = new User(user);
            await User.add(ctx, u);
        });
        return next();
    });
}

export default routes;

