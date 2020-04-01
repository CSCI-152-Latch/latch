import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { update_user } from './redux/dispatch';
import { get_field } from './utils/functions';
import { Redirect } from "react-router-dom";

import Text from './components/Text';
import Button from './components/Button';

import './style.css'

const Setting = () => {
    const [user, set_user] = useState({});
    const [isEdit, set_edit] = useState(true);
    const [isUpdate, set_update] = useState(false);

    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        const fetch_data = async () => {
            try {
                const getUser = await get_field();
                set_user(getUser);
            }
            catch (err) {
                alert(err);
            }
        }
        fetch_data();
    }, [isUpdate, isEdit]);
    
    if (!isAuthenticated) {
        return <Redirect to="/login" />
    }
    
    return (
        <Fragment>
            <div className='container profile-top bg-primary p-2'>
                <img 
                    className='round-img my-1'
                    src = { user.avatar }
                    alt = ''
                />
                <Text
                    className = 'large'
                    type = 'text'
                    placeHolder = { user.firstName }
                    onChange = {(e) => {
                        const fetch_data = async () => {
                            const newFirstName = e.target.value;
                            const newDispatch = await update_user('firstName', newFirstName);
                            dispatch(newDispatch);
                            set_update(!isUpdate);
                        }
                        fetch_data();
                    }}
                    readOnly = { isEdit }
                />
                <Text
                    className = 'large'
                    type = 'text'
                    placeHolder = { user.lastName }
                    onChange = {(e) => {
                        const fetch_data = async () => {
                            const newLastName = e.target.value;
                            const newDispatch = await update_user('lastName', newLastName);
                            dispatch(newDispatch);
                            set_update(!isUpdate);
                        }
                        fetch_data();
                    }}
                    readOnly = { isEdit }
                />
                <Text
                    className = 'large'
                    type = 'text'
                    placeHolder = { user.email }
                    onChange = {(e) => {
                        const fetch_data = async () => {
                            const newEmail = e.target.value;
                            const newDispatch = await update_user('email', newEmail);
                            dispatch(newDispatch);
                            set_update(!isUpdate);
                        }
                        fetch_data();
                    }}
                    readOnly = { isEdit }
                />
                <Text
                    className = 'large'
                    type = 'text'
                    placeHolder = { user.password }
                    onChange = {(e) => {
                        const fetch_data = async () => {
                            const newPassword = e.target.value;
                            const newDispatch = await update_user('password', newPassword);
                            dispatch(newDispatch);
                            set_update(!isUpdate);
                        }
                        fetch_data();
                    }}
                    readOnly = { isEdit }
                />
                <Text
                    className = 'large'
                    type = 'text'
                    placeHolder = { user.nickName }
                    onChange = {(e) => {
                        const fetch_data = async () => {
                            const newNickName = e.target.value;
                            const newDispatch = await update_user('nickName', newNickName);
                            dispatch(newDispatch);
                            set_update(!isUpdate);
                        }
                        fetch_data();
                    }}
                    readOnly = { isEdit }
                />
                <div className='large'> 
                    Created account on {user.date} 
                </div>
                <Button
                    className = 'button-size'
                    type = 'button'
                    placeHolder = 'Edit!'
                    onClick = {() => {
                        set_edit(!isEdit);
                    }}
                />
            </div>
        </Fragment>
    );   
}
  
export default Setting;
