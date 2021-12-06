import React from 'react';

import ProfilePictureBig from './ProfilePictureBig';

// import '../../styles/UserProfile.scss';

// import {  } from '../../services/userServices';

const UserProfile = () : JSX.Element => {
   
    return (
        <>
            <ProfilePictureBig />
            <div className="profile-info">
                <h1>Name</h1>
                <h2>Email</h2>
                <button>Log Out</button>
            </div>
        </>
    );
};

export default UserProfile;