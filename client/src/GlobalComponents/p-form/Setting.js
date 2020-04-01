import React, { Fragment, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { get_user, update_user } from '../../actions/auth'

const Setting = ({ update_user, isAuthenticated }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetch_data = async () => {
            try {
                const user = await get_user();
                setUser(user);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetch_data();
    }, []);
    
    if (!isAuthenticated) {
        return <Redirect to="/login" />
    }
    
    return (
        <Fragment>
            <div className='container'>
                {/* This is the profile */}
                <div className='profile-top bg-primary p-2'>
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
                                user.firstName = e.target.value;
                                console.log(user.firstName);
                                update_user(user);
                            }}
                        />
                        <input
                            type='text'
                            placeholder={user.lastName}
                            onChange={(e) => {
                                user.lastName = e.target.value
                                update_user(user);
                            }}
                        />
                    </h1>
                    <div className='large'>
                        <input
                            type='text'
                            placeholder={user.email} 
                            onChange={(e) => {
                                user.email = e.target.value
                                update_user(user);
                            }}
                        />
                    </div>
                    <div className='large'>
                        <input
                            type='text'
                            placeholder={user.password}
                            onChange={(e) => {
                                user.password = e.target.value
                                update_user(user);
                            }}
                        />
                    </div>
                    <div className='large'>
                        <input
                            type='text'
                            placeholder={user.nickName}
                            onChange={(e) => {
                                user.nickName = e.target.value
                                update_user(user);
                            }}
                        />
                    </div>
                    <div className='large'> Created account on {user.date} </div>
                </div>
            </div>
        </Fragment>
    );   
}

Setting.propTypes = {
    update_user: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
  

export default connect(mapStateToProps, { update_user })(Setting);
