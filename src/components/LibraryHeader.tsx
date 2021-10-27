import React from 'react';

import '../styles/LibraryHeader.scss';

import UploadButton from '../components/UploadButton';
import PageTravel from '../components/PageTravel';
import Profile from '../components/Profile';
import { ChevronUp } from 'react-feather';

type headerProps = {
    userFullName : string;
    fileInputChange : (e : any) => void;
    pageTravelClick : (e : any) => void;
    profileClick : (e : any) => void;
}

const LibraryHeader = ({ userFullName, fileInputChange, pageTravelClick, profileClick } : headerProps) => {
    
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

            <Profile userFullName={userFullName} onClick={profileClick} />
        </header>
    );

};

export default LibraryHeader;