import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { update_user } from './redux/dispatch';
import { get_user } from './utils/functions';
import { Redirect } from "react-router-dom";

const Setting = () => {
    const [user, setUser] = useState({});

    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        const fetch_data = async () => {
            try {
                const user = await get_user();
                setUser(user);
            }
            catch (err) {
                alert(err);
            }
        }
        fetch_data();
    });
    
    if (!isAuthenticated) {
        return <Redirect to="/login" />
    }
    
    return (
        <Fragment>
            <div className='container profile-top bg-primary p-2'>
                {/* This is the profile */}
                    <img 
                        className='round-img my-1'
                        src={user.avatar}
                        alt=''
                    />
                    <h1 className='large'> 
                        <input
                            type='text'
                            placeholder={user.firstName}
                            onChange={(e) => {
                                const fetch_data = async () => {
                                    user.firstName = e.target.value;
                                    dispatch(await update_user(user));
                                }
                                fetch_data();
                            }}
                        />
                        <input
                            type='text'
                            placeholder={user.lastName}
                            onChange={(e) => {
                                user.lastName = e.target.value
                                dispatch(update_user(user));
                            }}
                        />
                    </h1>
                    <div className='large'>
                        <input
                            type='text'
                            placeholder={user.email} 
                            onChange={(e) => {
                                user.email = e.target.value
                                dispatch(update_user(user));
                            }}
                        />
                    </div>
                    <div className='large'>
                        <input
                            type='text'
                            placeholder={user.password}
                            onChange={(e) => {
                                user.password = e.target.value
                                dispatch(update_user(user));
                            }}
                        />
                    </div>
                    <div className='large'>
                        <input
                            type='text'
                            placeholder={user.nickName}
                            onChange={(e) => {
                                const fetch_data = async () => {
                                    user.nickName = e.target.value
                                    dispatch(await update_user(user));
                                }
                                fetch_data();
                            }}
                        />
                    </div>
                    <div className='large'> Created account on {user.date} </div>
            </div>
        </Fragment>
    );   
}
  
export default Setting;
