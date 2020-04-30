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
                className = 'round-img my-1'
            />
            <Requester
                className = 'round-img my-1'
            />
            <Friend
                className = 'round-img my-1'
            />
            <Responder
                className = 'round-img my-1'
            />
            <Room
                className = 'profile-size'
            />
            <Message
                className = 'round-img my-1'
            />
        </Fragment>
    )
}

export default Social;
