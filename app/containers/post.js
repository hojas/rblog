import React, { Component } from 'react';

import Posts from '../components/posts';

class PostsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { posts: [] };
    }

    componentDidMount() {
        fetch('/api/posts').then(posts => {
            console.log(pots);
            this.setState({ posts });
        });
    }

    render() {
        return (
            <Posts posts={this.state.posts} />
        );
    }
}

export default PostsContainer;

