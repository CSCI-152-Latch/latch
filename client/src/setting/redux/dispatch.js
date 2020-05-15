import axios from 'axios';
import Type from './type';

import setAuthToken from '../../utils/setAuthToken';

const get_field = async () => {
    try {
        const res = await axios.request({
            method: 'GET',
            url: '/api/setting/me',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        return {
            type: Type.GET_USER,
            payload: res.data
        };
    }
    catch (err) {
        return {
            type: Type.ERROR,
            payload: err
        };
    }
}

const update_field = async (userField, userData) => {
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
            type: Type.UPDATE_USER,
            payload: res.data
        };
    }
    catch (err) {
        return {
            type: Type.ERROR,
            payload: err
        };
    }
}

export default {
    get_field,
    update_field
}