import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_PROFILE,
  USER_UPDATED
} from "./types";
import setAuthToken from "../utils/setAuthToken";

//Load User
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.request({
            method: 'GET',
            url: '/api/users/me',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } 
    catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
};

export const get_user = async () => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

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

export const update_user = (user) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.request({
            method: 'POST',
            url: '/api/users/update',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                nickName: user.nickName,
                avatar: user.avatar,
                password: user.password,
                date: user.data
            }
        })
        dispatch({
            type: USER_UPDATED,
            payload: res.data
        });
    }
    catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}

// Get all the user
export const get_all_user = async () => {

    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.request({
            method: 'GET',
            url: 'api/users/all',
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

// Get all spending user
export const get_spending = async () => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.request({
            method: 'GET',
            url: 'api/users/spending',
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

// Get requester list
export const get_requesting = async () => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.request({
            method: 'GET',
            url: 'api/users/request',
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

// Get friends
export const get_friends = async () => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.request({
            method: 'GET',
            url: 'api/users/view',
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

// Add a user
export const add_user = (userID) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = axios.request({
            method: 'POST',
            url: 'api/users/add',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                newSpender: userID
            }
        });

        //DISPATCH
    }
    catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}

export const accept_user = (userID) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    
    try {
        const res = await axios.request({
            method: 'POST',
            url: 'api/users/accept',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                currRequester: userID
            }
        })
        
        //DISPATCH
    }
    catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}

export const decline_user = (userID) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    
    try {
        const res = await axios.request({
            method: 'POST',
            url: 'api/users/decline',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                currRequester: userID
            }
        })
        
        //DISPATCH
    }
    catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}

export const delete_user = (userID) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    
    try {
        const res = await axios.request({
            method: 'POST',
            url: 'api/users/delete',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                currRequester: userID
            }
        })
        
        //DISPATCH
    }
    catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}

export const cancel_user = (userID) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    
    try {
        const res = await axios.request({
            method: 'POST',
            url: 'api/users/cancel',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                currRequester: userID
            }
        })
        
        //DISPATCH
    }
    catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}

//Register User
export const register = (
    {
        firstName,
        lastName,
        email,
        nickName,
        password
    }
) => async dispatch => {
  const config = {
        headers: {
            "Content-Type": "application/json"
        }
  };
  const body = JSON.stringify(
      {
        firstName,
        lastName,
        email,
        nickName,
        password
        }
    );
    try {
        const res = await axios.post("/api/auth/register", body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser()); ///here
    } 
    catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: REGISTER_FAIL
        });
    }
};

//Login user
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const body = JSON.stringify({
        email,
        password
    });

    try {
        const res = await axios.post("/api/auth/login", body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser()); ///here
    } 
    catch (err) {
        const errors = err.response.data.errors;
        
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: LOGIN_FAIL
        });
    }
};

///logout / clear profile
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
