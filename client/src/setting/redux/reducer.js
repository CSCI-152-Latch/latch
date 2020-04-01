import Type from './type';

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    user: null
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case Type.USER_UPDATE_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: payload
            };
        case Type.USER_UPDATE_FAIL:
            return {
                ...state,
                user: payload
            };
        default:
            return state;
    }
}