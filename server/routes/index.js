import koaRouter from 'koa-router';
import {
    user,
    Post,
    Category,
} from '../models';

const router = koaRouter();

function routes(app) {
    app.use(router.routes())
        .use(router.allowedMethods());

    router.get('/', async (ctx, next) => {
        await ctx.render('home', {});
    });

    router.get('/api/posts', async (ctx, next) => {
        let posts = await Post.findByCate();
        ctx.body = posts;
    });
    router.get('/api/cates', async (ctx, next) => {
        let cates = await Category.findAll();
        ctx.body = cates;
    });

    router.get('*', async (ctx, next) => {
        await ctx.render('home', {});
    });
}

export default routes;

