
// import { FaHome, FaUserFriends, FaSearch } from 'react-icons/fa'; // Import the icons you need
// import { BiVideo } from 'react-icons/bi';
// export const sidebarData = [
//     { text: 'Home', route: '/', icon: <FaHome /> },
//     { text: 'Friends', route: '/friends', icon: <FaUserFriends /> },
//     // { text: 'Search', route: '/search', icon: <FaSearch /> },
//     // { text: 'Live Video', icon: <BiVideo />, route: '/live-video' },
//     // { text: 'All Users', icon: <FaUserFriends />, route: '/allusers' },

//     // Add other items as needed
// ];


// import { FaHome, FaUserFriends, FaStore, FaUsers, FaTv, FaCalendarAlt, FaSearch } from 'react-icons/fa';
// import { BiVideo } from 'react-icons/bi';

// export const sidebarData = [
//     { text: 'Home', route: '/', icon: <FaHome /> },
//     { text: 'Friends', route: '/friends', icon: <FaUserFriends /> },
//     { text: 'Marketplace', route: '/marketplace', icon: <FaStore /> },
//     { text: 'Groups', route: '/groups', icon: <FaUsers /> },
//     { text: 'Watch', route: '/watch', icon: <FaTv /> },
//     { text: 'Events', route: '/events', icon: <FaCalendarAlt /> },
//     { text: 'Search', route: '/search', icon: <FaSearch /> },
//     { text: 'Live Video', icon: <BiVideo />, route: '/live-video' },
//     { text: 'All Users', icon: <FaUserFriends />, route: '/allusers' },
// ];


import { FaHome, FaUserFriends, FaStore, FaUsers, FaTv, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import { BiVideo } from 'react-icons/bi';

export const sidebarData = [
    { text: 'Home', route: '/', icon: <FaHome /> },
    { text: 'Friends', route: '/friends', icon: <FaUserFriends /> },
    { text: 'Marketplace', route: 'https://www.flipkart.com', icon: <FaStore /> }, // Flipkart
    { text: 'Groups', route: '/groups', icon: <FaUsers /> },
    { text: 'Watch', route: 'https://www.youtube.com', icon: <FaTv /> }, // YouTube
    { text: 'Events', route: 'https://calendar.google.com', icon: <FaCalendarAlt /> }, // Google calendar 
    { text: 'Search', route: '/search', icon: <FaSearch /> },
    { text: 'Live Video', icon: <BiVideo />, route: '/live-video' },
    { text: 'All Users', icon: <FaUserFriends />, route: '/allusers' },
];
