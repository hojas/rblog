import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    id: Number,
    title: String,
    content: String,
    author: String,
    category: { name: String, url: String },
    tags: { type: Array, default: [] },
    views: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

postSchema.statics.findByCate = async function(cate) {
    let current_cate = cate
        ? { category: { name: cate.name, url: cate.url }}
        : {};

    let posts = await this.find(current_cate);

    return posts;
};

postSchema.statics.findById = async function(id) {
    let post = await this.findOne({ id });

    if (post) {
        return post;
    }
    return { status: 'error', msg: '没有找到相关文章' };
};

let Post = mongoose.model('Post', postSchema);

export { Post };

