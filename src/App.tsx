import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// Components
import HomePage from './views/HomePage/HomePage';
import PhotoLibrary from './views/PhotoLibrary/PhotoLibrary';

// Services
import { getImagesByUser, postImageByUser } from './services/imageServices';
import { getFullName } from './services/userServices';

// Just hardcoded the default user for now. later when we implement
// authentication, the default user will be a guest
const DEFAULT_CURRENT_USER = 'gfernan2';

const App = () => {
    
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
            console.log(imgList);
            setImages(imgList as any);
        })();
    }, [currUser]);

    /* Event Listeners */

    // When the user chooses to upload a file
    const fileInputChange = async (e: any) => {
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

    // Changes the current user when you click on the profile
    const profileClick = () => {
        alert('For feature 4 we will implement full user authentication. But for now, this button will just switch users between Gerry and Simon');

        if (currUser === 'srodrig9')
            setCurrUser('gfernan2');
        else
            setCurrUser('srodrig9');
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
                            images={images}
                        />
                    </Route>

                    <Route path="/">
                        <HomePage
                            userFullName={userFullName} 
                            fileInputChange={fileInputChange}
                            profileClick={profileClick}
                            images={images}
                        />
                    </Route>
                </Switch>
            </Router>    
        </div>
    );
};

export default App;