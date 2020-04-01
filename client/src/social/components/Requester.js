import React from 'react';

const Requesters = (prop) => {
    const { users, className } = prop;

    return (
        <ul>
            {users.map((user) => {
                return (
                    <li key = { user._id }>
                        { user.firstName } { user.lastName }
                        <div>
                            <img src = { user.avatar } className = { className }/>
                        </div>
                        {/* <input 
                            type='button'
                            placeholder='Cancel'
                            onClick={ cancel }
                        /> */}
                    </li>
                )
            })}
        </ul>
    )
}

export default Requesters;