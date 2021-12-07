import React from 'react';

import '../../styles/ProfileModal.scss';

type modalUserEntryProps = {
    name: string;
    profilePicture: string; //url
}

type modalProps = {
    profilePicture: string;
    profileSettingsClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    logOutClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    userFullName: string;
}

const ModalUserEntry = ({ name, profilePicture }: modalUserEntryProps): JSX.Element => {

    return (
        <div className="ModalUserEntry"> 
            <img 
                src={profilePicture} 
                alt={`Profile picture of ${name}`}>
            </img>
            <p>{name}</p>
        </div>
    );
}; 

const ProfileModal = ({ profilePicture, profileSettingsClick, logOutClick, userFullName }: modalProps) : JSX.Element => {

    return (
        <div className="ProfileModal">
            <ModalUserEntry
                name={userFullName}
                profilePicture={profilePicture}
            />

            <div className="clickable-entry" onClick={profileSettingsClick}>Profile Settings</div>
            <div className="clickable-entry" onClick={logOutClick}>Log Out</div>
        </div>
    );
};

export default ProfileModal;