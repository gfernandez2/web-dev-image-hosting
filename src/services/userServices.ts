import Parse from './initParse';

// Requests full name from username
export async function getFullName(username : string): Promise<any> {

    const userId = await getIdFromUsername(username);

    // Create new Query
    const query = new Parse.Query(Parse.User);
    const user = await query.get(userId);

    if(!user){
        throw new Error('Could not find user');
    }
    
    return {first_name: user.get('firstName'), last_name: user.get('lastName')};
}

// Gets the id from the username, which is used throughout the app
export async function getIdFromUsername(username : string): Promise<string> {

    // Query against the 'username' field
    const query = new Parse.Query(Parse.User);
    query.equalTo('username', username);

    const data = await query.find();

    if (data[0] === undefined || data[0].id === undefined)
        return '';
        // throw new Error('That particular user could not be found in the database!');

    // return the built in id property
    return data[0].id;
}

// Gets the id from the username, which is used throughout the app
export async function getUserProfilePicture(username : string): Promise<string> {

    const userId = await getIdFromUsername(username);

    // Create new Query
    const query = new Parse.Query(Parse.User);
    const user = await query.get(userId);

    if(!user){
        throw new Error('Could not find user');
    }

    console.log(user.get('userProfilePicture')._url);

    return user.get('userProfilePicture')._url;
}

// Gets when user was created
export async function getUserCreated(username : string): Promise<Date> {

    const userId = await getIdFromUsername(username);

    // Create new Query
    const query = new Parse.Query(Parse.User);
    const user = await query.get(userId);

    if(!user){
        throw new Error('Could not find user');
    }

    return user.get('createdAt');
}

export function userIsLoggedIn(): boolean {

    const currentUser = Parse.User.current();

    if(currentUser !== undefined && currentUser != null){
        return true;
    }

    return false;
}

export async function getCurrUser(): Promise<string> {

    const currentUser = Parse.User.current();

    if(currentUser != null && currentUser !== undefined) {
        return await currentUser.get('username');
    }

    return '';
}

// Creation of newUser
export async function createUser(
    firstName: string, 
    lastName: string, 
    email: string, 
    password: string): Promise<void> {

    const user = new Parse.User();
  
    user.set('firstName', firstName);
    user.set('lastName', lastName);
    user.set('email', email);
    user.set('username', email); // assign email to username as well
    user.set('password', password);
  
    await user.signUp();
}

// updates profile picture of user
export async function postProfilePicturebyUser(username: string, image: File): Promise<string> {

    // Get some required data
    const id = getIdFromUsername(username);
    const parseFile = new Parse.File(image.name, image);

    // Query the user
    const query = new Parse.Query(Parse.User);
    const user  = await query.get(await id);

    user.set('userProfilePicture', parseFile);
  
    await user.save();

    return user.get('userProfilePicture')._url;
}

export async function loginUser(username: string, password: string): Promise<boolean> {
    try {
        const loggedInUser = await Parse.User.logIn(username, password);

        // test for success
        if(await getCurrUser() == loggedInUser.get('username')){
            console.log('logged in as ', loggedInUser.get('username'));
            
            return true;
        }

        return false;
    } catch {
        // If user login failed
        return false;
    }
}

export async function logoutUser(): Promise<boolean> {

    try {
        // Attempts to log out user
        await Parse.User.logOut();

        // test for success
        if(await getCurrUser() === undefined){
            return true;
        }

        return false;
    } catch {
        return false;
    }
}