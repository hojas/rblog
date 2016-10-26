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

export const article = (state = {}, action) => {
    switch (action.type) {
        case 'GET_ARTICLE_SUCCESS':
            return {
                ...state,
                article: action.article,
                loading: action.loading,
            };
        case 'GET_ARTICLE_ERROR':
            return {
                ...state,
                loading: action.loading,
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

export const posts = (state = {}, action) => {
    switch (action.type) {
        case 'GET_POSTS_SUCCESS':
            return {
                ...state,
                posts: action.posts,
                loading: action.loading,
            };
        case 'GET_POSTS_ERROR':
            return {
                ...state,
                status: action.status,
                lading: action.loading,
            };
        case 'DELETE_POSTS':
            return {
                state,
                posts: [],
                loading: action.loading,
            }
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

