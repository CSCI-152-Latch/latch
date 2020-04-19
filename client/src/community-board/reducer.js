import Type from './Post/redux/type';

const initialState = {
    posts: [],
    isCreatePost: false,
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
        case Type.CREATE_POST: 
        case Type.CANCEL_POST:
        case Type.FINISH_POST: {
            return {
                ...state,
                isCreatePost: payload
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