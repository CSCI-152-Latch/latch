import React, { Fragment } from 'react';

import { 
    Mutual, 
    Requester,
    Friend, 
    Responder, 
    Room, 
    Message
} from './components/index';
import './style.css'

const Social = () => {

    return (
        <Fragment>
            <Mutual
                className = 'profile-size'
            />
            <Requester
                className = 'profile-size'
            />
            <Friend
                className = 'profile-size'
            />
            <Responder
                className = 'profile-size'
            />
            <Room
                className = 'profile-size'
            />
            <Message
                className = 'profile-size'
            />
        </Fragment>
    )
}

export default Social;
