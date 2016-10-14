import React, { Component } from 'react';

import Article from '../components/article';

class ArticleContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { post: null };
    }

    componentDidMount() {
        let postId = this.props.params.id;
        fetch(`/api/post/${postId}`).then(data => {
            return data.json();
        }).then(post => {
            this.setState({ post });
        });
    }

    render() {
        let post = this.state.post;

        if (post) {
            return <Article post={post} />
        }
        return (<div>Loading...</div>);
    }
}

export default ArticleContainer;

