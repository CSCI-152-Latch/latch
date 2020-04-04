import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';

const Conversation = (prop) => {
    const { conversations, className, onChange, onMessage, onChat } = prop;
    console.log('sadjdsasdaasdd')
    console.log(conversations);

    if (!onChat) {
        return (
            <div>
                <h1> This is empty </h1>
            </div>
        )
    }

    return (
        <ul>
            <h1>
                This your conversation
            </h1>
            <div>
                {conversations.map((messages, index) => {
                    return (
                        <li key = {index}>
                            {/* {messages.map((message) => {
                                return (
                                    <li key = {message._id}>
                                        {message.owner}
                                    </li>
                                )
                            })} */}
                        </li>
                    )
                })}
                {/* {conversations.messages.map((message) => {
                    return (
                        <li key = {message._id}>
                            {message.owner.firstName} {message.owner.lastName}  : {message.message}
                        </li>
                    )
                })} */}
            </div>  
            <input
                type = 'text'
                className = {className}
                placeholder = 'Add Message'
                onChange = {(e) => {
                    const newMessage = e.target.value;
                    onChange(newMessage);
                }}
                onClick = {() => {
                    onMessage();
                }}
            />
        </ul>
    )
}

export default Conversation;