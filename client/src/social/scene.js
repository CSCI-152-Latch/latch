import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add_user, create_chat, cancel_user, accept_user, decline_user, delete_user } from './redux/dispatch';
import { get_user_relation, get_chats, get_specific_conversation } from './utils/functions';
import { Redirect } from "react-router-dom";

import Mutual    from './components/Mutual'
import Friend    from './components/Friend';
import Responder from './components/Responder';
import Requester from './components/Requester';
import Chat      from './components/Chat';
import Room      from './components/Room';
import Conversation from './components/Conversation';

import './style.css'

import OpenSocket from 'socket.io-client';
const socket = OpenSocket('http://localhost:3000');

const Social = () => {
    const [mutuals, set_mutuals] = useState([]);
    const [friends, set_friends] = useState([]);
    const [responders, set_responders] = useState([]); 
    const [requesters, set_requesters] = useState([]);
    const [rooms, set_rooms] = useState([]);
    const [conversations, set_conversation] = useState([]);

    const [isUpdate, set_update] = useState(false);
    const [isChat, set_chat] = useState(false);

    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {        
        const fetch_data = async () => {
            try {
                const mutuals = await get_user_relation('users/mutuals');
                set_mutuals(mutuals);

                const requesters = await get_user_relation('social/requesters');
                set_requesters(requesters);

                const responders = await get_user_relation('social/responders');
                set_responders(responders);

                const friends = await get_user_relation('social/friends');
                set_friends(friends);

                const rooms = await get_chats();
                set_rooms(rooms);
            }
            catch (err) {
                alert(err);
            }
        }
        fetch_data();
    }, [isUpdate, isChat])


    if (!isAuthenticated) {
        return <Redirect to="/login" />
    }

    return (
        <Fragment>  
            <Mutual
                users = {mutuals}
                className = 'profile-size'
                onAdd = {(id) => {
                    const fetch_data = async () => {
                        const newDispatch = await add_user(id);
                        dispatch(newDispatch);
                    }
                    fetch_data();
                    set_update(!isUpdate);
                }}
            />
            <Friend
                users = {friends}
                className = 'profile-size'
                onDelete = {(id) => {
                    const fetch_data = async () => {
                        const newDispatch = await delete_user(id);
                        dispatch(newDispatch);
                    }
                    fetch_data();
                    set_update(!isUpdate);
                }}
            />
            <Requester
                users = {requesters}
                className = 'profile-size'
                onCancel = {(id) => {
                    const fetch_data = async () => {
                        const newDispatch = await cancel_user(id);
                        dispatch(newDispatch)
                    }
                    fetch_data();
                    set_update(!isUpdate);
                }}
            />
            <Responder
                users = {responders}
                className = 'profile-size'
                onAccept = {(id) => {
                    const fetch_data = async () => {
                        const newDispatch = await accept_user(id);
                        await create_chat({'id': id});
                        dispatch(newDispatch);
                    }
                    fetch_data();
                    set_update(!isUpdate);
                }}
                onDecline = {(id) => {
                    const fetch_data = async () => {
                        const newDispatch = await decline_user(id);
                        dispatch(newDispatch);
                        set_update(!isUpdate);
                    }
                    fetch_data();
                }}
            />
            <Room
                rooms = {rooms}
                className = 'profile-size'
                onChat = {(id) => {
                    socket.emit('GET_THIS_CHAT', id);
                    socket.on('RECEIVE_CHAT', data => {
                        const fetch_data = async () => {
                            const conversation = await get_specific_conversation(data);
                            set_conversation(conversation);
                        }
                        fetch_data()
                    })
                    // set_update(!isUpdate);
                    set_chat(true)
                }}
            />
            <Conversation
                conversation = {conversations}
                className = 'profile-size'
                onChat = {isChat}
            />
        </Fragment>
    )
}

export default Social;