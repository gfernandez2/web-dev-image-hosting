// Requests full name from username
export async function getFullName(username) {
    // const resp = await axios.get('./services/data.json');
    // const user = resp.data.users[username];
    // return {first_name : user.first_name, last_name : user.last_name};

    return (username == 'srodrig9')
        ? {first_name: 'Simon', last_name: 'Rodriguez'}
        : {first_name: 'Gerry', last_name: 'Fernandez'};

}