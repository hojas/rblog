import React, { Component } from 'react';

import Header from '../components/header';

class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { cates: [] };
    }

    componentDidMount() {
        fetch('/api/cates').then(data => {
            return data.json();
        }).then(cates => {
            this.setState({ cates });
        });
    }

    render() {
        let cates = this.state.cates;

        if (cates) {
            return (
                <div>
                    <Header cates={cates} currentCate='index' />
                    <div className="container">{this.props.children}</div>
                </div>
            );
        }

        return (<div>loading...</div>);
    }
}

export default AppContainer;

