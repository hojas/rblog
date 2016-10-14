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

let Post = mongoose.model('Post', postSchema);

export { Post };

