import axios from "axios";
import { setAlert } from "./alert";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt from 'jsonwebtoken';

//Load User
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const { user } = jwt.decode(localStorage.token)
        const res = await axios.request({
            method: 'GET',
            url: '/api/profile/me',
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                user: user.id
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
    try {
        const { user } = jwt.decode(localStorage.token)
        const res = await axios.request({
            method: 'GET',
            url: '/api/profile/me',
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                user: user.id
            }
        });
        
        return res.data;
    }
    catch (err) {
        return err
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
    dispatch({ type: LOGOUT });
};
