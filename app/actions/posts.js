import { setCurrentCate } from './category';

// 获取文章列表
const getPostsSuccess = (posts) => ({
    type: 'GET_POSTS_SUCCESS',
    payload: posts,
});

// 清除文章列表
export const clearPosts = () => ({
    type: 'CLEAR_POSTS',
});

export const getPosts = cate => dispatch => {
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
    });
}

