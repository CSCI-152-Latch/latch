import Type from './Post/redux/type';

const initialState = {
    posts: [],
    error: null
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case Type.GET_POST: {
            return {
                ...state,
                posts: payload
            }
        }
        case Type.NEW_POST: {
            const { posts, isCreatePost, error } = state;
            return {
                ...state,
                posts: [payload, ...posts]
            }
        }
        default: {
            return {
                ...state,
                error: payload
            }
        }
    }
}