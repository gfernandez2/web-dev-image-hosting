import React, { ChangeEvent, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom';

// Components
import HomePage from './components/HomePage/HomePage';
import PhotoLibrary from './components/PhotoLibrary/PhotoLibrary';
import LoginModal from './components/LoginModal/LoginModal';

// Services
import { getImagesByUser, Iimage, postImageByUser } from './services/imageServices';
import { Ifolder, getFoldersByUser, getImagesFromFolder } from './services/folderServices';
import { getCurrUser, getFullName, userIsLoggedIn } from './services/userServices';

const App = (): JSX.Element => {
    
    /* State */
    const [ currUser, setCurrUser ] = useState('');
    const [ userFullName, setUserFullName ] = useState('Log In');
    const [ images, setImages ] = useState<Iimage[]>([]);
    const [ folders, setFolders ] = useState<Ifolder[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const user = await getCurrUser();

                if (user) {
                    console.log(user);
                    setCurrUser(user);
                }

            } catch (error) {
                console.error('Login Error: ', error);
            }
        })();
    });


    // Update the user's full name when the currUser changes
    useEffect(() => {

        (async () => {

            if (!userIsLoggedIn()) {
                setUserFullName('Log In');
                return;
            }

            const user = await getFullName(currUser);
            setUserFullName(`${user.first_name} ${user.last_name}`);
        })();
    }, [currUser]);

    // Update the images on the page when the currUser changes
    useEffect(() => {

        (async () => {

            if (!userIsLoggedIn())
                return;

            const imgList = await getImagesByUser(currUser);
            setImages(imgList);
        })();
    }, [currUser]);

    useEffect(() => {
    
        (async () => {
            if (!userIsLoggedIn())
                return;
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


    const headerClick = async () => {
        const imgs = await getImagesByUser(currUser);
        setImages(imgs);
    };

    return (
        <div className="App">
            <Router>
                <Switch>
                    {
                        // Protected Route for /library
                        // User cannot go to their library if they are not 
                        // logged in
                        userIsLoggedIn() && 
                        <Route path="/library">
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

                    <Route exact path="/">
                        <HomePage
                            userFullName={userFullName} 
                            fileInputChange={fileInputChange}
                            // isLoggedIn={isLoggedIn}
                            setCurrUser={setCurrUser}
                        />
                    </Route>


                    {/* 
                        Protected Route for /login
                            User should not be able to go to route if already
                            logged in 
                    */}
                    {
                        !userIsLoggedIn() &&
                        <Route path="/login">
                            <LoginModal 
                                initalLoginState={true} 
                                setCurrUser={setCurrUser}
                            />
                        </Route>

                    }

                    {/* 
                        Protected Route for /register
                            User should not be able to go to route if already
                            logged in 
                    */}
                    {
                        !userIsLoggedIn() &&
                        <Route path="/register">
                            <LoginModal 
                                initalLoginState={false} 
                                setCurrUser={setCurrUser}
                            />
                        </Route>
                    }

                    <Redirect to="/" />
                </Switch>
            </Router>    

            {/* <LoginModal /> */}
        </div>
    );
};

export default App;