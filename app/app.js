import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import AppContainer from './containers/app';
import PostsContainer from './containers/posts';
import ArticleContainer from './containers/article';

import * as reducers from './reducers';


const reducer = combineReducers({ ...reducers, });
const enhancer = compose(applyMiddleware(thunk));
const store = createStore(reducer, enhancer);

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={AppContainer}>
                <IndexRoute component={PostsContainer} />
                <Route path=":id.html" component={ArticleContainer} />
                <Route path=":cate" component={PostsContainer} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);

