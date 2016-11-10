import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Register from '../components/register';
import { register } from '../actions';

class RegisterContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { status } = this.props;
        if (status == 'success') {
            browserHistory.push('/');
        }
    }

    componentWillUpdate(nextProps, nextState) {
        const { status } = nextProps;
        if (status == 'success') {
            browserHistory.push('/');
        }
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="col-md-4 col-md-offset-4 register">
                <Register onSubmit={handleSubmit} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    status: state.sign.status,
    user: state.sign.user,
});

const mapDispatchToProps = dispatch => ({
    handleSubmit: values => dispatch(register(values)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RegisterContainer);

