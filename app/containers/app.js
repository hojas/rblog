import React, { Component } from 'react';

import Header from '../components/header';

class AppContainer extends Component {
    constructor(props) {
        super(props);
    }
/*
    componentDidMount() {
        fetch('/api/posts').then(posts => {
            console.log(pots);
            this.setState({ posts });
        });
    }
    */

    render() {
        return (
            <div>
                <div className="container">{this.props.children}</div>
            </div>
        );
    }
}

export default AppContainer;

