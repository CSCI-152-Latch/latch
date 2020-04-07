import axios from 'axios';
import Type from './type';

import setAuthToken from '../../utils/setAuthToken';

// Requester cancel friend request to the current responder
export const cancel_user = async (id) => {
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
                currResponder: id
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
export const add_user = async (id) => {
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
                newResponder: id
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

export const accept_user = async (id) => {
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
                currRequester: id
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

export const decline_user = async (id) => {
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
                currRequester: id
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

export const delete_user = async (id) => {
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
                currResponder: id
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

export const create_chat = async (ids) => {
    try {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        
        const res = await axios.request({
            method: 'POST',
            url: 'api/chat/create',
            data: {
                users: ids
            }
        });

        // DISPTACH
    }
    catch (err) {
        return {
            type: Type.ERROR,
            payload: err
        }
    }
}