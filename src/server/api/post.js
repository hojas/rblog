import { Post, Tag } from '../models';

export default function(router) {
    router.get('/api/posts', async (ctx, next) => {
        ctx.body = await Post.findByCate();
    });

    router.get('/api/tag/:name', async (ctx, next) => {
        let tag = ctx.params.name;
        ctx.body = await Post.findByTag(tag);
    });

    router.get('/api/post/:id', async (ctx, next) => {
        let id = ctx.params.id;
        let post = await Post.findById(id);

        post.content = post.marked;
        post.formatCreatedAt = post.prettyCreatedAt;
        ctx.body = post;
    });

    router.post('/api/post/new', async (ctx, next) => {
        let author = ctx.session.user.username;
        let {
            title,
            content,
            tags,
            category,
        } = ctx.body;

        tags = tags.trim().split(/\s*,\s*/);
        category = category.split(',');
        category = { name: category[0], url: category[1] };

        let post = new Post({
            id: 0,
            title,
            content,
            author,
            category,
            tags,
        });

        let oTags = tags.map(t => new Tag({ name: t }));
        let pTags = oTags.map(t => Tag.add(t));
        await Promise.all(pTags);

        ctx.body = await Post.add(post);
    });
}

