import axios from 'axios';
import Type from './type';

// Get the list of chat to the current user
export const get_chats = async () => {
    try {
        const res = await axios.request({
            method: 'GET',
            url: 'api/chat/rooms',
            headers: {
                'x-auth-token': `${sessionStorage.token}`,
                'Content-Type': 'application/json'
            }
        });
        return {
            type: Type.GET_ROOM,
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

export const get_messages = async (id) => {
    try {
        const res = await axios.request({
            method: 'GET',
            url: 'api/chat/go',
            headers: {
                'x-auth-token': `${sessionStorage.token}`,
                'Content-Type': 'application/json'
            },
            params: {
                chatID: id
            }
        });
        return {
            type: Type.GET_MESSAGES,
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

