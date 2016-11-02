const requestLogin = msg => ({
    type: 'REQUEST_LOGIN',
    msg,
});

const requestRegister = msg => ({
    type: 'REQUEST_REGISTER',
    msg,
});

export const login = user => dispatch => {
    return fetch('/api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    .then(data => data.json())
    .then(json => dispatch(requestLogin(json)));
}

export const register = user => dispatch => {
    return fetch('/api/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    .then(data => data.json())
    .then(json => dispatch(requestRegister(json)));
}

