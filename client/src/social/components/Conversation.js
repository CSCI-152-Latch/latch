import React from 'react';

const Conversation = (prop) => {
    const { conversation, className, onChat } = prop;

    if (!onChat) {
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
                        {message.owner.firstName} {' '} {message.owner.lastName} : {message.message}
                        <br/>
                        {message.owner.date}
                    </li>
                )
            })}
            <input
                type = 'text'
                className = {className}
                placeholder = 'Add Message'
                onClick = {() => {
                    
                }}
            />
        </ul>
    )
}

export default Conversation;