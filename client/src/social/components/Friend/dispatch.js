import axios from 'axios';
import Type from './type';

// Get list of user requester
export const get_friends = async () => {
    try {
        const res = await axios.request({
            method: 'GET',
            url: 'api/social/friends',
            headers: {
                'x-auth-token': `${sessionStorage.token}`,
                'Content-Type': 'application/json'
            }
        });

        return {
            type: Type.GET_FRIENDS,
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

export const delete_user = async (id) => {
    try {
        const res = await axios.request({
            method: 'POST',
            url: 'api/social/delete',
            headers: {
                'x-auth-token': `${sessionStorage.token}`,
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
