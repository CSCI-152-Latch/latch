import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_friends, delete_user } from './dispatch';

const Friend = (prop) => {
    const { className } = prop;
    const dispatch = useDispatch()

    const initFetch = useCallback(() => {
        const fetch_data = async () => {
            const friends = await get_friends();
            dispatch(friends);
        }
        fetch_data();
    }, [dispatch]);
    
    useEffect(() => {
        initFetch();
    }, [initFetch]);

    const friends = useSelector((state) => state.social.friends);
    console.log('From Friend');

    return (
        <div>
            <h1>
                Friend
            </h1>
            <ul>
                {friends.map((user) => {
                    return (
                        <li key = {user._id}>
                            {user.firstName} {user.lastName},
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
                                        const friends = await delete_user(user._id);
                                        dispatch(friends);
                                    }
                                    send_data();
                                }}
                            >
                                Delete
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Friend;