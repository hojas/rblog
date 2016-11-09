import React from 'react';
import { Link } from 'react-router';

const Article = ({ post }) => (
    <div className="article">
        <h2 className="article-title">{post.title}</h2>
        <div className="article-meta">
            <span><i className="fa fa-user"></i>{post.author}</span>
            <span><i className="fa fa-clock-o"></i>{post.formatCreatedAt}</span>
            <span><i className="fa fa-eye"></i>{post.views}</span>
            <span>
                <i className="fa fa-tags"></i>
                {post.tags && post.tags.map((t, i) =>
                    <Link className="label label-info" to={`/tag/${t}`} key={i}>{t}</Link>
                )}
            </span>
        </div>
        <div className="article-content"
            dangerouslySetInnerHTML={createMarkup(post.content)}>
        </div>
    </div>
);

function createMarkup(html) {
    return { __html: html };
}

export default Article;

