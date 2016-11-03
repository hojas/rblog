import { setCurrentCate } from './category';

const requestArticle = () => ({
    type: 'REQUEST_ARTICLE',
});

const getArticleSuccess = article => ({
    type: 'GET_ARTICLE_SUCCESS',
    payload: article,
});

const getArticleError = () => ({
    type: 'GET_ARTICLE_ERROR',
    status: 404,
});

export const deleteArticle = () => ({
    type: 'DELETE_ARTICLE',
});

export const getArticle = id => dispatch => {
    dispatch(requestArticle());

    return fetch(`/api/post/${id}`, {
        credentials: 'same-origin',
    })
    .then(data => data.json())
    .then(json => {
        dispatch(setCurrentCate(json.category.url));
        dispatch(getArticleSuccess(json));
    })
    .catch(err => dispatch(getArticleError()));
}

const requestPublish = data => ({
    type: 'PUBLISH_ARTICLE',
    payload: data.post,
});

export const publishArticle = post => dispatch => {
    return fetch('/api/post/new', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    })
    .then(data => data.json())
    .then(json => dispatch(requestPublish(json)));
}

export const clearNewArticle = () => ({
    type: 'CLEAR_NEW_ARTICLE',
});

