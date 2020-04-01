import axios from 'axios';

export const get_field = async () => {
    try {
        const res = await axios.request({
            method: 'GET',
            url: '/api/setting/me',
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