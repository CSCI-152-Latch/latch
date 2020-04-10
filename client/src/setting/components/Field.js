import React, { useState } from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

const Field = (prop) => {
    const { field, update_field, className } = prop;

    const dispatch = useDispatch();
    const getField = useSelector(state => {
        const getState = state.setting.user;
        if (getState) {
            return getState[field];
        }
    }, shallowEqual);

    const [data, set_data] = useState('');
    const getRead = useSelector(state => state.setting.isRead, shallowEqual);

    return (
        <div>
            <input
                type = 'text'
                value = {data}
                placeholder = {getField}
                onChange = {(e) => {
                    const send_field = async () => {
                        const newData = e.target.value;
                        set_data(newData);

                        const newDispatch = await update_field(field, newData);
                        dispatch(newDispatch);
                    }
                    send_field();
                }}
                className = {className}
                readOnly = {getRead}
            />      
        </div>
    );
}

export default Field;