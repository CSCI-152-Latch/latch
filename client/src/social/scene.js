import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add_user, create_chat, cancel_user, accept_user, decline_user, delete_user } from './redux/dispatch';
import { get_user_relation, get_chats, get_specific_conversation } from './utils/functions';
import { Redirect } from "react-router-dom";

import Mutual        from './components/Mutual'
import Friend        from './components/Friend';
import Responder     from './components/Responder';
import Requester     from './components/Requester';
import ChatList      from './components/ChatList';
import Conversation  from './components/Conversation'

import './style.css'

const Social = () => {
    const [mutuals, set_mutuals] = useState([]);
    const [friends, set_friends] = useState([]);
    const [responders, set_responders] = useState([]); 
    const [requesters, set_requesters] = useState([]);
    const [chats, set_chatlist] = useState([]);
    const [conversations, set_conversations] = useState([]);

    const [currMessage, set_message] = useState('');

    const [isUpdate, set_update] = useState(false);
    const [isChat, set_chat] = useState(false)

    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        const fetch_data = async () => {
            try {
                // const mutuals = await get_user_relation('users/mutuals');
                // set_mutuals(mutuals);

                // const requesters = await get_user_relation('social/requesters');
                // set_requesters(requesters);

                // const responders = await get_user_relation('social/responders');
                // set_responders(responders);

                // const friends = await get_user_relation('social/friends');
                // set_friends(friends);

                const chats = await get_chats();
                set_chatlist(chats);
            }
            catch (err) {
                alert(err);
            }
        }
        fetch_data();
    }, [isUpdate, isChat])

    useEffect(() => {
        const fetch_data = async () => {
            try {

            }
            catch (err) {
                alert(err);
            }
            fetch_data();
        }
    }, )

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
                        set_update(!isUpdate);
                    }
                    fetch_data();
                }}
            />
            <Friend
                users = {friends}
                className = 'profile-size'
                onDelete = {(id) => {
                    const fetch_data = async () => {
                        const newDispatch = await delete_user(id);
                        dispatch(newDispatch);
                        // set_update(!isUpdate);
                    }
                    fetch_data();
                }}
            />
            <Requester
                users = {requesters}
                className = 'profile-size'
                onCancel = {(id) => {
                    const fetch_data = async () => {
                        const newDispatch = await cancel_user(id);
                        dispatch(newDispatch)
                        set_update(!isUpdate);
                    }
                    fetch_data();
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
                        set_update(!isUpdate);
                    }
                    fetch_data()
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
            <ChatList
                chats = {chats}
                className = 'profile-size'
                onChat = {(id) => {
                    set_chat(true);
                    const fetch_data = async () => {
                        const getMessage = await get_specific_conversation(id);
                        set_conversations(getMessage);
                        set_chat(true);
                    }
                    fetch_data();
                }}
            />
            <Conversation
                conversations = {conversations}
                className = 'profile-size'
                onChange = {(newMessage) => {
                    set_message(newMessage);
                }}
                onMessage = {(id, newMessage) => {
                    const fetch_data = async () => {
                        // const newDispatch = await add_message(id, newMessage);
                        // dispatch
                    }
                    fetch_data();
                }}
                onChat = {isChat}
            />
        </Fragment>
    )
}

export default Social;