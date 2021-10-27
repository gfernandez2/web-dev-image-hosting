import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Components
import ImageGrid from './ImageGrid';
import LibraryHeader from '../../components/LibraryHeader';

// Services
import { Iimage } from '../../services/imageServices';

import './PhotoLibrary.scss';

type libraryProps = {
    userFullName : string;
    fileInputChange : (e : any) => void;
//    pageTravelClick : () => void;
    profileClick : () => void;
    images : Iimage[];
}

const PhotoLibrary = ({userFullName, fileInputChange, profileClick, images} : libraryProps) => {
    const imageClick = (e : React.MouseEvent<HTMLImageElement>) => {

        alert('We are planning to implement a detail view for the image, for now, we will just copy the image to your clipboard!'); 

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const image = e.target.src;
        navigator.clipboard.writeText(image);
    };

    const history = useHistory();

    /**
     * Routes to image library page
     */
    const pageTravelClick = () => {
        history.push('/');
    };

    /* Component */
    return (
        <div className="PhotoLibrary">
            <LibraryHeader
                userFullName={userFullName} 
                fileInputChange={fileInputChange} 
                pageTravelClick={pageTravelClick}
                profileClick={profileClick}
            />
            <ImageGrid images={images} imageOnClick={imageClick}/>
        </div>
    );
};

export default PhotoLibrary;