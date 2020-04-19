import React, { useEffect, useState, useCallback } from 'react';
import Socket from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { get_post, create_post, new_post, send_comment } from './redux/dispatch';
const socket = Socket.connect('http://localhost:3000');

const Post = () => {
    const dispatch = useDispatch();
    const isCreatePost = useSelector((state) => state.communityboard.isCreatePost);
    const posts = useSelector((state) => state.communityboard.posts);
    const [text, set_text] = useState('');
    const [comment, set_comment] = useState('');

    const initFetch = useCallback(() => {
        const fetch_data = async () => {
            const posts = await get_post();
            dispatch(posts);
        }
        fetch_data();
    }, [dispatch]);
    
    useEffect(() => {
        initFetch();
        socket.emit('CONNECT_COMMUNITY_BOARD', 'room');
    }, [initFetch]);

    useEffect(() => {
        socket.on('RECIEVE_COMMUNITY_BOARD', (data) => {
            dispatch(data);
        })
    }, []);

    const view_post = () => {
        if (isCreatePost) {
            return (
                <di>
                    {/* Inputing the content for post */}
                    <input
                        type = 'text'
                        onChange = {(e) => {
                            set_text(e.target.value);
                        }}
                        value = {text}
                    />
                    {/* Click send */}
                     <button
                        onClick = {() => {
                            const send_data = async () => {
                                const data = {
                                    text: text
                                };
                                const [newPost, status] = await new_post(data, !isCreatePost);
                                const newDispatch = await get_post();
                                // dispatch(newPost);
                                dispatch(status);
                                dispatch(newDispatch);
                                socket.emit('UPDATE_COMMUNITY_BOARD', newDispatch);
                                set_text('');
                            }
                            send_data();
                        }}
                    >
                        Finish!
                    </button>
                    {/* Cancel post */}
                    <button
                        onClick = {() => {
                            const status = create_post(!isCreatePost);
                            dispatch(status);
                            set_text('');
                        }}
                    >
                        Cancel!
                    </button>
                </di>
            )
        } 
        else {
            return (
                // display a create post button
                <button
                    onClick = {() => {
                        const status = create_post(!isCreatePost);
                        dispatch(status);
                    }}
                >
                    Create Post
                </button>
            )
        }
    }

    return (
        <div>
            {view_post()}
            {posts.map((post) => {
                return (
                    <div key = {post._id}>
                        {/* User profile */}
                        {post.user.firstName} {post.user.lastName} 
                        <h1>
                            {/* content */}
                            {post.text}
                        </h1>
                        {/* The like */}
                        <input
                            type = 'button'
                            value = 'Like'
                        />

                        <div>
                            comments: 
                            {/* Inputing a comment */}
                            <input key = {post._id}
                                type = 'text'
                                onChange = {(e) => {
                                    const currComment = e.target.value;
                                    set_comment(currComment);
                                }}
                            />
                            {/* Send a comment */}
                            <input
                                type = 'button'
                                value = 'Send Comment'
                                onClick = {() => {
                                    const send_data = async () => {
                                        const data = {
                                            postID: post._id,
                                            text: comment
                                        }
                                        const newComment = await send_comment(data);
                                        dispatch(newComment);
                                        const newDispatch = await get_post();
                                    socket.emit('UPDATE_COMMUNITY_BOARD', newDispatch);
                                    }
                                    send_data();
                                }}
                            />
                            <br/>

                            {/* Display Comments */}
                            {post.comments.map((comment, index) => {
                                return (
                                    <div key = {index}>
                                        {comment._id.firstName} {comment._id.lastName} <br/>
                                        {comment.text} <br/>
                                        {comment.date}
                                    </div>
                                )
                            })}
                        </div>
                        {post.date}
                        <br/> <br/>
                    </div>
                )
            })}
        </div>
    )
}

export default Post;