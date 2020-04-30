import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_chats, get_messages } from './dispatch';

const Room = (prop) => {
    const { className } = prop;
    const dispatch = useDispatch();

    const initFetch = useCallback(() => {
        const fetch_data = async () => {
            const rooms = await get_chats();
            dispatch(rooms);
        }
        fetch_data();
    }, [dispatch]);
    
    useEffect(() => {
        initFetch();
    }, [initFetch]);

    const rooms = useSelector((state) => state.social.rooms); 
    console.log('From Room');
    console.log(rooms);

    return (
        <div>
            <h1>
                Chat List
            </h1>
            <ul>
                {rooms.map((chat) => {
                    return (
                        <div key = {chat._id}>
                            <h1>
                                {chat.title}
                            </h1>
                            <button 
                                type = 'button'
                                className = {className}
                                onClick = {() => {
                                    const send_data = async () => {
                                        const messages = await get_messages(chat._id);
                                        dispatch(messages);
                                    }
                                    send_data();
                                }}
                            >
                                {chat.users.map((user) => {
                                return (
                                    <li key = {user._id._id}>
                                        {user._id.firstName}  {user._id.lastName}
                                    </li>
                                )
                                })}
                            </button>
                        </div>
                    )
                })} 
            </ul>
        </div>
    )
}

export default Room;