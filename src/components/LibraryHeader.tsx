import React, { ChangeEvent, MouseEventHandler } from 'react';

import '../styles/LibraryHeader.scss';

import UploadButton from '../components/UploadButton';
import PageTravel from '../components/PageTravel';
import Profile from '../components/Profile';
import { ChevronUp } from 'react-feather';

type headerProps = {
    userFullName : string;
    fileInputChange : (e : ChangeEvent<HTMLInputElement>) => Promise<void>;
    pageTravelClick : MouseEventHandler
    profileClick : MouseEventHandler<HTMLDivElement>;
}

const LibraryHeader = ({ userFullName, fileInputChange, pageTravelClick, profileClick } : headerProps): JSX.Element => {
    
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