import React, { useState, useEffect, forwardRef } from 'react';

import '../../styles/ProfileModal.scss';

import { getFullName, getUserProfilePicture } from '../../services/userServices';

type modalUserEntryProps = {
    name: string;
    profilePicture: string; //url
}

type modalProps = {
    isHidden: boolean
    user: string;
    profileSettingsClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    logOutClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ModalUserEntry = ({ name, profilePicture }: modalUserEntryProps): JSX.Element => {

    return (
        <div 
            className="ModalUserEntry"
        > 
            <img 
                src={profilePicture} 
                alt={`Profile picture of ${name}`}>
            </img>
            <p>{name}</p>
        </div>
    );
}; 

const ProfileModal = ({ isHidden, user, profileSettingsClick, logOutClick }: modalProps) : JSX.Element => { 

    const [name, setName] = useState('');
    const [pfp, setPfp] = useState('');

    useEffect(() => {
        (async () => {
            const {first_name, last_name} = await getFullName(user);
            setName(`${first_name} ${last_name}`);
        })();
    }, []);
    
    useEffect(() => {
        (async () => {
            setPfp(await getUserProfilePicture(user));
        })();
    }, []);

    return (
        <div className={`ProfileModal ${isHidden ? 'hidden' : ''}`}>
            <ModalUserEntry
                name={name}
                profilePicture={pfp}
            />

            <div className="clickable-entry" onClick={profileSettingsClick}>Profile Settings</div>
            <div className="clickable-entry" onClick={logOutClick}>Log Out</div>
        </div>
    );
};

export default ProfileModal;