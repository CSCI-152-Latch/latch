import React, { Fragment, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { 
    get_all_user, 
    get_spending, 
    get_requesting, 
    get_friends, 
    add_user, 
    accept_user, 
    decline_user, 
    delete_user, 
    cancel_user 
} from '../../actions/auth';

const Social = ({ add_user, accept_user, decline_user, delete_user, cancel_user, isAuthenticated }) => {
    const [users, setUsers] = useState([]);
    const [spending, setSpending] = useState([]);
    const [requesting, setRequesting] = useState([]);
    const [friends, setFriends] = useState([]);

    const [isUpdate, setUpdate] = useState(false);
    useEffect(() => {
        const fetch_data = async () => {
            try {
                const users = await get_all_user();
                setUsers(users);

                const spender = await get_spending();
                setSpending(spender);

                const requester = await get_requesting();
                setRequesting(requester);

                const friends = await get_friends();
                setFriends(friends);
                
                console.log('Render!');
            }
            catch (err) {
                console.log(err);
            }
        }
        fetch_data();
    }, [isUpdate]);

    if (!isAuthenticated) {
        return <Redirect to="/login" />
    }

    return (
        <Fragment>
            <ul>
            Stranger List
            {
                users.map(item => {
                    return (
                        <li key={item._id}>
                            <div>
                                <img src={item.avatar} className='profile-size'/>
                                { item.firstName } { item.lastName }
                                <input
                                    type='button'
                                    placeholder='Add'
                                    onClick={() => {
                                        const fetch_data = async () => {
                                            await add_user(item._id);;
                                            setUpdate(!isUpdate);
                                        }
                                        fetch_data();
                                    }}
                                />
                            </div>
                        </li>
                    );
                })
            }
            </ul>
            <ul>
                Spending List
                {
                    spending.map((user) => {
                        return (
                            <li key={user._id}>
                                <div>
                                    <img src={user.avatar} className='profile-size'/>
                                    { user.firstName } { user.lastName } 
                                    <input 
                                        type='button'
                                        placeholder='Accept'
                                        onClick={() => {
                                            const fetch_data = async () => {
                                                await accept_user(user._id);
                                                setUpdate(!isUpdate);
                                            }
                                            fetch_data();
                                        }}
                                    />
                                    <input 
                                        type='button'
                                        placeholder='Decline'
                                        onClick={() => {
                                            const fetch_data = async () => {
                                                await decline_user(user._id);
                                                setUpdate(!isUpdate);
                                            }
                                            fetch_data();
                                        }}
                                    />
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
            <ul>
                Friends List
                {
                    friends.map((friend) => {
                        return (
                            <li key={friend._id}>
                                <div>
                                    <img src={friend.avatar} className='profile-size'/>
                                    { friend.firstName } { friend.lastName }
                                    <input 
                                        type='button'
                                        placeholder='Delete'
                                        onClick={() => {
                                            const fetch_data = async () => {
                                                await delete_user(friend._id);
                                                setUpdate(!isUpdate);
                                            }
                                            fetch_data();
                                        }}
                                    />
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            <ul>
                Requester List
                {
                    requesting.map((user) => {
                        return (
                            <li key={user._id}>
                                <div>
                                    <img src={user.avatar} className='profile-size'/>
                                    { user.firstName } { user.lastName }
                                    <input 
                                        type='button'
                                        placeholder='Cancel'
                                        onClick={() => {
                                            const fetch_data = async () => {
                                                await cancel_user(user._id);
                                                setUpdate(!isUpdate);
                                            }
                                            fetch_data();
                                        }}
                                    />
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </Fragment>
    )
}

Social.propTypes = {
    add_user: PropTypes.func.isRequired,
    accept_user: PropTypes.func.isRequired,
    decline_user: PropTypes.func.isRequired,
    delete_user: PropTypes.func.isRequired,
    cancel_user: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { add_user, accept_user, decline_user, delete_user, cancel_user })(Social);