import React, { Component } from 'react';
import { connect } from 'react-redux';

import Article from '../components/article';
import { prefix, getArticle } from '../actions';

class ArticleContainer extends Component {
    constructor(props) {
        super(props);
    }

    static fetchData(dispatch, params) {
        return dispatch(getArticle(params.id, prefix));
    }

    componentDidMount() {
        const { params, dispatch, getArticle, article } = this.props;

        if (!article) {
            dispatch(getArticle(params.id));
        }
    }

    render() {
        const { article } = this.props;

        if (article) {
            return <Article post={article} />
        }
        return (<div>loading...</div>);
    }
}

const mapStateToProps = state => ({
    article: state.article.data,
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    getArticle,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ArticleContainer);

