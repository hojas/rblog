import React from 'react';

const Article = ({ post }) => (
    <div className="article">
        <h2 className="article-title">{post.title}</h2>
        <div className="article-content">
            {post.content}
        </div>
    </div>
);

export default Article;

