import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cancel_user, accept_user, decline_user } from './redux/dispatch';
import { get_user_relation } from './utils/functions';
import { Redirect } from "react-router-dom";

import Requester from './components/Requester';
import Responder from './components/Responder';

const Social = () => {
    const [requesters, set_requesters] = useState([]);
    const [responders, set_responders] = useState([]) 

    const [isUpdate, set_update] = useState(false);

    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        const fetch_data = async () => {
            try {
                const requesters = await get_user_relation('requesters');
                set_requesters(requesters);

                const responders = await get_user_relation('responders');
                set_responders(responders);
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
            <Requester
                users = { requesters }
                className = 'profile-size'
                onCancel = {(id) => {
                    const fetch_data = async () => {
                        const newDispatch = await cancel_user(id);
                        dispatch(newDispatch)
                        set_update(!isUpdate);
                    }
                    fetch_data();
                }}
            />
            <Responder
                user = { responders }
                className = 'profile-size'
                onAccept = {(id) => {
                    const fetch_data = async () => {
                        const newDispatch = await accept_user(id);
                        dispatch(newDispatch);
                        set_update(!isUpdate);
                    }
                    fetch_data()
                }}
                onDecline = {(id) => {
                    const fetch_data = async () => {
                        const newDispatch = await decline_user(id);
                        dispatch(newDispatch);
                        set_update(!isUpdate);
                    }
                    fetch_data();
                }}
            />
        </Fragment>
    )
}

export default Social;