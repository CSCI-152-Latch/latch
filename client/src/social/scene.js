import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cancel_user } from './redux/dispatch';
import { get_user_relation } from './utils/functions';
import { Redirect } from "react-router-dom";

import Requesters from './components/Requester';

const Social = () => {
    const [requesters, set_request] = useState([]);

    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        const fetch_data = async () => {
            try {
                const requesters = await get_user_relation('requesters');
                set_request(requesters);
            }
            catch (err) {
                alert(err);
            }
        }
        fetch_data();
    }, [])

    if (!isAuthenticated) {
        return <Redirect to="/login" />
    }

    return (
        <Fragment>  
            <Requesters 
                users = { requesters }
                className = 'profile-size'
            />
        </Fragment>
    )
}

export default Social;