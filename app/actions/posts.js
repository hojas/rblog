import { setCurrentCate } from './category';

const requestPosts = () => ({
    type: 'REQUEST_POSTS',
});

const getPostsSuccess = (posts) => ({
    type: 'GET_POSTS_SUCCESS',
    payload: posts,
});

const getPostsError = () => ({
    type: 'GET_POSTS_ERROR',
    status: 404,
});

export const deletePosts = () => ({
    type: 'DELETE_POSTS',
});

export const getPosts = cate => dispatch => {
    dispatch(requestPosts());

    let url;
    if (cate) {
        url = `/api/cate/${cate}`;
    } else {
        url = '/api/posts';
        cate = 'index';
    }

    return fetch(url, {
        credentials: 'same-origin',
    })
    .then(data => data.json())
    .then(json => {
        dispatch(setCurrentCate(cate));
        dispatch(getPostsSuccess(json));
    })
    .catch(err => dispatch(getPostsError()));
}

