let signState = {
    status: '',
    msg: '',
    user: '',
};
export const sign = (state = { signState }, action) => {
    switch (action.type) {
        case 'SIGN_ERROR':
            return {
                ...state,
                status: action.payload.status,
                msg: action.payload.msg,
                user: action.payload.user,
            };
        case 'GET_CURRENT_USER':
            return {
                ...state,
                user: action.payload,
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
                cates: action.cates,
            };
        default:
            return state;
    }
};

export const currentCate = (state = { currentCate: 'index' }, action) => {
    switch (action.type) {
        case 'SET_CURRENT_CATE':
            return {
                ...state,
                currentCate: action.currentCate,
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
                posts: action.payload,
            };
        case 'GET_POSTS_ERROR':
            return {
                ...state,
                status: action.status,
            };
        case 'DELETE_POSTS':
            return {
                state,
                posts: [],
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
                article: action.payload,
            };
        case 'GET_ARTICLE_ERROR':
            return {
                ...state,
                status: action.status,
            };
        case 'DELETE_ARTICLE':
            return {
                ...state,
                article: '',
            };
        default:
            return state;
    }
};

export const publishedArticle = (state = {}, action) => {
    switch (action.type) {
        case 'PUBLISH_ARTICLE':
            return {
                ...state,
                article: action.payload,
            };
        case 'CLEAR_NEW_ARTICLE':
            return {
                ...state,
                article: '',
            };
        default:
            return state;
    }
}

