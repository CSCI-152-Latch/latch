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
        <div className="profile-top bg-primary p-2">
            <h1>
                Friend
            </h1>
            <ul>
                {friends.map((user) => {
                    return (
                        <li key = {user._id}>
                            {user.user.firstName} {user.user.lastName},
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
                                        const deleteFriend = await delete_user(user.user._id);
                                        dispatch(deleteFriend);
                                        console.log(deleteFriend);
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