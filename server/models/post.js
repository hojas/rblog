import mongoose from 'mongoose';
import marked from 'marked';
import hljs from 'highlight.js';

const renderer = new marked.Renderer();
renderer.code = function(code) {
    let hl = this.options.highlight;

    if (hl) {
        code= hl(code) || code;
    }
    return `<pre><code class="hljs">${code}\n</code></pre>`;
}

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

postSchema.virtual('marked').get(function() {
    return marked(this.content);
});

let Post = mongoose.model('Post', postSchema);

export { Post };

