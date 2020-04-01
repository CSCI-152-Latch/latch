import axios from 'axios'

// Get the list of requesters to current user
export const get_user_relation = async (type) => {
    try {
        const res = await axios.request({
            method: 'GET',
            url: `api/social/${type}`,
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


// Get all users 
export const get_all_user = async () => {
    try {
        const res = await axios.request({
            method: 'GET',
            url: 'api/social/all',
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
            url: 'api/chat/view',
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
