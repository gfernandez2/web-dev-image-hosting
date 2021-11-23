import React, { ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { ChevronDown } from 'react-feather';

// Components
import Profile from '../Profile';
import UploadArea from './UploadArea';
import PageTravel from '../PageTravel';

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

    // Changes the current user when you click on the profile
    const profileClick = async () => {

        if (userIsLoggedIn()) {
            alert('Logging out!');
            await logoutUser();
            setCurrUser('');

            // Routes back to the home page
            history.push('/');
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