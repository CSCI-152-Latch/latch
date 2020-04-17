import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_post, create_post, new_post } from './redux/dispatch';

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
    }, [initFetch]);

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
                                dispatch(newPost);
                                dispatch(status);
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
                        like: {post.likes.count} <br/>

                        <div>
                            comments: 
                            {/* Inputing a comment */}
                            <input
                                type = 'text'
                                onChange = {(e) => {
                                    const currComment = e.target.value;
                                    set_comment(currComment);
                                }}
                                value = {comment}
                            />
                            {/* Send a comment */}
                            <button
                                onClick = {() => {
                                    
                                }}
                            >
                                Send Comment
                            </button>
                            <br/>

                            {/* Display Comments */}
                            {post.comments.map((comment, index) => {
                                return (
                                    <div key = {index}>
                                        {comment.user.firstName} {comment.user.lastName} <br/>
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