

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { request } from '../../util/request';
import { AiFillLike, AiOutlineComment, AiOutlineDelete, AiOutlineLike } from 'react-icons/ai';
import Comment from '../comment/Comment';
import italy from '../../assets/italy.jpg';
import person from '../../assets/na.jpeg';

//post: An object representing a post with properties like userId, desc, imageUrl, etc.
//setUserPosts: A function to update the list of posts in the parent component after actions like editing or deleting.

const Post = ({ post, setUserPosts }) => {
  const { user, token } = useSelector((state) => state.auth);
  const [authorDetails, setAuthorDetails] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isLiked, setIsLiked] = useState(post?.likes?.includes(user._id));
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post?.desc);
  //Triggered when the post.userId changes.
  // Fetches author details from the server and updates authorDetails state
  useEffect(() => {


    if (post.userId) {
      fetchDetails();

    }
  }, [post.userId]);


  const fetchDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5001/user/find/${post.userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setAuthorDetails(data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    //Triggered when the post._id changes.
    const fetchComments = async () => {
      try {
        const data = await request(`/comment/${post._id}`, 'GET');
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    //Fetches comments for the post from the server and updates comments state.
    fetchComments();
  }, [post._id]);

  const handleLike = async () => {

    const headers = { 'Authorization': `Bearer ${token}` };
    try {
      //Sends a request to the server to like the post.
      await request(`/post/likePost/${post._id}`, "PUT", headers);
      //Updates the local isLiked state to reflect the new like status.
      setIsLiked(prev => !prev);
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };

  const handleDislike = async () => {
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
      await request(`/post/dislikePost/${post._id}`, "PUT", headers);
      setIsLiked(prev => !prev);
    } catch (error) {
      console.error('Error disliking the post:', error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    try {
      const data = await request('/comment', 'POST', headers, { text: commentText, postId: post._id });
      setComments(prev => [data, ...prev]);
      setCommentText("");
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    try {
      //Sends a request to delete the post from the server.
      const res = await request(`/post/deletePost/${postId}`, 'DELETE', headers);
      console.log("gggggggg", res);
      if (res.message === "Post has been deleted") {
        window.location.reload()

      }
      if (setUserPosts) {
        //Updates the parent component's posts list if setUserPosts is provided.
        setUserPosts(prevPosts => prevPosts.filter(p => p._id !== postId));

      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };


  const handleSaveEdit = async () => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    try {
      //Sends a request to update the post's content on the server.
      const res = await request(`/post/updatePost/${post._id}`, 'PUT', headers, { desc: editContent });
      console.log("Edited", res);
      if (res) {
        window.location.reload()

      }
      if (setUserPosts) {
        //Updates the parent component's posts list if setUserPosts is provided.
        setUserPosts(prevPosts =>
          prevPosts.map(p => (p._id === post._id ? res : p))
        );
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };


  return (
    <div className="w-full max-w-lg mx-auto flex flex-col border border-gray-300 rounded-2xl overflow-hidden mt-8 relative bg-white shadow-lg">
      <div className="py-4 px-6 flex items-center justify-between border-b border-gray-300">
        <Link to={`/profile/${post.userId}`} className="flex items-center gap-2 text-inherit">
          {/* <img src={person} alt="Author" className="h-12 w-12 object-cover rounded-full border border-gray-300" /> */}
          <img
            src={authorDetails?.profilePic ? `http://localhost:5001/images/${authorDetails.profilePic}` : person}
            alt="Author"
            className="h-12 w-12 object-cover rounded-full border border-gray-300"
          />
          <div className="flex flex-col gap-1">
            <span className="font-bold text-lg">{authorDetails?.username}</span>
            <span className="text-sm text-gray-700">{format(post?.createdAt)}</span>
          </div>
        </Link>
        {user._id === post.userId && (
          <div className="flex items-center gap-2">
            <AiOutlineDelete
              className="text-gray-600 cursor-pointer hover:text-gray-800"
              onClick={() => setShowDeleteModal(prev => !prev)}
            />
            {showDeleteModal && (
              <span
                className="absolute right-4 top-12 w-32 h-12 bg-gray-200 text-gray-800 flex justify-center items-center rounded-md cursor-pointer transition-colors duration-150 hover:bg-gray-300"
                onClick={() => handleDeletePost(post._id)}
              >
                Delete post
              </span>
            )}
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </div>
        )}
      </div>
      {isEditing ? (
        <div className="p-6">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md resize-none"
            rows="4"
          />
          <div className="flex gap-2 mt-4">
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              onClick={handleSaveEdit}
            // onClick={() => handleSaveEdit()}
            >
              Save
            </button>
            <button
              className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="p-4 text-gray-600 text-lg leading-relaxed">{post?.desc}</p>
          {/* {post.imageUrl && (
            <div className="w-full h-64 bg-gray-200">
              <img
                src={post.imageUrl ? `http://localhost:5001/images/${post.imageUrl}` : italy}
                alt="Post"
                className="w-full h-full object-cover"
              />
            </div>
          )} */}
          {post.mediaType === "image" && post.imageUrl && (
            <div className="w-full h-64 bg-gray-200">
              <img
                src={`http://localhost:5001/images/${post.imageUrl}`}
                alt="Post"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {post.mediaType === "video" && post.videoUrl && (
            <div className="w-full h-64 bg-gray-200">
              <video controls className="w-full h-full object-cover">
                <source src={`http://localhost:5001/videos/${post.videoUrl}`} type="video/mp4" />
              </video>
            </div>
          )}

          <div className="py-4 px-6 flex justify-between items-center border-t border-gray-300">
            <span
              className="flex items-center gap-2 text-gray-600 cursor-pointer"
              onClick={isLiked ? handleDislike : handleLike}
            >
              {isLiked ? (
                <>
                  Liked <AiFillLike />
                </>
              ) : (
                <>
                  Like <AiOutlineLike />
                </>
              )}
            </span>
            <span
              className="flex items-center gap-2 text-gray-600 cursor-pointer"
              onClick={() => setShowComments(prev => !prev)}
            >
              Comment <AiOutlineComment />
            </span>
          </div>
          {showComments && (
            <div className="flex flex-col gap-6 py-4 px-6">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <Comment comment={comment} key={comment._id} />
                ))
              ) : (
                <h3 className="py-5 text-gray-500">No comments yet.</h3>
              )}
              <form
                className="flex items-center gap-2 p-4 border-t border-gray-300"
                onSubmit={handleComment}
              >
                <textarea
                  value={commentText}
                  placeholder='Type your comment...'
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-md resize-none"
                  rows="2"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Post
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Post;
