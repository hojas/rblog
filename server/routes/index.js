import koaRouter from 'koa-router';
import {
    User,
    Category,
    Post,
} from '../models';

const router = koaRouter();

function routes(app) {
    app.use(router.routes())
        .use(router.allowedMethods());

    // render home page
    router.get('/', async (ctx, next) => {
        await ctx.render('home');
    });

    // login
    router.post('/api/login', async (ctx, next) => {
        let email = ctx.request.body.email;
        let password = ctx.request.body.password;
        ctx.body = await User.login(ctx, email, password);
    });
    // register
    router.post('/api/register', async (ctx, next) => {
        let username = ctx.request.body.username;
        let email = ctx.request.body.email;
        let password = ctx.request.body.password;
        let repassword = ctx.request.body.repassword;

        if (password !== repassword) {
            return ctx.body = { status: 'error', msg: '两次密码不一致', user: null };
        }

        let user = new User({
            username,
            email,
            password,
        });
        ctx.body = await User.add(ctx, user);
    });
    // get all categories
    router.get('/api/cates', async (ctx, next) => {
        let cates = await Category.findAll();
        ctx.body = cates;
    });
    // get a category by url
    router.get('/api/cate/:url', async (ctx, next) => {
        let url = ctx.params.url;
        let category = await Category.findByUrl(url);

        if (category.status !== 'error') {
            let posts = await Post.findByCate(category);
            ctx.body = posts;
        } else {
            ctx.body = category;
        }
    });
    // get all posts
    router.get('/api/posts', async (ctx, next) => {
        let posts = await Post.findByCate();
        ctx.body = posts;
    });
    // get a post by id
    router.get('/api/post/:id', async (ctx, next) => {
        let id = ctx.params.id;
        let post = await Post.findById(id);

        post.content = post.marked;
        ctx.body = post;
    });

    // render home page again
    router.get('*', async (ctx, next) => {
        await ctx.render('home');
    });
}

export default routes;

