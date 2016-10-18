import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../components/header';
import { getCates, getPosts } from '../actions';

class AppContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { dispatch, getCates } = this.props;
        dispatch(getCates());
    }

    render() {
        const { cates, fetchPosts, currentCate } = this.props;

        if (cates) {
            return (
                <div>
                    <Header cates={cates}
                        currentCate={currentCate}
                        getPosts={fetchPosts}
                    />
                    <div className="container">{this.props.children}</div>
                </div>
            );
        }
        return (<div>loading...</div>);
    }
}

const mapStateToProps = state => ({
    cates: state.cates.cates,
    currentCate: state.currentCate.currentCate,
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    getCates,
    fetchPosts: cate => dispatch(getPosts(cate)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);

