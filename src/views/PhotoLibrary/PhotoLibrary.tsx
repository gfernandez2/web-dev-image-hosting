import React, { FC, useEffect, useState } from 'react';

// Components
import ImageGrid from './ImageGrid.js';
import LibraryHeader from './LibraryHeader.js';
import SelectedImageInfo from './SelectedImageInfo.js';

// Services
//import { getImagesByUser, postImageByUser } from '../services/imageServices.js';
//import { getFullName } from '../services/userServices.js';

// Just hardcoded the default user for now. later when we implement
// authentication, the default user will be a guest
const DEFAULT_CURRENT_USER = 'gfernan2';

const PhotoLibrary = () => {

    /* State */
    const [ currUser, setCurrUser ] = useState(DEFAULT_CURRENT_USER);

    const [ userFullName, setUserFullName ] = useState('');

    // Update the user's full name when the currUser changes
    useEffect(() => {
        (async () => {
            const user = await getFullName(currUser);
            setUserFullName(`${user.first_name} ${user.last_name}`);
        })();
    }, [currUser]);

    const [ images, setImages ] = useState([]);

    // Update the images on the page when the currUser changes
    useEffect(() => {
        (async () => {
            const imgList = await getImagesByUser(currUser);
            setImages(imgList);
        })();
    }, [currUser]);

    /* Event Listeners */

    // When the user chooses to upload a file
    const fileInputChange = async (e) => {
        const files = e.target.files;
        
        const newImages = [];
        for (const file of files) {
            /**
             * NOTE: For now, we pass the file to the service but ignore the
             * file input. So it always returns "/services/img/3.jpg" for
             * feature 3/.
             */
            const newImage = await postImageByUser(currUser, file);
            newImages.push(newImage);
        }  
        // Update the images state
        setImages([...images, ...newImages] as any);
    };

    /**
     * This component will control the page travel between the photo library
     * and the app's home page. Since we haven't gotten to routing, i'll just
     * send an alert letting the user know it's not implmented yet.
     */
    const pageTravelClick = () => {
        // TODO for F4: Implement routing
        alert('Will implement for feature 4 :)');
    };

    // Changes the current user when you click on the profile
    const profileClick = () => {
        alert('For feature 4 we will implement full user authentication. But for now, this button will just switch users between Gerry and Simon');

        if (currUser === 'srodrig9')
            setCurrUser('gfernan2');
        else
            setCurrUser('srodrig9');
    };

    const imageClick = (e : React.MouseEvent<HTMLImageElement>) => {

        alert('We are planning to implement a detail view for the image, for now, we will just copy the image to your clipboard!'); 

        const image = e.target.src;
        navigator.clipboard.writeText(image);
    };

    /* Component */
    return (
        <div className="PhotoLibrary">
            <{LibraryHeader}
                userFullName={userFullName} 
                fileInputChange={fileInputChange} 
                pageTravelClick={pageTravelClick}
                profileClick={profileClick}
            />
            <{ImageGrid} images={images} imageOnClick={imageClick}/>
        </div>
    );
};

export default PhotoLibrary;