import React, { useEffect, useState, useCallback } from 'react';
import Socket from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { get_post, new_post, send_comment } from './redux/dispatch';
const socket = Socket.connect('http://localhost:3000');

const Post = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.communityboard.posts);
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

    return (       
        <div>
            <section className="container">
                <h1 className="large text-primary">
                    Posts
                </h1>
                <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>

                <div className="post-form">
                    <div className="bg-primary p">
                        <h3>Say Something...</h3>
                    </div>
                    <div className="form my-1">
                        <textarea
                            name="text"
                            cols="30"
                            rows="5"
                            placeholder='Create a post'
                            value={text}
                            onChange={(e) => {
                                const newPost = e.target.value;
                                set_text(newPost);
                            }}
                            required
                        ></textarea>
                        <input 
                            type="submit" 
                            className="btn btn-dark my-1" 
                            value="Submit!!!"
                            onClick = {() => {
                                const send_data = async () => {
                                    const data = {
                                        text: text
                                    };
                                    await new_post(data);
                                    const newDispatch = await get_post();
                                    socket.emit('UPDATE_COMMUNITY_BOARD', newDispatch);
                                    dispatch(newDispatch);
                                    set_text('');
                                }
                                send_data();
                            }}
                        />
                        <input
                            type='submit'
                            className="btn btn-dark my-1" 
                            value='Cancel'
                            onClick={() => {
                                set_text('');
                            }}
                        />
                    </div>
                </div>

                {/* User */}
                <div className="post">
                    <div className="post bg-white p-1 my-1">
                        {posts.map((post) => {
                            return (
                                <div key = {post._id}>
                                     <div>
                                        <img
                                            className="round-img"
                                            src={post.user.avatar}
                                            alt=""
                                        />
                                        <h4> {post.user.firstName} {post.user.lastName} </h4>
                                    </div>

                                    <div>
                                        <p className="my-1">
                                        {post.text}
                                        </p>
                                        <p className="post-date">
                                        {post.date}
                                        </p>

                                        <button type="button" className="btn btn-light">
                                            <i className="fas fa-thumbs-up"></i>
                                            <span> 4 </span>
                                        </button>

                                        <button type="button" className="btn btn-light">
                                            <i className="fas fa-thumbs-down"></i>
                                        </button>
                                    </div>

                                    {/* Comment */}
                                    <div className="post-form">
                                        <div className="bg-primary p">
                                            <h5>Leave A Comment</h5>
                                        </div>
                                        <div className="form my-1">
                                            <textarea
                                                name="text"
                                                cols="30"
                                                rows="5"
                                                placeholder="Comment on this post"
                                                value={comment}
                                                required
                                                onChange={(e) => {
                                                    const currComment = e.target.value;
                                                    set_comment(currComment);
                                                }}
                                            ></textarea>
                                            <input 
                                                type="submit" 
                                                className="btn btn-dark my-1" 
                                                value='Submit' 
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
                                                            set_comment('');
                                                    }
                                                    send_data();
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {post.comments.map((comment, index) => {
                                        return (
                                            <div className='comments' key={index}>
                                                <div className="post bg-white p-1 my-1">
                                                    <img
                                                        className="round-img"
                                                        src={comment._id.avatar}
                                                        alt=""
                                                    />
                                                    <h2>
                                                        {comment._id.firstName} {comment._id.lastName}
                                                    </h2>
                                                    <br/>
                                                    <p className="my-1">
                                                        <h3>
                                                        {comment.text} 
                                                        </h3>
                                                    </p>
                                                    <br/>
                                                    <p className="post-date">
                                                        Posted on {comment.date}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Post;