import React from 'react';

const Article = ({ post }) => (
    <div className="article">
        <h2 className="article-title">{post.title}</h2>
        <div className="article-content"
                dangerouslySetInnerHTML={createMarkup(post.content)}>
        </div>
    </div>
);

function createMarkup(html) {
    return { __html: html };
}

export default Article;

