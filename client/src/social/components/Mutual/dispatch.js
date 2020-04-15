import axios from 'axios';
import Type from './type';

// Get random user 
export const get_mutuals = async () => {
    try {
        const res = await axios.request({
            method: 'GET',
            url: 'api/users/mutuals',
            headers: {
                'x-auth-token': `${sessionStorage.token}`,
                'Content-Type': 'application/json'
            }
        });
    
        return {
            type: Type.GET_MUTUALS,
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

// Add a new user
export const add_user = async (id) => {
    try {
        const res = await axios.request({
            method: 'POST',
            url: 'api/social/add',
            headers: {
                'x-auth-token': `${sessionStorage.token}`,
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