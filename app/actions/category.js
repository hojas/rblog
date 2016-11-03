const requestCates = () => ({
    type: 'REQUEST_CATES',
});

const getCatesSuccess = cates => ({
    type: 'GET_CATES_SUCCESS',
    cates: cates,
});

const getCatesError = () => ({
    type: 'GET_CATES_ERROR',
});

export const getCates = () => dispatch => {
    dispatch(requestCates);

    return fetch('/api/cates', {
        credentials: 'same-origin',
    })
    .then(data => data.json())
    .then(json => dispatch(getCatesSuccess(json)))
    .catch(err => dispatch(getCatesError()));
};

export const setCurrentCate = cate => ({
    type: 'SET_CURRENT_CATE',
    currentCate: cate,
});

