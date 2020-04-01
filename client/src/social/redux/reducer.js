import Type from './type';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    users: [],
    error: null
}

export default (state = initialState, action) => {
    const { type, payload } = action

    switch(type) {
        case Type.CANCEL_REQUEST:
            return {
                ...state,
                users: payload
            }
        case Type.ERROR:
            return {
                ...state,
                error: payload
            }
        default: 
            return state;
    }
}