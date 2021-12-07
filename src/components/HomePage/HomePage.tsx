import React, { ChangeEvent, useRef, useState, MouseEvent, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import { ChevronDown } from 'react-feather';

// Components
import Profile from '../Profile';
import UploadArea from './UploadArea';
import PageTravel from '../PageTravel';
import ProfileModal from '../UserProfile/ProfileModal';

// Services
import { userIsLoggedIn, getUserProfilePicture, logoutUser, getCurrUser } from '../../services/userServices';

import '../../styles/HomePage.scss';

type homeProps = {
    userFullName : string;
    fileInputChange: (e : ChangeEvent<HTMLInputElement>) => void;
    currUser: string
    setCurrUser: any
}

const HomePage = ({userFullName, fileInputChange, currUser, setCurrUser}: homeProps): JSX.Element => {
    
    const history = useHistory();
    const [modalVisibility, setModalVisibility] = useState(false);
    const [pfp, setPfp] = useState('');
    const [user, setUser] = useState('');

    useEffect(() => {
        (async () => {
            setPfp(await getUserProfilePicture(await getCurrUser()));
        })();
    }, []);

    useEffect(() => {
        (async () => {
            setUser(await getCurrUser());
        });
    }, []);

    const homePageClickHandler = (e: MouseEvent) => {
        if (modalVisibility) {
            //
        }
    };

    // Changes the current user when you click on the profile
    const profileClick = () => {

        if (userIsLoggedIn()) {
            setModalVisibility(true);
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

    const profileSettingsClick = () => {
        history.push('/settings');
    };

    const profileLogOutClick = async () => {
        await logoutUser();
        setCurrUser('');
        setPfp('');

        setModalVisibility(false);

        // Routes back to the home page
        history.push('/');
    };

    /* Component */
    return (
        <div className="HomePage">
            
            {modalVisibility && <ProfileModal
                user={currUser}
                profileSettingsClick={profileSettingsClick}
                logOutClick={profileLogOutClick}
                profilePicture={pfp}
            />}

            <div className="top-bar">
                <Profile 
                    userFullName={userFullName} 
                    onClick={profileClick} 
                    profilePicture={pfp}
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