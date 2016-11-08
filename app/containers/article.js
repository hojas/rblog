import React, { Component } from 'react';
import { connect } from 'react-redux';

import Article from '../components/article';
import { getArticle, clearArticle } from '../actions';

class ArticleContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { params, dispatch, getArticle } = this.props;
        dispatch(getArticle(params.id));
    }

    componentDidMount() {
        const { dispatch, clearArticle } = this.props;
        dispatch(clearArticle());
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
    clearArticle,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ArticleContainer);

