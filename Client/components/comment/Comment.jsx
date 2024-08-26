import React, { useEffect, useState } from 'react';
import { format } from 'timeago.js';
import { request } from '../../util/request';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import person from '../../assets/na.jpeg';


//Comment is a functional component that takes comment as a prop.
const Comment = ({ comment }) => {
    const { user, token } = useSelector((state) => state.auth);
    const [commentAuthor, setCommentAuthor] = useState("");
    const [isLiked, setIsLiked] = useState(comment.likes.includes(user._id));
// useEffect runs when the component mounts or when comment.userId changes.
    useEffect(() => {
        //fetchCommentAuthor is an async function that fetches the author's data using the request utility.
        const fetchCommentAuthor = async () => {
            try {
                const data = await request(`/user/find/${comment.userId}`, 'GET');
                setCommentAuthor(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCommentAuthor();
    }, [comment.userId]);
// handleLikeComment is an async function that toggles the like status of the comment.
    const handleLikeComment = async () => {
        try {
            const headers = { 'Authorization': `Bearer ${token}` };
            await request(`/comment/toggleLike/${comment._id}`, 'PUT', headers);
            //setIsLiked(prev => !prev) updates the isLiked state to its opposite value.
            setIsLiked(prev => !prev);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex items-center justify-between my-4 px-3 py-2 border-b border-gray-300">
            <div className="flex items-center gap-3">
                {/* <img src={person} alt="User" className="h-11 w-11 rounded-full object-cover" /> */}
                <img
                    src={commentAuthor.profilePic ? `http://localhost:5001/images/${commentAuthor.profilePic}` : person}
                    alt="User"
                    className="h-11 w-11 rounded-full object-cover"
                />
                <div className="flex flex-col">
                    <h4 className="text-lg font-semibold">{commentAuthor?.username}</h4>
                    <span className="text-sm text-gray-500">{format(comment.createdAt)}</span>
                    <p className="text-md text-gray-800 mt-1">{comment.text}</p>
                </div>
            </div>
            <div className="text-red-500 cursor-pointer" onClick={handleLikeComment}>
                {isLiked ? <AiFillHeart className="text-xl" /> : <AiOutlineHeart className="text-xl" />}
            </div>
        </div>
    );
};

export default Comment;
