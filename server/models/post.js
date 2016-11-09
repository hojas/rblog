import mongoose from 'mongoose';
import moment from 'moment';
import marked from 'marked';
import hljs from 'highlight.js';

// highlight code
const renderer = new marked.Renderer();
renderer.code = function(code) {
    let hl = this.options.highlight;

    if (hl) {
        code= hl(code) || code;
    }
    return `<pre><code class="hljs">${code}\n</code></pre>`;
}

// set marked
marked.setOptions({
    renderer,
    highlight: code => hljs.highlightAuto(code).value,
});

const postSchema = new mongoose.Schema({
    id: Number,
    title: String,
    content: String,
    author: String,
    category: { name: String, url: String },
    tags: { type: Array, default: [] },
    views: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    formatCreatedAt: String,
});

// get posts by category
postSchema.statics.findByCate = async function(cate) {
    let current_cate = cate
        ? { category: { name: cate.name, url: cate.url }}
        : {};

    let posts = await this.find(current_cate).sort({ createdAt: -1 });

    return posts;
};

// get posts by tag
postSchema.statics.findByTag = async function(tag) {
    let posts = await this.find({ tags: { $in: [tag] } }).sort({ createdAt: -1 });
    return posts;
};

// get article by id
postSchema.statics.findById = async function(id) {
    let post = await this.findOne({ id });

    if (post) {
        return post;
    }
    return { status: 'error', msg: '没有找到相关文章' };
};

// save a new article
postSchema.statics.add = async function(post) {
    let posts = await this.find({});
    post.id = posts.length + 1;

    let p = await post.save();
    return {
        status: 'success',
        msg: '文章发布成功',
        post,
    };
};

// get marked article content
postSchema.virtual('marked').get(function() {
    return marked(this.content);
});

// pretty createdAt
postSchema.virtual('prettyCreatedAt').get(function() {
    moment.locale('zh-cn');
    return moment(this.createdAt).format('ll');
});

let Post = mongoose.model('Post', postSchema);

export { Post }

