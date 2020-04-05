import React, { useState, useEffect } from 'react';
import OpenSocket from 'socket.io-client';
const socket = OpenSocket('http://localhost:3000');

const Chat = () => {
    const [message, set_message] = useState('');
    const [messages, set_messages] = useState([]);
    const [isUpdate, set_update] = useState(false);

    useEffect(() => {
        const addMessage = data => {
            set_messages([...messages, data]);
        };

        socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });
    
    }, [isUpdate])
    

    return (
        <div className="k">
            <div className="row">
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">Global Chat</div>
                            <hr/>
                            <div className="messages">
                                {console.log(JSON.stringify(messages))}
                                {
                                messages.map((message, index) => {
                                    return (
                                        <li key = {index}>
                                            <div>{message.author}: {message.message}</div>
                                        </li>
                                        
                                    )
                                })}
                            </div>
                            <div className="foot">
                                <br/>
                                <input 
                                    type="text" 
                                    placeholder="Message" 
                                    className="form-control"
                                    value = {message} 
                                    onChange={ev => set_message(ev.target.value)}
                                />
                                <br/>
                                <button 
                                    className="btn btn-primary form-control"
                                    onClick = {(e) => {
                                        e.preventDefault();
                                        socket.emit('SEND_MESSAGE', {
                                            author: 'Khai',
                                            message: message
                                        });
                                        set_message('');
                                        set_update(!isUpdate);
                                    }}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Chat;