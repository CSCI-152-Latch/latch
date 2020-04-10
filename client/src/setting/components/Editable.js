import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Editable = (prop) => {
    const { className } = prop;
    const dispatch = useDispatch();
    const getRead = useSelector(state => state.setting.isRead);

    return (
        <div>
            <button
                className = {className}
                onClick = {() => {
                    dispatch({
                        type: 'EDIT_DATA',
                        payload: !getRead
                    })
                }}
            >
                Edit
            </button>
        </div>
    );
}

export default Editable;