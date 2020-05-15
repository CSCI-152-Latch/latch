import React, { useState, useEffect } from 'react';
import Socket from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { add_messages } from './dispatch';
const socket = Socket.connect('http://localhost:3000');

const Message = (prop) => {
    const { className } = prop;
    const dispatch = useDispatch();

    const messages = useSelector((state) => state.social.messages);
    const chatID = useSelector((state) => state.social.chatID);
    const [message, set_message] = useState('');

    useEffect(() => {
        if (chatID) {
            socket.emit('CONNECT', chatID);
        }
    }, [chatID])

    useEffect(() => {
        socket.on('RECIEVE_MESSAGE', (data) => {
            dispatch(data);
        });
    }, [])

    console.log('From Message');

    if (!chatID) {
        return (
            <div>
                You have not click any chat
            </div>
        )
    } 

    return (
        <ul>
            <h1>
                This your conversation
            </h1>
            {messages.map((message) => {
                return (
                    <li key = {message._id}>
                        <img 
                            src = {message.owner.avatar} 
                            className = {className}
                            alt = ''
                        />
                        <br/>
                        {message.owner.firstName} {message.owner.lastName}: {message.message}
                        <br/>
                        {message.date}
                    </li>
                )
            })}
            <input
                type = 'text'
                placeholder = 'Add Message'
                className="form-group"
                value = {message}
                size = {30}
                onChange = {(e) => {
                    set_message(e.target.value);
                }}
            />
            <button className="button-size"
                onClick = {(e) => {
                    const send_data = async () => {
                        e.preventDefault();
                        const data = {
                            chatID: chatID, 
                            message: message, 
                            date: Date.now()
                        }
                        const newDispatch = await add_messages(data);
                        dispatch(newDispatch);
                        socket.emit('SEND_MESSAGE', {newDispatch: newDispatch, chatID: chatID});
                        set_message('');
                    }
                    send_data();
                }}
            >
                Send
            </button>
        </ul>
    )
}

export default Message;