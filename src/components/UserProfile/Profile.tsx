import React, { MouseEventHandler } from 'react';

import '../../styles/Profile.scss';

type profileProps = {
    userFullName : string;
    onClick : MouseEventHandler;
    profilePicture ?: string;
}

const Profile = ({ userFullName, onClick, profilePicture } : profileProps): JSX.Element => {
    return (
        <div className="Profile" onClick={onClick}>
            <p>{userFullName}</p>
            <div className="profile-picture">
                {
                    profilePicture && profilePicture !== '' 
                        ? <img src={profilePicture} alt={`Profile Picture of ${userFullName}`}></img>
                        : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                }
            </div>
        </div>
    );
};

export default Profile;