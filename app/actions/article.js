import { setCurrentCate } from './category';

const requestArticle = () => ({
    type: 'REQUEST_ARTICLE',
    loading: true,
});

const getArticleSuccess = article => ({
    type: 'GET_ARTICLE_SUCCESS',
    article: article,
    loading: false,
});

const getArticleError = () => ({
    type: 'GET_ARTICLE_ERROR',
    loading: false,
});

export const getArticle = id => dispatch => {
    dispatch(requestArticle());

    return fetch(`/api/post/${id}`)
        .then(data => data.json())
        .then(json => {
            dispatch(setCurrentCate(json.category.url));
            dispatch(getArticleSuccess(json));
        })
        .catch(err => dispatch(getArticleError()));
};

