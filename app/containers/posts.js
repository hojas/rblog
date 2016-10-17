import React, { Component } from 'react';
import { connect } from 'react-redux';

import Posts from '../components/posts';
import { getPosts } from '../actions';

class PostsContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { params, dispatch, getPosts } = this.props;
        dispatch(getPosts(params.cate));
    }

    render() {
        const { posts } = this.props;

        if (posts) {
            console.log('render posts')
            return (
                <Posts posts={posts} />
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
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PostsContainer);

