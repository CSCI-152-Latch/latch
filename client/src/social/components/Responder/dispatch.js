import axios from 'axios';
import Type from './type';

// Get list of user responders
export const get_responders = async () => {
    try {
        const res = await axios.request({
            method: 'GET',
            url: 'api/social/responders',
            headers: {
                'x-auth-token': `${sessionStorage.token}`,
                'Content-Type': 'application/json'
            }
        });

        return {
            type: Type.GET_RESPONDERS,
            payload: res.data
        }
    }
    catch (error) {
        return {
            type: Type.ERROR,
            payload: error
        }
    }
}

export const accept_user = async (id) => {
    try {
        console.log(id);
        const res = await axios.request({
            method: 'POST',
            url: 'api/social/accept',
            headers: {
                'x-auth-token': `${sessionStorage.token}`,
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

export const create_chat = async (id) => {
    try {
        const res = await axios.request({
            method: 'POST',
            url: 'api/chat/create',
            headers: {
                'x-auth-token': `${sessionStorage.token}`,
                'Content-Type': 'application/json'
            },
            data: {
                _id: id
            }
        })
        return;
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
        const res = await axios.request({
            method: 'POST',
            url: 'api/social/decline',
            headers: {
                'x-auth-token': `${sessionStorage.token}`,
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
