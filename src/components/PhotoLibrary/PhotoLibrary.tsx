import React, { ChangeEvent, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

// Components
import ImageGrid from './ImageGrid';
import LibraryHeader from '../LibraryHeader';
import LibraryFolders from './LibraryFolders';
import ImageDetails from './ImageDetails';

// Services
import { Iimage } from '../../services/imageServices';
import { Ifolder } from '../../services/folderServices';

import '../../styles/PhotoLibrary.scss';

type libraryProps = {
    userFullName : string;
    fileInputChange : (e : ChangeEvent<HTMLInputElement>) => Promise<void>;
    folderClick:  (e: React.MouseEvent<HTMLLIElement>) => void;
    headerClick: () => void;
    images: Iimage[];
    folders: Ifolder[];
    modalVisibility: boolean;
    profileClick: () => void;
    profileSettingsClick: () => void;
    profileLogOutClick: () => void;
    pageTravelClick: () => void;
    profilePicture: string;
}

const PhotoLibrary = ({
    userFullName, 
    fileInputChange, 
    folderClick, 
    headerClick, 
    images, 
    folders, 
    modalVisibility, 
    profileClick, 
    profileLogOutClick, 
    profileSettingsClick, 
    pageTravelClick, 
    profilePicture
} : libraryProps): JSX.Element => {

    const imageClick = (e : React.MouseEvent<HTMLImageElement>) => {

        //alert('We are planning to implement a detail view for the image, for now, we will just copy the image to your clipboard!'); 

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const image = e.target.src;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const img_alt = e.target.alt;
        console.log(img_alt);
        setImgAlt(img_alt);
        setImgSelected(image);
        navigator.clipboard.writeText(image);
    };
    
    //onClick for photo-area
    const areaClick = (e : React.MouseEvent<HTMLDivElement>) => {
        if(outOfBoundsClick){
            //
        }
        // if(imgSelected == ''){
        //     return;
        // }
        // // e.stopPropagation();
        // if(e.target != selectedImageRef.current){
        //     console.log(e.target, selectedImageRef.current);
            
        //     setImgSelected('');
        // }
    };

    /* Refs */
    const selectedImageRef = useRef<HTMLDivElement>(null);

    /* State */
    const [imgSelected, setImgSelected] = useState('');
    const [outOfBoundsClick, setOutOfBoundsClick] = useState(false);
    const [imgAlt, setImgAlt] = useState('');

    /* Effects */

    /* Component */
    return (
        <div className="PhotoLibrary">
            <LibraryHeader
                userFullName={userFullName} 
                fileInputChange={fileInputChange} 
                pageTravelClick={pageTravelClick}
                profileClick={profileClick}
                modalVisibility={modalVisibility}
                profileSettingsClick={profileSettingsClick}
                logOutClick={profileLogOutClick}
                profilePicture={profilePicture}
            />
            <h1 onClick={headerClick}>Your Library</h1>
            <LibraryFolders
                folders={folders}
                onClick={folderClick}
            />
            <div className="photo-area" onClick={areaClick}>       
                {imgSelected != '' && <ImageDetails src={imgSelected} alt={imgAlt} outOfBounds={outOfBoundsClick} />}  
                <ImageGrid images={images} imageOnClick={imageClick} />
            </div>
        </div>
    );
};

export default PhotoLibrary;