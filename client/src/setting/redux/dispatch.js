import axios from 'axios';
import Type from './type';

import setAuthToken from '../../utils/setAuthToken';

export const update_user = async (userField, userData) => {
    try {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
    
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
            type: Type.USER_UPDATE_SUCCESS,
            payload: res.data
        };
    }
    catch (err) {
        return {
            type: Type.USER_UPDATE_FAIL,
            payload: err
        };
    }
}