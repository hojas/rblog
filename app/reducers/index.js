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
                lading: action.loading,
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

