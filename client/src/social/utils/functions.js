import axios from 'axios'
import { ConnectionStates } from 'mongoose';

// Get the list of relationhip to current user
export const get_user_relation = async (type) => {
    try {
        const res = await axios.request({
            method: 'GET',
            url: `api/${type}`,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    }
    catch (err) {
        return err;
    }
}

// Get the list of chat to the current user
export const get_chats = async () => {
    try {
        const res = await axios.request({
            method: 'GET',
            url: 'api/chat/chat',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    }
    catch (err) {
        return err;
    }
}

export const get_specific_conversation = async (id) => {
    try {
        const res = await axios.request({
            method: 'GET',
            url: 'api/chat/go',
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                chatID: id
            }
        });
        return res.data;
    }
    catch (err) {
        return err;
    }
}