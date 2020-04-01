import React, { Fragment, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { get_user } from '../../actions/chat';
import { get } from "mongoose";

const Chat = ({chat}) => {
    // const [title, setTitle] = useState('');
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);

    const [isUpdate, setUpdate] = useState(false);

    useEffect(() => {
        const fetch_data = async () => {
            for (var i = 0; i < chat.users.length; ++i) {
                const user = await get_user(chat.users[i]);
                setUsers([...users, user]);
            }
        }

        fetch_data();
    }, [isUpdate]);


    return (
        <Fragment>
            <ul>
                <h1>
                    Users
                </h1>
                {
                    users.map((user) => {
                        return (
                            <li key={user}>
                                <div>
                                    
                                </div>
                            </li>
                        )
                    })
                }
            </ul>

        </Fragment>
    )    
}