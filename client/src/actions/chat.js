import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const get_user = (userID) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.request({
            method: 'GET',
            url: '/api/users/others',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                userID: userID
            }
        });
        return res.data;
    }
    catch (err) {
        return err
    }
}