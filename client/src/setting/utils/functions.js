import axios from 'axios';

export const get_user = async () => {
    try {
        const res = await axios.request({
            method: 'GET',
            url: '/api/users/me',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    }
    catch (err) {
        return err
    }
}
