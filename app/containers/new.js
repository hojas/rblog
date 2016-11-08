import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import New from '../components/new';
import { clearArticle, publishArticle } from '../actions';

class PublishArticleContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { dispatch, clearArticle } = this.props;
        dispatch(clearArticle());
    }

    componentWillUpdate(nextProps, nextState) {
        const { article } = nextProps;
        if (article) {
            browserHistory.push(`/${post.id}.html`);
        }
    }

    render() {
        const { handleSubmit, cates } = this.props;
        return (
            <div className="col-md-12">
                <New onSubmit={handleSubmit}
                    cates={cates}
                    />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    cates: state.cates.list,
    article: state.article.data,
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    clearArticle,
    handleSubmit: values => dispatch(publishArticle(values)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PublishArticleContainer);

