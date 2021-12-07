import React, { ChangeEvent, MouseEventHandler } from 'react';
import { ChevronUp } from 'react-feather';

import '../styles/LibraryHeader.scss';

import UploadButton from '../components/UploadButton';
import PageTravel from '../components/PageTravel';
import Profile from '../components/Profile';
import ProfileModal from './UserProfile/ProfileModal';

type headerProps = {
    userFullName : string;
    fileInputChange : (e : ChangeEvent<HTMLInputElement>) => Promise<void>;
    pageTravelClick : MouseEventHandler
    profileClick : MouseEventHandler<HTMLDivElement>;
    modalVisibility: boolean;
    profileSettingsClick: any;
    logOutClick: any;
    profilePicture: string;
}

const LibraryHeader = ({ userFullName, fileInputChange, pageTravelClick, profileClick, modalVisibility, profileSettingsClick, logOutClick, profilePicture,  } : headerProps): JSX.Element => {
    
    return (
        <header className="LibraryHeader">
            <UploadButton
                onChange={fileInputChange}
            >
                Upload
            </UploadButton>

            <PageTravel id="travel-up" onClick={pageTravelClick}>
                <ChevronUp />
            </PageTravel>

            <ProfileModal
                userFullName={userFullName}
                profileSettingsClick={profileSettingsClick}
                logOutClick={logOutClick}
                profilePicture={profilePicture}
                modalVisibility={modalVisibility}
            />

            <Profile userFullName={userFullName} onClick={profileClick} profilePicture={profilePicture} />
        </header>
    );

};

export default LibraryHeader;