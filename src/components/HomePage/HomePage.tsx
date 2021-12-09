import React, { ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ChevronDown } from 'react-feather';

// Components
import Profile from '../UserProfile/Profile';
import UploadArea from './UploadArea';
import PageTravel from '../PageTravel';
import ProfileModal from '../UserProfile/ProfileModal';

// Services
import { userIsLoggedIn, logoutUser } from '../../services/userServices';

import '../../styles/HomePage.scss';

type homeProps = {
    userFullName : string;
    fileInputChange: (e : ChangeEvent<HTMLInputElement>) => void;
    setCurrUser: any;
    userProfilePicture: string;
    setUserProfilePicture: any;
}

const HomePage = ({ userFullName, fileInputChange, setCurrUser, userProfilePicture, setUserProfilePicture }: homeProps): JSX.Element => {
    
    const history = useHistory();

    /* State */
    const [modalVisibility, setModalVisibility] = useState(false);

    // const homePageClickHandler = (e: MouseEvent) => {
    //     if (modalVisibility) {
    //         //
    //     }
    // };

    // Changes the current user when you click on the profile
    const profileClick = () => {
        if (userIsLoggedIn()) {
            setModalVisibility(true);
        } else {
            // Routes to login
            history.push('/login');
        }
    };

    const profileSettingsClick = () => {
        history.push('/settings');
    };

    const profileLogOutClick = async () => {
        await logoutUser();
        setCurrUser('');
        setUserProfilePicture('');

        setModalVisibility(false);

        // Routes back to the home page
        history.push('/');
    };

    /**
     * Routes to image library page
     */
    const pageTravelClick = () => {
        history.push('/library');
    };

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
                userIsLoggedIn() &&
                <PageTravel id="travel-down" onClick={pageTravelClick}>
                    <ChevronDown />
                </PageTravel>
            }
        </div>
    );
};

export default HomePage;