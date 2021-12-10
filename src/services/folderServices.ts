import Parse from './initParse';
import { Iimage } from './imageServices';
import { getIdFromUsername } from './userServices';

// a folder interface that we use throughout the app
export interface Ifolder {
    name  : string,
    id    : string,
}

// Gets all of the folders corresponding to a username
export async function getFoldersByUser(username: string): Promise<Ifolder[]> {

    const id = getIdFromUsername(username);

    const Folder = Parse.Object.extend('ImageFolder');
    const query = new Parse.Query(Folder);

    // Create the user we wish to query against
    const user = new Parse.User();
    user.id = (await id);

    query.equalTo('owner', user);

    const data = await query.find();

    // Return the data in our Ifolder format
    return data.map(elem => { return {
        name: elem.get('folderName'),
        id: elem.id
    };});
}

export async function getImagesFromFolder(
    username: string, folderId: string): Promise<Iimage[]> {

    const Folder = Parse.Object.extend('ImageFolder');
    const folderQuery = new Parse.Query(Folder);

    // Get the folder corresponding to the folderId
    const folder = await folderQuery.get(folderId);

    if (!folder)
        throw new Error('Could not find folder!');

    const Photo = Parse.Object.extend('Photo');
    const photoQuery = new Parse.Query(Photo);

    // Find the photos with the folder we are looking for
    photoQuery.equalTo('folder', folder);

    const data = await photoQuery.find();

    // Return the data in the Iimage format
    return data.map(elem => {return {
        src: elem.get('imageSrc')._url,
        alt: elem.get('imageDesc') || '',
        name: elem.get('imageName') || ''
    };});
}

/* TODO: implement in future features */
// export async function putImageInFolder(
//     username: string, folderId: string, imageId: string): Promise<boolean> {

//     throw new Error('Not yet implemented');
// }