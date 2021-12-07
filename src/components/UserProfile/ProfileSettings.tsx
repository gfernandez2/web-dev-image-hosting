import React, { ChangeEvent, useRef } from 'react';

import '../../styles/ProfileSettings.scss';

type homeProps = {
    userFullName : string;
    username : string;
    userProfilePicture: string;
    createdAt : Date;
    profileFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}



const ProfileSettings = ({ userFullName, username, userProfilePicture, createdAt, profileFileChange}: homeProps): JSX.Element => {

    const inputRef = useRef<HTMLInputElement>(null);

    const profilePictureClick = () => {

        if (!inputRef)
            return;

        inputRef.current?.click();
    };

    return (
        <div className="ProfileSettings" >
            <div className="image-container">
                <input ref={inputRef} onChange={profileFileChange} type="file" accept="image/*"/>
                <img onClick={profilePictureClick} src={userProfilePicture} alt={`Profile picture of ${userFullName}`}></img>
            </div>
            <div className="profile-info-container">
                <h1>{userFullName}</h1>
                <h2>Username: {username}</h2>
                <h2>User since: {createdAt.toLocaleDateString()}</h2>
            </div>
        </div>
    );
};

export default ProfileSettings;
