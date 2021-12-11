import React, { ChangeEvent, useState, MouseEvent } from 'react';

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
    setModalVisibility: any;
    profileClick: () => void;
    profileSettingsClick: () => void;
    profileLogOutClick: () => void;
    pageTravelClick: () => void;
    profilePicture: string;
    showAlert: (text: string) => void;
}

const PhotoLibrary = ({
    userFullName, 
    fileInputChange, 
    folderClick, 
    headerClick, 
    images, 
    folders, 
    modalVisibility, 
    setModalVisibility,
    profileClick, 
    profileLogOutClick, 
    profileSettingsClick, 
    pageTravelClick, 
    profilePicture,
    showAlert
} : libraryProps): JSX.Element => {

    const imageClick = (e : React.MouseEvent<HTMLImageElement>) => {

        //alert('We are planning to implement a detail view for the image, for now, we will just copy the image to your clipboard!'); 

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const image = e.target.src;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const img_alt = e.target.alt;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const fileName = e.target.key;
        
        console.log(fileName);
        setImgAlt(img_alt);
        setFileName(fileName);
        setImgSelected(image);
    };


    /* State */
    const [imgSelected, setImgSelected] = useState('');
    const [imgAlt, setImgAlt] = useState('');


    const [, setFileName] = useState('');

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
                setModalVisibility={setModalVisibility}
            />
            <h1 onClick={headerClick}>Your Library</h1>
            <LibraryFolders
                folders={folders}
                onClick={folderClick}
            />
            <div className="photo-area">
                {
                    imgSelected != '' && (
                        <ImageDetails 
                            src={imgSelected} 
                            alt={imgAlt}
                            images={images}
                            setIsFocused={(bool: boolean) => {
                                !bool && setImgSelected('');
                            }}
                            showAlert={showAlert}
                        />
                    )
                }  
                <ImageGrid images={images} imageOnClick={imageClick} />
            </div>
        </div>
    );
};

export default PhotoLibrary;