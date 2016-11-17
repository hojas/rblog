import fetch from 'isomorphic-fetch';

// 获取所有分类
const getCatesSuccess = cates => ({
    type: 'GET_CATES_SUCCESS',
    payload: cates,
});

export const getCates = (prefix = '') => dispatch => {
    return fetch(`${prefix}/api/cates`, {
        credentials: 'same-origin',
    })
    .then(data => data.json())
    .then(json => dispatch(getCatesSuccess(json)));
};

// 设置当前分类
export const setCurrentCate = cate => ({
    type: 'SET_CURRENT_CATE',
    payload: cate,
});

