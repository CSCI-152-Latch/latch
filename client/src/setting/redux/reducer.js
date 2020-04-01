import Type from './type';

const initialState = {
    token: localStorage.getItem('token'),
    isAuth: false,
    user: null,
    error: null
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case Type.UPDATE_USER:
            return {
                ...state,
                isAuth: true,
                user: payload
            };
        case Type.ERROR:
            return {
                ...state,
                error: payload
            };
        default:
            return state;
    }
}