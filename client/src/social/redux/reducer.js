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
        
        case Type.CANCEL_USER:
        case Type.ACCEPT_USER:    
        case Type.DECLINE_USER:
            return {
                ...state,
                users: payload,
                error: null
            }
        case Type.ERROR:
            return {
                ...state,
                users: null,
                error: payload
            }
        default: 
            return state;
    }
}