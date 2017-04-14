import { Category } from '../models';

export default function(router) {
    router.get('/api/cates', async (ctx, next) => {
        ctx.body = await Category.findAll();
    });

    router.get('/api/cate/:url', async (ctx, next) => {
        let url = ctx.params.url;
        let category = await Category.findByUrl(url);

        if (category.status !== 'error') {
            ctx.body = await Post.findByCate(category);
        } else {
            ctx.body = category;
        }
    });
}

