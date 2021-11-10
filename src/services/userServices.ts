import Parse from './initParse';

// Requests full name from username
export async function getFullName(username : string) {
    // const resp = await axios.get('./services/data.json');
    // const user = resp.data.users[username];
    // return {first_name : user.first_name, last_name : user.last_name};

    /**
     * TODO: Implement for Feature 5
     *      For now just implemented two users, this will be a service like 
     *      the others
     */

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
export async function getIdFromUsername(username : string) {

    // Query against the 'username' field
    const query = new Parse.Query(Parse.User);
    query.equalTo('username', username);

    const data = await query.find();

    if (data[0] === undefined || data[0].id === undefined)
        throw new Error('That particular user could not be found in the database!');

    // return the built in id property
    return data[0].id;
}

export async function userIsLoggedIn() {

    return true;
}

export async function getCurrUser() {

    return 'srodrig9';
}

// Creation of newUser
export async function createUser(firstName : string, lastName : string, email : string, password : string) {
    const user = new Parse.User();
  
    user.set('firstName', firstName);
    user.set('lastName', lastName);
    user.set('email', email);
    user.set('username', email); // assign email to username as well
    user.set('password', password);
  
    await user.signUp();
}

export async function loginUser() {
    throw new Error('Not yet implemented!');
}