import React, { Component } from 'react';
import { connect } from 'react-redux';

import Posts from '../components/posts';
import { getArticle, getPosts } from '../actions';

class PostsContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { params, dispatch, getPosts } = this.props;
        dispatch(getPosts(params.cate));
    }

    render() {
        const { posts, fetchArticle } = this.props;

        if (posts) {
            return (
                <Posts posts={posts} getArticle={fetchArticle} />
            );
        }
        return (<div>loading...</div>);
    }
}

const mapStateToProps = state => ({
    posts: state.posts.posts,
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    getPosts,
    fetchArticle: id => dispatch(getArticle(id)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PostsContainer);

