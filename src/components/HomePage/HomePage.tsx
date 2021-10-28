import React, { ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';

// Components
import Profile from '../Profile';
import UploadArea from '../UploadArea';
import PageTravel from '../PageTravel';

// Services
import { ChevronDown } from 'react-feather';

import '../../styles/HomePage.scss';

type homeProps = {
    userFullName : string;
    fileInputChange : (e : ChangeEvent<HTMLInputElement>) => void;
    profileClick : () => void;
}

const HomePage = ({userFullName, fileInputChange, profileClick} : homeProps): JSX.Element => {
    
    const history = useHistory();

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
                Click or drag onto this box to upload your image
            </UploadArea>
            <PageTravel id="travel-down" onClick={pageTravelClick}>
                <ChevronDown />
            </PageTravel>
        </div>
    );
};

export default HomePage;