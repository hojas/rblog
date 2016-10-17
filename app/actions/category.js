const requestCates = () => ({
    type: 'REQUEST_CATES',
    loading: true,
});

const getCatesSuccess = cates => ({
    type: 'GET_CATES_SUCCESS',
    loading: false,
    cates: cates,
});

const getCatesError = () => ({
    type: 'GET_CATES_ERROR',
    loading: false,
});

export const getCates = () => dispatch => {
    dispatch(requestCates);

    return fetch('/api/cates')
        .then(data => data.json())
        .then(json => dispatch(getCatesSuccess(json)))
        .catch(err => dispatch(getCatesError()));
};

