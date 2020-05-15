import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_requesters, cancel_user } from './dispatch';

const Requester = (prop) => {
    const { className } = prop;
    const dispatch = useDispatch();

    const initFetch = useCallback(() => {
        const fetch_data = async () => {
            const requesters = await get_requesters();
            dispatch(requesters);
        }
        fetch_data();
    }, [dispatch]);
    
    useEffect(() => {
        initFetch();
    }, [initFetch]);

    const requesters = useSelector((state) => state.social.requesters);
    console.log('From Requester');

    return (
        <div>
            <h1>
                Requester
            </h1>
            <ul>
                {requesters.map((user) => {
                    return (
                        <li key = { user._id }>
                            { user.user.firstName } { user.user.lastName }
                            <br/>
                            <img 
                                src = { user.user.avatar } 
                                className = { className } 
                                alt = ''
                            />
                            <br/>
                            <button className="button-size"
                                type = 'button'
                                onClick = {() => {
                                    const send_data = async () => {
                                        const requesters = await cancel_user(user.user._id);
                                        dispatch(requesters); 
                                    
                                    }
                                    send_data();
                                }}
                            >
                                Cancel
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Requester;