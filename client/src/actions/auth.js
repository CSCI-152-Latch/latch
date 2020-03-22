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
  CLEAR_PROFILE
  USER_UPDATED
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

export const update_user = (user) => async dispatch => {
    try {
        console.log(user);
        const res = await axios.request({
            method: 'POST',
            url: '/api/users/update',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                nickName: user.nickName,
                avatar: user.avatar,
                password: user.password,
                date: user.data
            }
        })
        console.log(res);
        dispatch({
            type: USER_UPDATED,
            payload: res.data
        });
    }
    catch (err) {
        console.log(err);
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
