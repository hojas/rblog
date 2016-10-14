import React, { Component } from 'react';

import Posts from '../components/posts';

class PostsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { posts: [] };
    }

    componentDidMount() {
        fetch('/api/posts').then(data => {
            return data.json();
        }).then(posts => {
            this.setState({ posts });
        });
    }

    render() {
        let posts = this.state.posts;

        if (posts.length) {
            return (
                <Posts posts={posts} />
            );
        }
        return (<div>Loading...</div>);
    }
}

export default PostsContainer;

