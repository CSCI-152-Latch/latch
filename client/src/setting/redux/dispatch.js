import axios from 'axios';
import { USER_UPDATED, AUTH_ERROR } from './type';

export const update_user = async (user) => {
    try {
        const res = await axios.request({
            method: 'POST',
            url: '/api/users/update',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                user
            }
        })

        return {
            type: USER_UPDATED,
            payload: res.data
        };
    }
    catch (err) {
        return {
            type: AUTH_ERROR
        };
    }
}