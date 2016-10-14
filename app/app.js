import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import AppContainer from './containers/app';
import PostsContainer from './containers/posts';
import ArticleContainer from './containers/article';

render(
    <Router history={browserHistory}>
        <Route path="/" component={AppContainer}>
            <IndexRoute component={PostsContainer} />
            <Route path=":id.html" component={ArticleContainer} />
        </Route>
    </Router>,
    document.getElementById('app')
);

