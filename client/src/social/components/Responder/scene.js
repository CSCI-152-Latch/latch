import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_responders, accept_user, decline_user, create_chat } from './dispatch';

const Responder = (prop) => {
    const { className } = prop;
    const dispatch = useDispatch();

    const initFetch = useCallback(() => {
        const fetch_data = async () => {
            const responders = await get_responders();
            dispatch(responders);
        }
        fetch_data();
    }, [dispatch]);
    
    useEffect(() => {
        initFetch();
    }, [initFetch]);

    const responders = useSelector((state) => state.social.responders);
    console.log('From Responder');

    return (
        <div className="profile-top bg-primary m">
            <h1>
                Responder
            </h1>
            <ul>
                {responders.map((user) => {
                    return (
                        <li key = {user._id}>
                            {user.user.firstName} {user.user.lastName}
                            <br/>
                            <img 
                                src = {user.user.avatar} 
                                className = {className}
                                alt = ''
                            />
                            <br/>
                            <button 
                            className="button-size"
                                type = 'button'
                                onClick = {() => {
                                    const send_data = async () => {
                                        const acceptUser = await accept_user(user.user._id);
                                        await create_chat(user.user._id);
                                        const responders = await get_responders();
                                        dispatch(responders);
                                        dispatch(acceptUser);
                                    }
                                    send_data();
                                }}
                            >
                                Accept
                            </button>
                            <button 
                                type = 'button'
                                onClick = {() => {
                                    const send_data = async () => {
                                        const responders = await decline_user(user.user._id);
                                        dispatch(responders);
                                        console.log(responders);
                                    }
                                    send_data();
                                }}
                            >
                                Decline
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Responder;