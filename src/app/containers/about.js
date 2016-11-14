import React, { Component } from 'react';
import { connect } from 'react-redux';

import About from '../components/about';
import { setCurrentCate } from '../actions';

class AboutContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch, setCurrentCate } = this.props;
        dispatch(setCurrentCate('about'));
    }

    render() {
        return (<About />);
    }
}

const mapDispatchToProps = dispatch => ({
    dispatch,
    setCurrentCate,
});

export default connect(
    mapDispatchToProps,
)(AboutContainer);

