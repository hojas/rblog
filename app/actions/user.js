const signError = data => ({
    type: 'SIGN_ERROR',
    payload: data,
});

const setCurrentUser = user => ({
    type: 'GET_CURRENT_USER',
    payload: user,
});

export const login = user => dispatch => {
    return fetch('/api/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    .then(data => data.json())
    .then(json => {
        if (json.status == 'error') {
            dispatch(signError(json));
        } else {
            dispatch(setCurrentUser(json.user));
        }
    });
}

export const register = user => dispatch => {
    return fetch('/api/register', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    .then(data => data.json())
    .then(json => {
        if (json.status == 'error') {
            dispatch(signError(json));
        } else {
            dispatch(setCurrentUser(json.user));
        }
    });
}

export const getCurrentUser = () => dispatch => {
    return fetch('/api/user', {
        credentials: 'same-origin',
    })
    .then(data => data.json())
    .then(json => dispatch(setCurrentUser(json)));
}

