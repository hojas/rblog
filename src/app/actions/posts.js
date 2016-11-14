import { setCurrentCate } from './category';

// 获取文章列表
const getPostsSuccess = posts => ({
    type: 'GET_POSTS_SUCCESS',
    payload: posts,
});

export const getPosts = (type, data) => dispatch => {
    let url;
    let cate;

    if (type && data) {
        url = `/api/${type}/${data}`;
        cate = type === 'cate' ? data : 'index';
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

