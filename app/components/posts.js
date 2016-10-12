import React from 'react';
import { Link } from 'react-router';

const Posts = ({ posts }) => (
    <div className="list-group">
            {posts && posts.length && posts.map((p, i) =>
                <Link className="list-group-item" key={i} to={`/p/${p.id}.html`}>
                    {p.title}
                </Link>
            )}
    </div>
);

export default Posts;

