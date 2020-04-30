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
            <h1 className="large text-primary">Update your credentials Here</h1>
            <div className='form'>
                <Field
                    field = 'firstName'
                    update_field = {Dispatch.update_field}
                    className = 'form-group'
                />
                <Field
                    field = 'lastName'
                    update_field = {Dispatch.update_field}
                    className = 'form-group'
                />
                <Field
                    field = 'email'
                    update_field = {Dispatch.update_field}
                    className = 'form-group'
                />
                <Field
                    field = 'nickName'
                    update_field = {Dispatch.update_field}
                    className = 'form-group'
                />
                <Field
                    field = 'date'
                    update_field = {Dispatch.update_field}
                    className = 'form-group'
                />
                <Editable
                    className = 'button-size'
                />
            </div>
        </Fragment>
    );   
}
  
export default Setting;