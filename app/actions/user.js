const requestLogin = msg => ({
    type: 'REQUEST_LOGIN',
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

