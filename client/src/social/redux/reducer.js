import Type from './type';

const initialState = {
    token: localStorage.getItem('token'),
    isAuth: false,
    friends: null,
    requesters: null,
    responders: null,
}

export default (state = initialState, action) => {
    const { type, payload } = action

    switch(type) {
        case Type.GET_REQUESTERS:
            return {
                
            }
        case Type.CANCEL_REQUESTER:
            return {

            }
        case Type.ERROR:
            return {

            }
        default: 
            return state;
    }
}