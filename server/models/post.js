import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = new Schema({
    id: Number,
    title: String,
    content: String,
    author: String,
    category: { name: String, url: String },
    tags: { type: Array, default: [] },
    views: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

postSchema.static.findByCate = async function(cate) {
    let current_cate = cate ? { category: { name: cate.name, url: cate.url }} : {};
    let posts = await this.find(current_cate);
    return posts;
};

export default mongoose.model('Post', postSchema);

