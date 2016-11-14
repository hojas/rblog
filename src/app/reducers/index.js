let initialSignState = {
    status: '',
    msg: '',
    user: '',
};
export const sign = (state = initialSignState, action) => {
    switch (action.type) {
        case 'SIGN_USER':
            return {
                ...state,
                status: action.payload.status,
                msg: action.payload.msg,
                user: action.payload.user,
            };
        default:
            return state;
    }
};

export const cates = (state = {}, action) => {
    switch (action.type) {
        case 'GET_CATES_SUCCESS':
            return {
                ...state,
                list: action.payload,
            };
        default:
            return state;
    }
};

export const currentCate = (state = { data: 'index' }, action) => {
    switch (action.type) {
        case 'SET_CURRENT_CATE':
            return {
                ...state,
                data: action.payload,
            };
        default:
            return state;
    }
};

export const posts = (state = {}, action) => {
    switch (action.type) {
        case 'GET_POSTS_SUCCESS':
            return {
                ...state,
                list: action.payload,
            };
        default:
            return state;
    }
};

export const article = (state = {}, action) => {
    switch (action.type) {
        case 'GET_ARTICLE_SUCCESS':
            return {
                ...state,
                data: action.payload,
            };
        default:
            return state;
    }
};

