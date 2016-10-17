const requestPosts = () => ({
    type: 'REQUEST_POSTS',
    loading: true,
});

const getPostsSuccess = posts => ({
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

    let url = cate ? `/api/cate/${cate}` : '/api/posts';

    return fetch(url)
        .then(data => data.json())
        .then(json => dispatch(getPostsSuccess(json)))
        .catch(err => dispatch(getPostsError()));
}

