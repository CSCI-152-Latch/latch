import axios from 'axios';
import Type from './type';

export const get_post = async () => {
    try {
        const res = await axios.request({
            method: 'GET',
            url: 'api/posts/posts',
            headers: {
                'x-auth-token': `${sessionStorage.token}`,
                'Content-Type': 'application/json'
            }
        });

        return {
            type: Type.GET_POST,
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

export const new_post = async (data) => {
    try {
        const res = await axios.request({
            method: 'POST',
            url: 'api/posts/create',
            headers: {
                'x-auth-token': `${sessionStorage.token}`,
                'Content-Type': 'application/json'
            },
            data
        })
        return {
            type: Type.NEW_POST,
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

export const send_comment = async (data) => {
    try {
        const res = await axios.request({
            method: 'POST',
            url: 'api/posts/addcomment',
            headers: {
                'x-auth-token': `${sessionStorage.token}`,
                'Content-Type': 'application/json'
            },
            data
        });

        return {
            type: Type.GET_POST,
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