import fetch from 'isomorphic-fetch';

// 登录或者注册
const signUser = data => ({
    type: 'SIGN_USER',
    payload: data,
});

// 登录
export const login = user => dispatch => post(dispatch, '/api/login', user);

// 注册
export const register = user => dispatch => post(dispatch, '/api/register', user);

// 退出
export const logout = () => dispatch => {
    return fetch('/api/logout')
        .then(data => data.json())
        .then(json => dispatch(signUser(json)));
};

// 获取已登录用户
export const getCurrentUser = (prefix = '') => dispatch => {
    return fetch(`${prefix}/api/user`, {
        credentials: 'same-origin',
    })
    .then(data => data.json())
    .then(json => dispatch(signUser(json)));
};

function post(dispatch, url, user) {
    return fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: user ? JSON.stringify(user) : JSON.stringify({}),
    })
    .then(data => data.json())
    .then(json => dispatch(signUser(json)))
    .catch(err => dispatch(signUser(err)));
}

