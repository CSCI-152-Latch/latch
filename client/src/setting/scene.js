import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from "react-router-dom";

import Dispatch from './redux/dispatch';

import Field from './components/Field';
import Editable from './components/Editable';

import './style.css'

const Setting = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetch_data = async () => {
            const newDispatch = await Dispatch.get_field();
            dispatch(newDispatch);
        }
        fetch_data();
    }, [])

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if (!isAuthenticated) {
        return <Redirect to="/login" />
    }

    return (
        <Fragment>
            <div className='container profile-top bg-primary p-2'>
                <Field
                    field = 'firstName'
                    update_field = {Dispatch.update_field}
                    className = 'large'
                />
                <Field
                    field = 'lastName'
                    update_field = {Dispatch.update_field}
                    className = 'large'
                />
                <Field
                    field = 'email'
                    update_field = {Dispatch.update_field}
                    className = 'large'
                />
                <Field
                    field = 'nickName'
                    update_field = {Dispatch.update_field}
                    className = 'large'
                />
                <Field
                    field = 'date'
                    update_field = {Dispatch.update_field}
                    className = 'large'
                />
                <Editable
                    className = 'button-size'
                />
            </div>
        </Fragment>
    );   
}
  
export default Setting;