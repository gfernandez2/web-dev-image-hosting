import Parse from './initParse';

import { getIdFromUsername } from './userServices';
import { Iimage } from './imageServices';

interface Ifolder {
    name  : string,
    desc ?: string,
    imgs  : Iimage[]
}

export async function getFoldersByUser(username: string): Promise<any> {

    const id = getIdFromUsername(username);

    const Folder = Parse.Object.extend('ImageFolder');
    const query = new Parse.Query(Folder);

    const user = new Parse.User();
    user.id = await id;

    query.equalTo('owner', user);

    const data = await query.find();

    return data.map(elem => { return {
        name: elem.get('folderName'),
        desc: elem.get('folderDesc') || '',
        imgs: elem.get('associatedPhotos') || []
    };});
}

export async function putImageInFolder(
    username: string, folderId: string, imageId: string): Promise<boolean> {

    throw new Error('Not yet implemented');
}