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
            type: Type.CANCEL_USER,
            payload: res.data
        }
    }
    catch (err) {
        return {
            type: Type.ERROR,
            payload: err
        }
    }
}

// Add a new user
export const add_user = async (userID) => {
    try {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        const res = axios.request({
            method: 'POST',
            url: 'api/social/add',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                newResponder: userID
            }
        });

        return {
            type: Type.ADD_USER,
            payload: res.data
        }
    }
    catch (err) {
        return {
            type: Type.ERROR,
            paylaod: err
        }
    }
}

export const accept_user = async (userID) => {
    try {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        const res = await axios.request({
            method: 'POST',
            url: 'api/social/accept',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                currRequester: userID
            }
        })
        
        return {
            type: Type.ACCEPT_USER,
            payload: res.data
        }
    }
    catch (err) {
        return {
            type: Type.ERROR,
            payload: err
        }
    }
}

export const decline_user = async (userID) => {
    try {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        const res = await axios.request({
            method: 'POST',
            url: 'api/social/decline',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                currRequester: userID
            }
        })
        
        return {
            type: Type.DECLINE_USER,
            payload: res.data
        }
    }
    catch (err) {
        return {
            type: Type.ERROR,
            payload: err
        }
    }
}

export const delete_user = async (userID) => {
    try {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        
        const res = await axios.request({
            method: 'POST',
            url: 'api/social/delete',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                currResponder: userID
            }
        })
        
        return {
            type: Type.DELETE_USER,
            payload: res.data
        }
    }
    catch (err) {
        return {
            type: Type.ERROR,
            payload: err
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
            url: 'api/social/create',
            data: {
                users: userID
            }
        });

        //DISPATCH
    }
    catch (err) {
        return {
            type: Type.ERROR,
            payload: err
        }
    }
}