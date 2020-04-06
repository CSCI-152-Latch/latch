import React from 'react';

const Conversation = (prop) => {
    const { conversation, message, className, isChat, onMessage, onClick } = prop;

    if (!isChat) {
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
            {conversation.map((message) => {
                return (
                    <li key = {message._id}>
                        <img src = {message.owner.avatar} className = {className}/>
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
                size = {30}
                onChange = {(e) => {
                    const message = e.target.value;
                    onMessage(message);
                }}
                value = {message}
            />
            <button
                onClick = {(e) => {
                    e.preventDefault();
                    onClick();
                }}
            >
                Send
            </button>
        </ul>
    )
}

export default Conversation;