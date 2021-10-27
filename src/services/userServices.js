import axios from 'axios';
import Parse from './initParse';

export async function getFullName(username) {
    // const resp = await axios.get('./services/data.json');
    // const user = resp.data.users[username];
    // return {first_name : user.first_name, last_name : user.last_name};

    /**
     * TODO: Implement for Feature 5
     *      For now just implemented two users, this will be a service like 
     *      the others
     */
    if (username == 'srodrig9')
        return {first_name: 'Simon', last_name: 'Rodriguez'};
    else
        return {first_name: 'Gerry', last_name: 'Fernandez'};

}

export async function getIdFromUsername(username) {

    const query = new Parse.Query(Parse.User);
    query.equalTo('username', username);

    const data = await query.find();

    if (data[0] === undefined || data[0].id === undefined)
        throw new Error('That particular user could not be found in the database!');

    return data[0].id;
}