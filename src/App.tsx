import React, { MouseEvent, ChangeEvent, useEffect, useState } from 'react';
import {
    Switch, 
    Route, 
    Redirect,
    useHistory,
} from 'react-router-dom';

// Components
import HomePage from './components/HomePage/HomePage';
import PhotoLibrary from './components/PhotoLibrary/PhotoLibrary';
import LoginModal from './components/LoginModal/LoginModal';
import ProfileSettings from './components/UserProfile/ProfileSettings';
import Alert from './components/Alert';

// Services
import { 
    getImagesByUser, 
    Iimage, 
    postImageByUser
} from './services/imageServices';

import { 
    Ifolder,
    getFoldersByUser,
    getImagesFromFolder
} from './services/folderServices';

import { 
    getCurrUser,
    getFullName,
    getUserProfilePicture,
    userIsLoggedIn,
    getUserCreated,
    postProfilePicturebyUser,
    logoutUser
} from './services/userServices';
import { AnimatePresence } from 'framer-motion';


const App = (): JSX.Element => {
    
    const history = useHistory();
    
    /* State */
    const [ currUser, setCurrUser ] = useState('');
    const [ userFullName, setUserFullName ] = useState('Log In');
    const [ images, setImages ] = useState<Iimage[]>([]);
    const [ folders, setFolders ] = useState<Ifolder[]>([]);
    const [ userProfilePicture, setUserProfilePicture ] = useState('');
    const [ createdAt, setCreatedAt] = useState(new Date());

    const [ modalVisibility, setModalVisibility ] = useState(false);
    const [ alertIsShown, setAlertIsShown ] = useState(false);
    const [ alertText, setAlertText ] = useState('');

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
                showAlert('Login Error!');
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
    }, [currUser]);

    // createdAt
    useEffect(() => {
        (async () => {
            if (!userIsLoggedIn || currUser == '')
                return;

            const created = await getUserCreated(currUser);
            setCreatedAt(created);
        })();
    }, [currUser]);

    useEffect(() => {
        if (currUser !== '')
            setUserProfilePicture(currUser);
        else
            setUserProfilePicture('');
    }, [currUser]);

    useEffect(() => {
        if (currUser === '')
            setModalVisibility(false);  
    }, [currUser]);

    /* Event Listeners */

    const showAlert = (text: string) => {
        setAlertText(text);
        setAlertIsShown(true);

        setTimeout(() => {
            setAlertIsShown(false);
            setAlertText('');
        }, 5 * 1000);
    };

    const alertOnClick = () => {
        setAlertIsShown(false);
        setAlertText('');
    };

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
        if (currUser == '') {
            showAlert('You are not logged in!');
            return;
        }

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
        showAlert('Uploaded New image!');
    };

    const headerClick = async () => {

        if (!userIsLoggedIn() || currUser == '') {
            return;
        }

        const imgs = await getImagesByUser(currUser);
        setImages(imgs);
        showAlert('Viewing base library');
    };

    const profileFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files)
            return;

        const img = files[0];
        const newPfp = await postProfilePicturebyUser(currUser, img);
        setUserProfilePicture(newPfp);
        showAlert('Profile Picture updated!');
    };

    const profileClick = () => {
        if (currUser !== '')
            setModalVisibility((prev) => !prev);

        else
            history.push('/login');
    };

    const profileSettingsClick = () => {
        setModalVisibility(false);
        history.push('/settings');
    };

    const profileLogOutClick = async () => {
        await logoutUser();
        setCurrUser('');

        history.push('/');
        showAlert('Successfully Logged out!');
    };

    return (
        <div className="App">
            {alertIsShown && <Alert text={alertText} onClick={alertOnClick}/>}

            <AnimatePresence exitBeforeEnter>
                <Switch>
                    <Route exact path="/">
                        <HomePage
                            userFullName={userFullName}
                            fileInputChange={fileInputChange}
                            userProfilePicture={userProfilePicture}
                            modalVisibility={modalVisibility}
                            profileClick={profileClick}
                            profileSettingsClick={profileSettingsClick}
                            profileLogOutClick={profileLogOutClick}
                            pageTravelClick={() => history.push('/library')}
                            currUser={currUser}
                            setModalVisibility={setModalVisibility}
                        />
                    </Route>

                    {
                        // Protected Route for /library
                        // User cannot go to their library if they are not 
                        // logged in
                        userIsLoggedIn() && (async () => setCurrUser(await getCurrUser()))() &&
                        <Route path="/library">
                            <PhotoLibrary
                                userFullName={userFullName} 
                                fileInputChange={fileInputChange}
                                folderClick={folderClick}
                                headerClick={headerClick}
                                images={images}
                                folders={folders}
                                modalVisibility={modalVisibility}
                                profileClick={profileClick}
                                profileSettingsClick={profileSettingsClick}
                                profileLogOutClick={profileLogOutClick}
                                pageTravelClick={() => history.push('/')}
                                profilePicture={userProfilePicture}
                                setModalVisibility={setModalVisibility}
                                showAlert={showAlert}
                            />
                        </Route>
                    }

                    {
                        // Route for /settings
                        userIsLoggedIn() && (async () => setCurrUser(await getCurrUser()))() &&
                        <Route path="/settings">
                            <ProfileSettings
                                userFullName={userFullName}
                                username={currUser}
                                userProfilePicture={userProfilePicture}
                                createdAt={createdAt}
                                profileFileChange={profileFileChange}
                            />
                        </Route>
                    }

                    {
                        // Protected route for /login
                        !userIsLoggedIn() && currUser == '' &&
                        <Route path="/login">
                            <LoginModal 
                                initalLoginState={true} 
                                setCurrUser={setCurrUser}
                                showAlert={showAlert}
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
                                showAlert={showAlert}
                            />
                        </Route>
                    }

                    {/* If nothing else matches, redirect to home */}
                    <Redirect to="/" />
                </Switch>
            </AnimatePresence>
        </div>
    );
};

export default App;