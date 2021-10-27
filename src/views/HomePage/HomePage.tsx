import React from 'react';
import {useHistory} from 'react-router-dom';

// Components
import Profile from '../../components/Profile';
import UploadArea from '../../components/UploadArea';
import PageTravel from '../../components/PageTravel';

// Services
import { Iimage } from '../../services/imageServices';

import { ChevronDown } from 'react-feather';

import './HomePage.scss';

type homeProps = {
    userFullName : string;
    fileInputChange : (e : any) => void;
 //   pageTravelClick : () => void;
    profileClick : () => void;
    images : Iimage[];
}

const HomePage = ({userFullName, fileInputChange, profileClick, images} : homeProps) => {
    
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