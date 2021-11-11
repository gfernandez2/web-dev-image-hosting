import React, { ChangeEvent, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

// Components
import HomePage from './components/HomePage/HomePage';
import PhotoLibrary from './components/PhotoLibrary/PhotoLibrary';
import LoginModal from './components/LoginModal/LoginModal';

// Services
import { getImagesByUser, Iimage, postImageByUser } from './services/imageServices';
import { Ifolder, getFoldersByUser, getImagesFromFolder } from './services/folderServices';
import { getCurrUser, getFullName } from './services/userServices';

const App = (): JSX.Element => {
    
    /* State */
    const [ currUser, setCurrUser ] = useState('');
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ userFullName, setUserFullName ] = useState('');
    const [ images, setImages ] = useState<Iimage[]>([]);
    const [ folders, setFolders ] = useState<Ifolder[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const user = await getCurrUser();
                lsetCurrUser(user);

            } catch (error) {
                console.error('Login Error: ', error);
                
            }
        })();
    });

    useEffect(() => {
        if (currUser == '' || !currUser)
            setIsLoggedIn(false);
        else
            setIsLoggedIn(true);
    }, [currUser]);

    // Update the user's full name when the currUser changes
    useEffect(() => {

        if (currUser == '')
            return;

        (async () => {
            const user = await getFullName(currUser);
            setUserFullName(`${user.first_name} ${user.last_name}`);
        })();
    }, [currUser]);

    // Update the images on the page when the currUser changes
    useEffect(() => {

        if (currUser == '')
            return;

        (async () => {
            const imgList = await getImagesByUser(currUser);
            setImages(imgList);
        })();
    }, [currUser]);

    useEffect(() => {

        if (currUser == '')
            return; 

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

                    <Route exact path="/">
                        <HomePage
                            userFullName={userFullName} 
                            fileInputChange={fileInputChange}
                            profileClick={profileClick}
                        />
                    </Route>


                    {/* 
                        Protected Route for /login
                            User should not be able to go to route if already
                            logged in 
                    */}
                    {
                        !isLoggedIn &&
                        <Route path="/login">
                            <LoginModal initalLoginState={true} />
                        </Route>

                    }

                    {/* 
                        Protected Route for /register
                            User should not be able to go to route if already
                            logged in 
                    */}
                    {
                        !isLoggedIn &&
                        <Route path="/register">
                            <LoginModal initalLoginState={false} />
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