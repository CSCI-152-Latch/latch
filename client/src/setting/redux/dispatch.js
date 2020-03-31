import axios from 'axios';
import Type from './type';

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
            type: Type.USER_UPDATED,
            payload: res.data
        };
    }
    catch (err) {
        return {
            type: Type.AUTH_ERROR
        };
    }
}