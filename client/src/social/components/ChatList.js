import React from 'react';

const ChatList = (prop) => {
    const { chats, className, onChat } = prop;

    return (
        <div>
            <h1>
                Chat List
            </h1>
            <ul>
                {chats.map((chat) => {
                    return (
                        <li key = {chat._id}>
                            <h1>
                                {chat.title}
                            </h1>
                            {chat.users.map((user) => {
                                return (
                                    <li key = {user._id._id}>
                                        {user._id.firstName}  {user._id.lastName}
                                    </li>
                                )
                            })}
                            <input
                                type = 'button'
                                className = {className}
                                placeholder = 'Hello'
                                onClick = {() => {
                                    onChat(chat._id);
                                }}
                            />
                        </li>
                    )
                })} 
            </ul>
        </div>
    )
}

export default ChatList;