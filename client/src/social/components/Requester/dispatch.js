import axios from 'axios';
import Type from './type';

// Get list of user requester
export const get_requesters = async () => {
    try {
        const res = await axios.request({
            method: 'GET',
            url: 'api/social/requesters',
            headers: {
                'x-auth-token': `${sessionStorage.token}`,
                'Content-Type': 'application/json'
            }
        });

        return {
            type: Type.GET_REQUESTERS,
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

// Requester cancel friend request to the current responder
export const cancel_user = async (id) => {
    try {
        const res = await axios.request({
            method: 'POST',
            url: 'api/social/cancel',
            headers: {
                'x-auth-token': `${sessionStorage.token}`,
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
