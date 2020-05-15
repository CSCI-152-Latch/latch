import Type from './type';

const initialState = {
    user: null,
    error: null,
    isRead: true
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case Type.GET_USER:
        case Type.UPDATE_USER: 
            return {
                ...state,
                user: payload
            }
        case Type.READ_USER: 
            return {
                ...state,
                isRead: payload
            }            
        default:
            return state;
    }
}