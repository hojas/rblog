import React from 'react';
import { Link } from 'react-router';

const Posts = ({ posts, getArticle }) => (
    <div className="panel panel-default">
        <div className="panel-heading">最新文章</div>
        <div className="list-group">
            {posts && posts.length && posts.map((p, i) =>
                <Link className="list-group-item" key={i}
                    to={`/${p.id}.html`}
                    onClick={() => getArticle(p.id)}>
                    {p.title}
                </Link>
            )}
        </div>
    </div>
);

export default Posts;

