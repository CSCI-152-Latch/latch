import axios from 'axios';
import Type from './type';

export const update_user = async (userField, userData) => {
    try {
        const res = await axios.request({
            method: 'POST',
            url: '/api/setting/update',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                [userField]: userData
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