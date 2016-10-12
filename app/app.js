import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import AppContainer from './containers/app';
import PostsContainer from './containers/post';

render(
    <Router history={browserHistory}>
        <Route path="/" component={AppContainer}>
            <IndexRoute component={PostsContainer} />
        </Route>
    </Router>,
    document.getElementById('app')
);

