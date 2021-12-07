import React, { useState, useEffect } from 'react';

import '../../styles/ProfileModal.scss';

import { 
    getFullName, 
    getUserProfilePicture 
} from '../../services/userServices';

type modalUserEntryProps = {
    name: string;
    profilePicture: string; //url
}

type modalProps = {
    user: string;
    profilePicture: string;
    profileSettingsClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    logOutClick: (e: React.MouseEvent<HTMLDivElement>) => void;
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

const ProfileModal = ({ user, profilePicture, profileSettingsClick, logOutClick }: modalProps) : JSX.Element => { 

    const [name, setName] = useState('');

    useEffect(() => {
        (async () => {
            const {first_name, last_name} = await getFullName(user);
            setName(`${first_name} ${last_name}`);
        })();
    }, []);

    return (
        <div className="ProfileModal">
            <ModalUserEntry
                name={name}
                profilePicture={profilePicture}
            />

            <div className="clickable-entry" onClick={profileSettingsClick}>Profile Settings</div>
            <div className="clickable-entry" onClick={logOutClick}>Log Out</div>
        </div>
    );
};

export default ProfileModal;