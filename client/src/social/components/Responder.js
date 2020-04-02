import React from 'react';

const Responder = (prop) => {
    const { users, className, onAccept, onDecline } = prop;

    return (
        <div>
            <h1>
                Responder
            </h1>
            <ul>
                {users.map((user) => {
                    return (
                        <li key = {user._id}>
                            {user.firstName} {user.lastName}
                            <div>
                                <img src = {user.avatar} className = {className}/>
                            </div>
                            <input 
                                type = 'button'
                                placeholder = 'Accept'
                                onClick = {() => {
                                    onAccept(user._id) 
                                }}  
                            />
                            <input 
                                type = 'button'
                                placeholder = 'Accept'
                                onClick = {() => {
                                    onDecline(user._id) 
                                }}  
                            />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Responder;