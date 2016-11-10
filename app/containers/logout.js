import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { logout } from '../actions';

class LogoutContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch, logout } = this.props;
        dispatch(logout());
    }

    componentWillUpdate(nextProps, nextState) {
        const { user } = nextProps;
        if (!user) {
            browserHistory.push('/');
        }
    }

    render() {
        return (<div>退出成功</div>);
    }
}

const mapStateToProps = state => ({
    status: state.sign.status,
    user: state.sign.user,
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    logout,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LogoutContainer);

