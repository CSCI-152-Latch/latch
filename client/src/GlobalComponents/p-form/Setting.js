import React, { Fragment, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { get_user, update_user } from '../../actions/auth'

const Setting = ({ update_user, isAuthenticated }) => {
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
                setUser(user);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetch_data();
    }, [user]);

    const onChange = (value) => {
       
    }
    
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
                        src={user._id.avatar}
                        alt=''
                    />
                    <h1 className='large'> 
                        <input
                            type='text'
                            placeholder={user._id.firstName}
                            onChange={(e) => {
                                user._id.firstName = e.target.value;
                                update_user(user._id);
                            }}
                        />
                        <input
                            type='text'
                            placeholder={user._id.lastName}
                            onChange={(e) => {
                                user._id.lastName = e.target.value
                                update_user(user._id);
                            }}
                        />
                    </h1>
                    <div className='large'>
                        <input
                            type='text'
                            placeholder={user._id.email} 
                            onChange={(e) => {
                                user._id.email = e.target.value
                                update_user(user._id);
                            }}
                        />
                    </div>
                    <div className='large'>
                        <input
                            type='text'
                            placeholder={user._id.password}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className='large'>
                        <input
                            type='text'
                            placeholder={user._id.nickName}
                            onChange={(e) => onChange(e)}
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

Setting.propTypes = {
    update_user: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
  

export default connect(mapStateToProps, { update_user })(Setting);
