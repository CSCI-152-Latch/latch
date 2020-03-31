import React, { Fragment, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Chat = ({chat}) => {
    const [title, setTitle] = useState('');
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);

    const [isUpdate, setUpdate] = useState(false);

    useEffect(() => {
        const fetch_data = async () => {

        }

        fetch_data();
    }, [isUpdate]);


    return (
        <Fragment>
            <div>
                {title}
            </div>
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