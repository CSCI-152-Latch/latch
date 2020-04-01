import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cancel_user } from './redux/dispatch';
import { get_user_relation } from './utils/functions';
import { Redirect } from "react-router-dom";

import Requesters from './components/Requester';

const Social = () => {
    const [requesters, set_request] = useState([]);

    const [isUpate, set_update] = useState(false);

    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        const fetch_data = async () => {
            try {
                const requesters = await get_user_relation('requesters');
                set_request(requesters);
                console.log('Render!');
            }
            catch (err) {
                alert(err);
            }
        }
        fetch_data();
    }, [isUpate])

    if (!isAuthenticated) {
        return <Redirect to="/login" />
    }

    return (
        <Fragment>  
            <Requesters 
                users = { requesters }
                className = 'profile-size'
                onCancel = {(id) => {
                    const fetch_data = async () => {
                        const newDispatch = await cancel_user(id);
                        dispatch(newDispatch)
                        set_update(!isUpate);
                    }
                    fetch_data();
                }}
            />
        </Fragment>
    )
}

export default Social;