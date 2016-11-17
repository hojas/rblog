import React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'

import routes from '../../app/routes';
import configureStore from '../../app/store/configureStore';

export const renderReact = async (ctx, next) => {
    try {
        const { redirect, props } = await _match({ routes, location: ctx.url });

        if (redirect) {
            ctx.status = 302;
            ctx.redirect = redirectLocation.pathname + redirectLocation.search;
        } else if (props) {
            await fetchData(ctx, next, props);
        } else {
            await next();
        }
    } catch (e) {
        ctx.status = 500;
        ctx.body = '500 error';
    }
}

const fetchData = async (ctx, next, props) => {
    const store = configureStore();

    let coms = props.components.filter(c => !!c.WrappedComponent.fetchData);
    let fetchs = coms.map(c => c.WrappedComponent.fetchData);
    let tasks = [];

    fetchs.map(f => {
        let t = f(store.dispatch, props.params);
        if (Array.isArray(t)) {
            tasks = tasks.concat(t);
        } else {
            tasks.push(t);
        }
    });

    await Promise.all(tasks);

    const preloadedState = store.getState();
    const html = renderToString(
        <Provider store={store}>
            <RouterContext {...props} />
        </Provider>
    );

    await ctx.render('home', {
        body: html,
        state: JSON.stringify(preloadedState),
    });
}

const _match = location => {
    return new Promise((resolve, reject) => {
        match(location, (error, redirect, props) => {
            if (error) {
                return reject(error);
            }
            resolve({redirect, props});
        });
    });
}

