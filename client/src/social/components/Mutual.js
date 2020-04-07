import React from 'react'

const Mutual = (prop) => {
    const { users, className, onAdd } = prop;

    return (
        <div>
            <h1>
                You may know this user?
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
                                placeholder = 'Add'
                                onClick = {() => {
                                    onAdd(user._id)
                                }}
                            />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Mutual;