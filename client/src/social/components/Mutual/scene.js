import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_mutuals, add_user } from './dispatch';

const Mutual = (prop) => {
    const { className } = prop;
    const dispatch = useDispatch();

    const initFetch = useCallback(() => {
        const fetch_data = async () => {
            const friends = await get_mutuals();
            dispatch(friends);
        }
        fetch_data();
    }, [dispatch]);
    
    useEffect(() => {
        initFetch();
    }, [initFetch]);

    const mutuals = useSelector((state) => state.social.mutuals);
    console.log('From Mutual');

    return (
        <div>
            <h1>
                You may know this user?
            </h1>
            <ul>
                {mutuals.map((user) => {
                    return (
                        <li key = {user._id}>
                            {user.firstName} {user.lastName}
                            <br/>
                            <img 
                                src = {user.avatar} 
                                className = {className}
                                alt = ''
                            />
                            <br/>
                            <button 
                                type = 'button'
                                onClick = {() => {
                                    const send_data = async () => {
                                        const friends = await add_user(user._id);
                                        dispatch(friends);
                                    }
                                    send_data();
                                }}
                            >
                                Add me
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Mutual;