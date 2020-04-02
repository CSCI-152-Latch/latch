import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add_user, cancel_user, accept_user, decline_user, delete_user } from './redux/dispatch';
import { get_user_relation } from './utils/functions';
import { Redirect } from "react-router-dom";

import Mutual       from './components/Mutual'
import Friend       from './components/Friend';
import Responder    from './components/Responder';
import Requester    from './components/Requester';

const Social = () => {
    const [mutuals, set_mutual] = useState([]);
    const [friends, set_friends] = useState([]);
    const [responders, set_responders] = useState([]); 
    const [requesters, set_requesters] = useState([]);

    const [isUpdate, set_update] = useState(false);

    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        const fetch_data = async () => {
            try {
                const mutuals = await get_user_relation('users/mutuals');
                set_mutual(mutuals);

                const requesters = await get_user_relation('social/requesters');
                set_requesters(requesters);

                const responders = await get_user_relation('social/responders');
                set_responders(responders);

                const friends = await get_user_relation('social/friends')
                set_friends(friends);
            }
            catch (err) {
                alert(err);
            }
        }
        fetch_data();
    }, [isUpdate])

    if (!isAuthenticated) {
        return <Redirect to="/login" />
    }

    return (
        <Fragment>  
            <Mutual
                users = {mutuals}
                className = 'profile-size'
                onAdd = {(id) => {
                    const fetch_data = async () => {
                        const newDispatch = await add_user(id);
                        dispatch(newDispatch);
                        set_update(!isUpdate);
                    }
                    fetch_data();
                }}
            />
            <Friend
                users = {friends}
                className = 'profile-size'
                onDelete = {(id) => {
                    const fetch_data = async () => {
                        const newDispatch = await delete_user(id);
                        dispatch(newDispatch);
                        set_update(!isUpdate);
                    }
                    fetch_data();
                }}
            />
            <Requester
                users = {requesters}
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
                users = {responders}
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