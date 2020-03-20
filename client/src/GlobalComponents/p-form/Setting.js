import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { get_user } from '../../actions/auth'

const Setting = () => {
    const [user, setUser] = useState({
        status: '',
        bio: '',
        field: [],
        _id: {
            _id: '',
            firstName: '',
            lastName: '',
            email: '',
            nickName: '',
            avatar: '',
            password: '',
            date: '',
        },
        experience: []
    });
    
    useEffect(() => {
        const fetch_data = async () => {
            try {
                const user = await get_user();
                console.log('Inside: ' + user._id.avatar);
                setUser(user);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetch_data();
    }, []);
    console.log('Outside: ' + user._id.avatar);

    return (
        <Fragment>
            <div className='container'>
                {/* This is the profile */}
                <div className='profile-top bg-primary p-2'>
                    <img 
                        className='round-img my-1'
                        src={user._id.avatar}
                        alt=''
                    />
                    <h1 className='large'> 
                        <input
                            type='text'
                            placeholder={user._id.firstName}
                        />
                        <input
                            type='text'
                            placeholder={user._id.lastName}
                        />
                    </h1>
                    <div className='large'>
                        <input
                            type='text'
                            placeholder={user._id.email} 
                        />
                    </div>
                    <div className='large'>
                        <input
                            type='text'
                            placeholder={user._id.password}
                        />
                    </div>
                    <div className='large'>
                        <input
                            type='text'
                            placeholder={user._id.nickName}
                        />
                    </div>
                    <div className='large'> Created account on {user._id.date} </div>
                    <div className='large'>
                        <input
                            type='text'
                            placeholder={user.status}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    );   
}

export default Setting;
