import React from 'react';

const Friend = (prop) => {
    const { users, className, onDelete } = prop;

    return (
        <div>
            <h1>
                Friend
            </h1>
            <ul>
                {users.map((user) => {
                    return (
                        <li key = {user._id}>
                            {user.firstName} {user.lastName},
                            <div>
                                <img src = {user.avatar} className = {className}/>
                            </div>
                            <input
                                type = 'button'
                                placeholder = 'Delete'
                                onClick = {() => {
                                    onDelete(user._id)
                                }}
                            />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Friend;