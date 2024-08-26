
// import React, { useState } from 'react';
// import { AiFillCamera, AiFillSmile, AiOutlineClose } from 'react-icons/ai';
// import { IoMdPhotos } from 'react-icons/io';
// import { useSelector } from 'react-redux';
// import person from '../../assets/na.jpeg';
// import { request } from '../../util/request';

// const Share = ({ setPosts }) => {
//   const [desc, setDesc] = useState("");
//   const [photo, setPhoto] = useState("");
//   const { token } = useSelector((state) => state.auth);

//   const handleCreatePost = async () => {
//     try {
//       let filename = null;

//       if (photo) {
//         const formData = new FormData();
//         filename = crypto.randomUUID() + photo.name;
//         formData.append("imageUrl", filename);
//         formData.append("photo", photo);
//         await request('/upload', 'POST', {}, formData, true);
//       }

//       const headers = {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       };

//       const body = {
//         imageUrl: filename,
//         desc
//       };

//       await request('/post', 'POST', headers, body);
//       const updatedPosts = await request(`/post/timelinePosts`, 'GET', { 'Authorization': `Bearer ${token}` });
//       setPosts(updatedPosts); // Update posts in parent component
//       setDesc("");
//       setPhoto("");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="w-full flex flex-col items-center shadow-md p-4 bg-white">
//       <div className="w-full flex items-center gap-5 border-b border-gray-300 pb-4">
//         <img src={person} className="h-11 w-11 rounded-full object-cover" alt="User" />
//         <input
//           type="text"
//           placeholder='Share your opinion'
//           onChange={(e) => setDesc(e.target.value)}
//           className="flex-1 border border-gray-400 rounded-lg p-2 outline-none"
//         />
//         <button
//           onClick={handleCreatePost}
//           className="px-5 py-2 bg-blue-600 text-white rounded-lg"
//         >
//           POST
//         </button>
//       </div>
//       <div className="w-full flex justify-between items-center pt-4">
//         <label htmlFor='photo' className="flex items-center gap-2 text-gray-700 cursor-pointer">
//           <IoMdPhotos />
//           Photo
//         </label>
//       </div>
//       <input
//         type="file"
//         id="photo"
//         className="hidden"
//         onChange={(e) => setPhoto(e.target.files[0])}
//       />
//       {photo && (
//         <div className="relative w-full h-80">
//           <AiOutlineClose
//             className="absolute top-2 right-2 h-4 w-4 rounded-full bg-white z-10 cursor-pointer"
//             onClick={() => setPhoto("")}
//           />
//           <img
//             src={URL.createObjectURL(photo)}
//             className="w-full h-full object-cover"
//             alt="Preview"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Share;


// import React, { useState } from 'react';
// import { AiFillCamera, AiFillSmile, AiOutlineClose } from 'react-icons/ai';
// import { IoMdPhotos, IoMdVideocam } from 'react-icons/io';
// import { useSelector } from 'react-redux';
// import person from '../../assets/na.jpeg';
// import { request } from '../../util/request';

// const Share = ({ setPosts }) => {
//   const [desc, setDesc] = useState("");
//   const [media, setMedia] = useState(null);
//   const [mediaType, setMediaType] = useState("");
//   const { token } = useSelector((state) => state.auth);

//   const handleCreatePost = async () => {
//     try {
//       let filename = null;

//       if (media) {
//         const formData = new FormData();
//         filename = crypto.randomUUID() + media.name;
//         formData.append("mediaUrl", filename);
//         formData.append("media", media);  // Ensure this field name matches Multer's field name

//         await request('/upload', 'POST', {}, formData, true);
//       }

//       const headers = {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       };

//       const body = {
//         mediaUrl: filename,
//         mediaType,
//         desc
//       };

//       await request('/post', 'POST', headers, body);
//       const updatedPosts = await request(`/post/timelinePosts`, 'GET', { 'Authorization': `Bearer ${token}` });
//       setPosts(updatedPosts); // Update posts in parent component
//       setDesc("");
//       setMedia(null);
//       setMediaType("");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleMediaChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const type = file.type.split('/')[0];
//       if (type === 'image' || type === 'video') {
//         setMedia(file);
//         setMediaType(type);
//       } else {
//         alert("Only images and videos are allowed!");
//       }
//     }
//   };

//   return (
//     <div className="w-full flex flex-col items-center shadow-md p-4 bg-white">
//       <div className="w-full flex items-center gap-5 border-b border-gray-300 pb-4">
//         <img src={person} className="h-11 w-11 rounded-full object-cover" alt="User" />
//         <input
//           type="text"
//           placeholder='Share your opinion'
//           onChange={(e) => setDesc(e.target.value)}
//           value={desc}
//           className="flex-1 border border-gray-400 rounded-lg p-2 outline-none"
//         />
//         <button
//           onClick={handleCreatePost}
//           className="px-5 py-2 bg-blue-600 text-white rounded-lg"
//         >
//           POST
//         </button>
//       </div>
//       <div className="w-full flex justify-between items-center pt-4">
//         <label htmlFor='media' className="flex items-center gap-2 text-gray-700 cursor-pointer">
//           <IoMdPhotos />
//           Photo/Video
//         </label>
//       </div>
//       <input
//         type="file"
//         id="media"
//         className="hidden"
//         onChange={handleMediaChange}
//       />
//       {media && (
//         <div className="relative w-full h-80">
//           <AiOutlineClose
//             className="absolute top-2 right-2 h-4 w-4 rounded-full bg-white z-10 cursor-pointer"
//             onClick={() => setMedia(null)}
//           />
//           {mediaType === "image" ? (
//             <img
//               src={URL.createObjectURL(media)}
//               className="w-full h-full object-cover"
//               alt="Preview"
//             />
//           ) : (
//             <video controls className="w-full h-full object-cover">
//               <source src={URL.createObjectURL(media)} />
//             </video>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Share;


// import React, { useState } from 'react';
// import { AiOutlineClose } from 'react-icons/ai';
// import { IoMdPhotos } from 'react-icons/io';
// import { useSelector } from 'react-redux';
// import person from '../../assets/na.jpeg';
// import { request } from '../../util/request';

// const Share = ({ setPosts }) => {
//   const [desc, setDesc] = useState("");
//   const [media, setMedia] = useState(null);
//   const [mediaType, setMediaType] = useState("");
//   const { token } = useSelector((state) => state.auth);

//   const handleCreatePost = async () => {
//     try {
//       let filename = null;

//       if (media) {
//         const formData = new FormData();
//         filename = crypto.randomUUID() + media.name;
//         formData.append("mediaUrl", filename);
//         formData.append("media", media); // This should match Multer's field name in your backend

//         await request('/upload', 'POST', {}, formData, true);
//       }

//       const headers = {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       };

//       const body = {
//         mediaUrl: filename,
//         mediaType,
//         desc,
//       };

//       await request('/post', 'POST', headers, body);
//       const updatedPosts = await request(`/post/timelinePosts`, 'GET', { 'Authorization': `Bearer ${token}` });
//       setPosts(updatedPosts);
//       setDesc("");
//       setMedia(null);
//       setMediaType("");
//     } catch (error) {
//       console.error(error);
//       alert('Failed to create post. Please try again.');
//     }
//   };

//   const handleMediaChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const type = file.type.split('/')[0];
//       if (type === 'image' || type === 'video') {
//         setMedia(file);
//         setMediaType(type);
//       } else {
//         alert("Only images and videos are allowed!");
//       }
//     }
//   };

//   return (
//     <div className="w-full flex flex-col items-center shadow-md p-4 bg-white">
//       <div className="w-full flex items-center gap-5 border-b border-gray-300 pb-4">
//         <img src={person} className="h-11 w-11 rounded-full object-cover" alt="User" />
//         <input
//           type="text"
//           placeholder='Share your opinion'
//           onChange={(e) => setDesc(e.target.value)}
//           value={desc}
//           className="flex-1 border border-gray-400 rounded-lg p-2 outline-none"
//         />
//         <button
//           onClick={handleCreatePost}
//           className="px-5 py-2 bg-blue-600 text-white rounded-lg"
//         >
//           POST
//         </button>
//       </div>
//       <div className="w-full flex justify-between items-center pt-4">
//         <label htmlFor='media' className="flex items-center gap-2 text-gray-700 cursor-pointer">
//           <IoMdPhotos />
//           Photo/Video
//         </label>
//       </div>
//       <input
//         type="file"
//         id="media"
//         className="hidden"
//         onChange={handleMediaChange}
//       />
//       {media && (
//         <div className="relative w-full h-80 mt-4">
//           <AiOutlineClose
//             className="absolute top-2 right-2 h-4 w-4 rounded-full bg-white z-10 cursor-pointer"
//             onClick={() => {
//               setMedia(null);
//               setMediaType("");
//             }}
//           />
//           {mediaType === "image" ? (
//             <img
//               src={URL.createObjectURL(media)}
//               className="w-full h-full object-cover"
//               alt="Preview"
//             />
//           ) : (
//             <video controls className="w-full h-full object-cover">
//               <source src={URL.createObjectURL(media)} type={media.type} />
//             </video>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Share;


import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { IoMdPhotos } from 'react-icons/io';
import { useSelector } from 'react-redux';
import person from '../../assets/na.jpeg';
import LiveVideo from '../liveVideo/LiveVideo'; // Import the LiveVideo component
import { request } from '../../util/request';

const Share = ({ setPosts }) => {
  const [desc, setDesc] = useState("");
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState("");
  const [isLiveVideo, setIsLiveVideo] = useState(false); // New state for live video
  const { token, user } = useSelector((state) => state.auth);

  const handleCreatePost = async () => {
    try {
      let filename = null;

      if (media) {
        const formData = new FormData();
        filename = crypto.randomUUID() + media.name;
        formData.append("mediaUrl", filename);
        formData.append("media", media); // This should match Multer's field name in your backend

        await request('/upload', 'POST', {}, formData, true);
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const body = {
        mediaUrl: filename,
        mediaType,
        desc,
      };

      await request('/post', 'POST', headers, body);
      const updatedPosts = await request(`/post/timelinePosts`, 'GET', { 'Authorization': `Bearer ${token}` });
      setPosts(updatedPosts);
      setDesc("");
      setMedia(null);
      setMediaType("");
      setIsLiveVideo(false);
    } catch (error) {
      console.error(error);
      alert('Failed to create post. Please try again.');
    }
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const type = file.type.split('/')[0];
      if (type === 'image' || type === 'video') {
        setMedia(file);
        setMediaType(type);
        setIsLiveVideo(false);
      } else {
        alert("Only images and videos are allowed!");
      }
    }
  };

  const handleLiveVideoStop = (videoBlob) => {
    setMedia(videoBlob);
    setMediaType('video');
    setIsLiveVideo(true);
  };

  return (
    <div className="w-full flex flex-col items-center shadow-md p-4 bg-white">
      <div className="w-full flex items-center gap-5 border-b border-gray-300 pb-4">
      <img
          src={user.profilePic ? `http://localhost:5001/images/${user.profilePic}` : person}
          alt="Profile"
          className="w-12 h-12 object-cover rounded-full"
        />
        <input
          type="text"
          placeholder='Share your opinion'
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          className="flex-1 border border-gray-400 rounded-lg p-2 outline-none"
        />
        <button
          onClick={handleCreatePost}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg"
        >
          POST
        </button>
      </div>
      <div className="w-full flex justify-between items-center pt-4">
        <label htmlFor='media' className="flex items-center gap-2 text-gray-700 cursor-pointer">
          <IoMdPhotos />
          Photo/Video
        </label>
        <button
          onClick={() => setIsLiveVideo(true)}
          className="text-gray-700 cursor-pointer"
        >
          Live Video
        </button>
      </div>
      <input
        type="file"
        id="media"
        className="hidden"
        onChange={handleMediaChange}
      />
      {isLiveVideo && !media && (
        <LiveVideo onStop={handleLiveVideoStop} />
      )}
      {media && (
        <div className="relative w-full h-80 mt-4">
          <AiOutlineClose
            className="absolute top-2 right-2 h-4 w-4 rounded-full bg-white z-10 cursor-pointer"
            onClick={() => {
              setMedia(null);
              setMediaType("");
              setIsLiveVideo(false);
            }}
          />
          {mediaType === "image" ? (
            <img
              src={URL.createObjectURL(media)}
              className="w-full h-full object-cover"
              alt="Preview"
            />
          ) : (
            <video controls className="w-full h-full object-cover">
              <source src={URL.createObjectURL(media)} type={media.type} />
            </video>
          )}
        </div>
      )}
    </div>
  );
};

export default Share;
