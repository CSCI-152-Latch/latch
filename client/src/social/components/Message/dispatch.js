import axios from 'axios';
import Type from './type';

export const add_messages = async (data) => {
    try {
        const res = await axios.request({
            method: 'POST',
            url: 'api/chat/add',
            headers: {
                'x-auth-token': `${sessionStorage.token}`,
                'Content-Type': 'application/json'
            },
            data
        });
        return {
            type: Type.ADD_MESSAGE,
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