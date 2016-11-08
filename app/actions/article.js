import { setCurrentCate } from './category';

// 获取文章
const getArticleSuccess = article => ({
    type: 'GET_ARTICLE_SUCCESS',
    payload: article,
});

// 清除文章
export const clearArticle = () => ({
    type: 'CLEAR_ARTICLE',
});

export const getArticle = id => dispatch => {
    return fetch(`/api/post/${id}`, {
        credentials: 'same-origin',
    })
    .then(data => data.json())
    .then(json => {
        dispatch(setCurrentCate(json.category.url));
        dispatch(getArticleSuccess(json));
    });
};

// 发表新文章
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
    .then(json => dispatch(getArticleSuccess(json.post)));
}

