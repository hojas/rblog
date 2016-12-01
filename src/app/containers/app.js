import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from '../components/header';
import { prefix, getCates, getPosts, getCurrentUser } from '../actions';

class AppContainer extends Component {
    constructor(props) {
        super(props);
    }

    static fetchData(dispatch) {
        return dispatch(getCates(prefix));
    }

    componentDidMount() {
        const { dispatch, getCates, cates } = this.props;

        if (!cates.length) {
            dispatch(getCates());
        }
        dispatch(getCurrentUser());
    }

    render() {
        const { cates, fetchPosts, currentCate, user } = this.props;

        if (cates) {
            return (
                <div>
                    <Header cates={cates}
                        currentCate={currentCate}
                        getPosts={fetchPosts}
                        user={user}
                    />
                    <div className="container">{this.props.children}</div>
                </div>
            );
        }
        return (<div>loading...</div>);
    }
}

const mapStateToProps = state => ({
    cates: state.cates.list,
    currentCate: state.currentCate.data,
    user: state.sign.user,
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    getCates,
    getCurrentUser,
    fetchPosts: cate => dispatch(getPosts('cate', cate)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);

