import fetch from 'isomorphic-fetch';
import { setCurrentCate } from './category';

// 获取文章列表
const getPostsSuccess = posts => ({
    type: 'GET_POSTS_SUCCESS',
    payload: posts,
});

export const getPosts = (type, data, prefix = '') => dispatch => {
    let url;
    let cate;

    if (type && data) {
        url = `${prefix}/api/${type}/${data}`;
        cate = type === 'cate' ? data : 'index';
    } else {
        url = `${prefix}/api/posts`;
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

