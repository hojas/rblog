import React, { Component } from 'react';
import { connect } from 'react-redux';

import Posts from '../components/posts';
import { getArticle, getPosts, clearPosts } from '../actions';

class PostsContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { params, dispatch, getPosts } = this.props;
        let cate = params.cate;
        let tag = params.tag;

        if (cate) {
            dispatch(getPosts('cate', cate));
        } else if (tag) {
            dispatch(getPosts('tag', tag));
        } else {
            dispatch(getPosts());
        }
    }

    componentDidMount() {
        const { dispatch, clearPosts } = this.props;
        dispatch(clearPosts());
    }

    render() {
        const { posts, fetchArticle } = this.props;

        if (posts && posts.length) {
            return (
                <Posts posts={posts} getArticle={fetchArticle} />
            );
        }
        return (<div>loading...</div>);
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts.list,
    }
};

const mapDispatchToProps = dispatch => ({
    dispatch,
    getPosts,
    clearPosts,
    fetchArticle: id => dispatch(getArticle(id)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PostsContainer);

