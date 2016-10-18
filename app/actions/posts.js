import { setCurrentCate } from './category';

const requestPosts = () => ({
    type: 'REQUEST_POSTS',
    loading: true,
});

const getPostsSuccess = (posts, cate) => ({
    type: 'GET_POSTS_SUCCESS',
    posts: posts,
    loading: false,
});

const getPostsError = () => ({
    type: 'GET_POSTS_ERROR',
    loading: false,
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

    return fetch(url)
        .then(data => data.json())
        .then(json => {
            dispatch(setCurrentCate(cate));
            dispatch(getPostsSuccess(json));
        })
        .catch(err => dispatch(getPostsError()));
}

