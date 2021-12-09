import React, { ChangeEvent } from 'react';
import { ChevronDown } from 'react-feather';

// Components
import Profile from '../UserProfile/Profile';
import UploadArea from './UploadArea';
import PageTravel from '../PageTravel';
import ProfileModal from '../UserProfile/ProfileModal';

import '../../styles/HomePage.scss';

type homeProps = {
    userFullName : string;
    fileInputChange: (e : ChangeEvent<HTMLInputElement>) => void;
    userProfilePicture: string;
    modalVisibility: boolean;
    profileClick: () => void;
    profileSettingsClick: () => void;
    profileLogOutClick: () => void;
    pageTravelClick: () => void;
    currUser: string;
}

const HomePage = ({ 
    userFullName, 
    fileInputChange, 
    userProfilePicture, 
    modalVisibility, 
    profileClick, 
    profileSettingsClick, 
    profileLogOutClick, 
    pageTravelClick, 
    currUser 
}: homeProps): JSX.Element => {
    
    // const homePageClickHandler = (e: MouseEvent) => {
    //     if (modalVisibility) {
    //         //
    //     }
    // };

    /* Component */
    return (
        <div className="HomePage">
            
            {modalVisibility && <ProfileModal
                userFullName={userFullName}
                profileSettingsClick={profileSettingsClick}
                logOutClick={profileLogOutClick}
                profilePicture={userProfilePicture}
            />}

            <div className="top-bar">
                <Profile 
                    userFullName={userFullName} 
                    onClick={profileClick} 
                    profilePicture={userProfilePicture}
                />
            </div>

            <UploadArea onChange={fileInputChange}>
                Click this box to upload an image
            </UploadArea>

            {
                /**
                 * The button to travel to the library will only show if the
                 * user is logged in
                 */
                currUser !== '' &&
                <PageTravel id="travel-down" onClick={pageTravelClick}>
                    <ChevronDown />
                </PageTravel>
            }
        </div>
    );
};

export default HomePage;