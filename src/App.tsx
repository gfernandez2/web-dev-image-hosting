import React, { ChangeEvent, useEffect, useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// Components
import HomePage from './components/HomePage/HomePage';
import PhotoLibrary from './components/PhotoLibrary/PhotoLibrary';

// Services
import { getImagesByUser, Iimage, postImageByUser } from './services/imageServices';
import { Ifolder, getFoldersByUser, getImagesFromFolder } from './services/folderServices';
import { getFullName } from './services/userServices';


// Just hardcoded the default user for now. later when we implement
// authentication, the default user will be a guest
const DEFAULT_CURRENT_USER = 'gfernan2';

const App = (): JSX.Element => {
    
    /* State */
    const [ currUser, setCurrUser ] = useState(DEFAULT_CURRENT_USER);
    const [ userFullName, setUserFullName ] = useState('');
    const [ images, setImages ] = useState<Iimage[]>([]);
    const [ folders, setFolders ] = useState<Ifolder[]>([]);

    // Update the user's full name when the currUser changes
    useEffect(() => {
        (async () => {
            const user = await getFullName(currUser);
            setUserFullName(`${user.first_name} ${user.last_name}`);
        })();
    }, [currUser]);

    // Update the images on the page when the currUser changes
    useEffect(() => {
        (async () => {
            const imgList = await getImagesByUser(currUser);
            setImages(imgList);
        })();
    }, [currUser]);

    useEffect(() => {
        (async () => {
            const folders = await getFoldersByUser(currUser);
            setFolders(folders);
        })();
    }, [currUser, images]);

    /* Event Listeners */

    const folderClick = (e: React.MouseEvent<HTMLLIElement>) => {
        (async () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const folderId = e.target.id;
            const newImages = await getImagesFromFolder(currUser, folderId);
            setImages(newImages);
        })();
    };

    // When the user chooses to upload a file
    const fileInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        const newImages = [];

        if (!files) return;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
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
        setImages([...images, ...newImages] );
    };

    // Changes the current user when you click on the profile
    const profileClick = () => {
        alert('For feature 5 we will implement full user authentication. But for now, this button will just switch users between Gerry and Simon');

        if (currUser === 'srodrig9')
            setCurrUser('gfernan2');
        else
            setCurrUser('srodrig9');
    };

    const headerClick = async () => {
        const imgs = await getImagesByUser(currUser);
        setImages(imgs);
    };

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/library">
                        <PhotoLibrary
                            userFullName={userFullName} 
                            fileInputChange={fileInputChange}
                            profileClick={profileClick}
                            folderClick={folderClick}
                            headerClick={headerClick}
                            images={images}
                            folders={folders}
                        />
                    </Route>

                    <Route path="/">
                        <HomePage
                            userFullName={userFullName} 
                            fileInputChange={fileInputChange}
                            profileClick={profileClick}
                        />
                    </Route>
                </Switch>
            </Router>    
        </div>
    );
};

export default App;