import React from 'react';
import './ProfileImage.css';

const ProfileImage = () => {
  return (
    <div className="profile-image-container">
      <img src="/Vishnu.png" alt="Profile" className="profile-image base-image" />
      <img src="/Vishnu1.png" alt="Profile" className="profile-image hover-image" />
    </div>
  );
};

export default ProfileImage;