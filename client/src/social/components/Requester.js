import React from 'react';

const Requester = (prop) => {
    const { users, className, onCancel } = prop;

    return (
        <div>
            <h1>
                Requester
            </h1>
            <ul>
                {users.map((user) => {
                    return (
                        <li key = { user._id }>
                            { user.firstName } { user.lastName }
                            <div>
                                <img src = { user.avatar } className = { className }/>
                            </div>
                            <input 
                                type = 'button'
                                placeholder = 'Cancel'
                                onClick = {() => {
                                    onCancel(user._id) 
                                }}  
                            />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Requester;