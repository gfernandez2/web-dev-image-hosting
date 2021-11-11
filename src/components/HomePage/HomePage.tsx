import React, { ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';

// Components
import Profile from '../Profile';
import UploadArea from './UploadArea';
import PageTravel from '../PageTravel';

// Services
import { ChevronDown } from 'react-feather';
import { getCurrUser, userIsLoggedIn } from '../../services/userServices';

import '../../styles/HomePage.scss';
import { logoutUser } from '../../services/userServices';

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
            console.log('curr user', await getCurrUser());
            
            history.push('/');
        } else {
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
                userIsLoggedIn() &&
                <PageTravel id="travel-down" onClick={pageTravelClick}>
                    <ChevronDown />
                </PageTravel>
            }

            
        </div>
    );
};

export default HomePage;