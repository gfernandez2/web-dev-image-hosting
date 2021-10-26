import React from 'react';

import './LibraryHeader.scss';

import UploadButton from '../components/UploadButton';
import PageTravel from '../components/PageTravel';
import Profile from '../components/Profile';

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

            <PageTravel onClick={pageTravelClick}/>
            <Profile userFullName={userFullName} onClick={profileClick} />
        </header>
    );

};

export default LibraryHeader;