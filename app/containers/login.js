import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Login from '../components/login';
import { login } from '../actions';

class LoginContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { isLogin } = this.props;
        if (isLogin.status == 'success') {
            browserHistory.push('/');
        }
    }

    componentWillUpdate(nextProps, nextState) {
        const { isLogin } = nextProps;
        if (isLogin.status == 'success') {
            browserHistory.push('/');
        }
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="col-md-4 col-md-offset-4 login">
                <Login onSubmit={handleSubmit} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLogin: state.login.msg
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    login,
    handleSubmit: (values) => {
        dispatch(login(values));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginContainer);

