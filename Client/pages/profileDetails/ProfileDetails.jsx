import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Profile from '../../components/profile/Profile';
import Sidebar from '../../components/sidebar/Sidebar';

const ProfileDetails = () => {
  return (
    <div className="w-full h-full pb-20">
      <div className="w-full h-full">
        <Navbar />
        <main className="mt-12 grid grid-cols-[1.25fr_4fr] gap-[3rem]">
          <Sidebar />
          <Profile />
        </main>
      </div>
    </div>
  );
};

export default ProfileDetails;
