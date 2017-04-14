import { User } from '../models';

export default function(router) {
    router.post('/api/login', async (ctx, next) => {
        let {
            email,
            password,
        } = ctx.request.body;

        ctx.body = await User.login(ctx, email, password);
    });

    router.post('/api/register', async (ctx, next) => {
        let {
            username,
            email,
            password,
            repassword,
        } = ctx.request.body;

        if (password !== repassword) {
            return ctx.body = {
                status: 'error',
                msg: '两次密码不一致',
                user: null,
            };
        }

        let user = new User({
            username,
            email,
            password,
        });
        ctx.body = await User.add(ctx, user);
    });

    router.get('/api/logout', async (ctx, next) => {
        ctx.session.user = null;
        ctx.body = {
            status: 'success',
            msg: '退出成功',
            user: null
        };
    });

    router.get('/api/user', async (ctx, next) => {
        let user = ctx.session.user;
        if (user) {
            ctx.body = {
                status: 'success',
                msg: '登陆成功',
                user,
            };
        } else {
            ctx.body = {};
        }
    });
}

