import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Login from '../components/login';
import { login } from '../actions';

class LoginContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { user } = this.props;
        if (user == 'success') {
            browserHistory.push('/');
        }
    }

    componentWillUpdate(nextProps, nextState) {
        const { user } = nextProps;
        if (user) {
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
    user: state.sign.user,
});

const mapDispatchToProps = dispatch => ({
    handleSubmit: values => dispatch(login(values)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginContainer);

