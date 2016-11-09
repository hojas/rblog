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
    // logout
    router.get('/api/logout', async (ctx, next) => {
        ctx.session.user = null;
        ctx.body = { status: 'success', msg: '退出成功', user: null };
    });
    // get current user
    router.get('/api/user', async (ctx, next) => {
        let user = ctx.session.user;
        if (user) {
            let data = {
                status: 'success',
                msg: '登陆成功',
                user,
            };
            ctx.body = data;
        } else {
            ctx.body = null;
        }
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
        post.formatCreatedAt = post.prettyCreatedAt;
        ctx.body = post;
    });
    // save a new post
    router.post('/api/post/new', async (ctx, next) => {
        let body = ctx.request.body;
        let author = ctx.session.user.username;
        let title = body.title;
        let content = body.content;
        let tags = body.tags.trim().split(/\s*,\s*/);
        let category = body.category.split(',');
        category = { name: category[0], url: category[1] };

        let post = new Post({
            id: 0,
            title,
            content,
            author,
            category,
            tags,
        });

        ctx.body = await Post.add(post);
    });

    // render home page again
    router.get('*', async (ctx, next) => {
        await ctx.render('home');
    });
}

export default routes;

