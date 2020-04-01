import axios from 'axios';
import Type from './type';

import setAuthToken from '../../utils/setAuthToken';

// Requester cancel friend request to the current responder
export const cancel_user = async (userID) => {
    try {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        const res = await axios.request({
            method: 'POST',
            url: 'api/social/cancel',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                currResponder: userID
            }
        });
        
        return {
            type: Type.CANCEL_REQUEST,
            paylaod: res.data
        }
    }
    catch (err) {
        return {
            type: Type.ERROR,
            paylaod: err
        }
    }
}

// Add a new user
export const add_user = (userID) => async dispatch => {
    try {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        const res = axios.request({
            method: 'POST',
            url: 'api/users/add',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                newSpender: userID
            }
        });

        //DISPATCH
    }
    catch (err) {
        return {
            type: Type.ERROR,
            paylaod: err
        }
    }
}

export const accept_user = (userID) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    
    try {
        const res = await axios.request({
            method: 'POST',
            url: 'api/users/accept',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                currRequester: userID
            }
        })
        
        //DISPATCH
    }
    catch (err) {
        return {
            type: Type.ERROR,
            paylaod: err
        }
    }
}

export const decline_user = (userID) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    
    try {
        const res = await axios.request({
            method: 'POST',
            url: 'api/users/decline',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                currRequester: userID
            }
        })
        
        //DISPATCH
    }
    catch (err) {
        return {
            type: Type.ERROR,
            paylaod: err
        }
    }
}

export const delete_user = (userID) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    
    try {
        const res = await axios.request({
            method: 'POST',
            url: 'api/users/delete',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                currRequester: userID
            }
        })
        
        //DISPATCH
    }
    catch (err) {
        return {
            type: Type.ERROR,
            paylaod: err
        }
    }
}

export const create_chat = (userID) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.request({
            method: 'POST',
            url: 'api/chat/create',
            data: {
                users: userID
            }
        });

        //DISPATCH
    }
    catch (err) {
        return {
            type: Type.ERROR,
            paylaod: err
        }
    }
}