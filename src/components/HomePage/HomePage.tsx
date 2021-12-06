import React, { ChangeEvent, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ChevronDown } from 'react-feather';

// Components
import Profile from '../Profile';
import UploadArea from './UploadArea';
import PageTravel from '../PageTravel';
import ProfileModal from '../UserProfile/ProfileModal';

// Services
import { userIsLoggedIn } from '../../services/userServices';
import { logoutUser } from '../../services/userServices';

import '../../styles/HomePage.scss';

type homeProps = {
    userFullName : string;
    fileInputChange : (e : ChangeEvent<HTMLInputElement>) => void;
    setCurrUser: any
}

const HomePage = ({userFullName, fileInputChange, setCurrUser} : homeProps): JSX.Element => {
    
    const history = useHistory();
    const [modalVisibility, setModalVisibility] = useState(true);

    // Changes the current user when you click on the profile
    const profileClick = async () => {

        alert('i"ve been clicked');

        if (userIsLoggedIn()) {

            setModalVisibility(false);

            // alert('Logging out!');
            // await logoutUser();
            // setCurrUser('');

            // // Routes back to the home page
            // history.push('/');
        } else {
            // Routes to login
            history.push('/login');
        }
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
            
            <ProfileModal 
                isHidden={modalVisibility}
                user="srodrig9"
                profileSettingsClick={() => alert('hewwo')}
                logOutClick={() => alert('hewwo')}
            />

            <div className="top-bar">
                <Profile userFullName={userFullName} onClick={profileClick} />
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