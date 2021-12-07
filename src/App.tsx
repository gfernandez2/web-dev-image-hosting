import React, { ChangeEvent, useEffect, useState } from 'react';
import { 
    BrowserRouter as Router, 
    Switch, 
    Route, 
    Redirect,
    useLocation
} from 'react-router-dom';

// Components
import HomePage from './components/HomePage/HomePage';
import PhotoLibrary from './components/PhotoLibrary/PhotoLibrary';
import LoginModal from './components/LoginModal/LoginModal';

// Services
import { getImagesByUser, Iimage, postImageByUser } from './services/imageServices';
import { Ifolder, getFoldersByUser, getImagesFromFolder } from './services/folderServices';
import { getCurrUser, getFullName, getUserProfilePicture, userIsLoggedIn } from './services/userServices';
import ProfileSettings from './components/UserProfile/ProfileSettings';
import { AnimatePresence } from 'framer-motion';

const App = (): JSX.Element => {
    
    /* State */
    const [ currUser, setCurrUser ] = useState('');
    const [ userFullName, setUserFullName ] = useState('Log In');
    const [ images, setImages ] = useState<Iimage[]>([]);
    const [ folders, setFolders ] = useState<Ifolder[]>([]);
    const [ userProfilePicture, setUserProfilePicture ] = useState('');

    /* Effects */

    // currUser
    useEffect(() => {
        // On initial load, tries to get the current user if it's defined
        (async () => {
            try {
                const user = await getCurrUser();
                if (user)
                    setCurrUser(user);
            } catch (error) {
                console.error('Login Error: ', error);
            }
        })();
    });

    // userFullName
    useEffect(() => {
        (async () => {
            if (!userIsLoggedIn() || currUser == '') {
                // Sets a generic "Log In" message instead of a name
                setUserFullName('Log In');
                return;
            }

            const user = await getFullName(currUser);
            setUserFullName(`${user.first_name} ${user.last_name}`);
        })();
    }, [currUser]);

    // images
    useEffect(() => {
        (async () => {
            if (!userIsLoggedIn() || currUser == '')
                return;

            const imgList = await getImagesByUser(currUser);
            setImages(imgList);
        })();
    }, [currUser]);

    // folders
    useEffect(() => {
        (async () => {
            if (!userIsLoggedIn() || currUser == '')
                return;

            const folders = await getFoldersByUser(currUser);
            setFolders(folders);
        })();
    }, [currUser, images]);

    // userProfilePicture
    useEffect(() => {
        (async () => {
            if (!userIsLoggedIn || currUser == '')
                return;

            const pfp = await getUserProfilePicture(currUser);
            setUserProfilePicture(pfp);
        })();
    });

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


    const headerClick = async () => {

        if (!userIsLoggedIn() || currUser != '') {
            return;
        }

        const imgs = await getImagesByUser(currUser);
        setImages(imgs);
    };

    return (
        <div className="App">
            <Router>
                <AnimatePresence exitBeforeEnter>
                    <Switch>
                        {
                            // Protected Route for /library
                            // User cannot go to their library if they are not 
                            // logged in
                            userIsLoggedIn() && (async () => setCurrUser(await getCurrUser()))() &&
                            <Route key="libaryroute" path="/library">
                                <PhotoLibrary
                                    userFullName={userFullName} 
                                    fileInputChange={fileInputChange}
                                    folderClick={folderClick}
                                    headerClick={headerClick}
                                    images={images}
                                    folders={folders}
                                    setCurrUser={setCurrUser}
                                />
                            </Route>
                        }
                        {
                            userIsLoggedIn() && (async () => setCurrUser(await getCurrUser()))() &&
                            <Route key="settingsroute" path="/settings">
                                <ProfileSettings
                                />
                            </Route>
                        }
                        <Route key="homeroute" exact path="/">
                            <HomePage
                                userFullName={userFullName} 
                                fileInputChange={fileInputChange}
                                setCurrUser={setCurrUser}
                                userProfilePicture={userProfilePicture}
                                setUserProfilePicture={setUserProfilePicture}
                            />
                        </Route>
                        {
                            // Protected route for /login
                            !userIsLoggedIn() && currUser == '' &&
                            <Route path="/login">
                                <LoginModal 
                                    initalLoginState={true} 
                                    setCurrUser={setCurrUser}
                                />
                            </Route>

                        }
                        {
                            // Protected Route for /register
                            !userIsLoggedIn() && currUser == '' &&
                            <Route path="/register">
                                <LoginModal 
                                    initalLoginState={false} 
                                    setCurrUser={setCurrUser}
                                />
                            </Route>
                        }

                        <Redirect to="/" />
                    </Switch>
                </AnimatePresence>
            </Router>    
        </div>
    );
};

export default App;