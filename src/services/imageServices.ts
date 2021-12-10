import Parse from './initParse';

import { getIdFromUsername } from './userServices';

// The interface for an image
export interface Iimage {
    src: string
    alt: string
    name: string
    id ?: string
}

/* GET Requests */
export async function getAllImages(): Promise<Iimage[]> {

    const Photo = Parse.Object.extend('Photo');
    const query = new Parse.Query(Photo);
    
    // query with no filter
    const data = await query.find();

    // return in Iimage format
    const images = data.map(elem => { return {
        src: elem.get('imageSrc')._url,
        alt: elem.get('imageDesc') || '',
        name: elem.get('imageName') || '',
        id: elem.id
    };});

    return images;
}

export async function getImageByUser(
    username: string, imageId: string): Promise<Iimage> {

    const id = await getIdFromUsername(username);

    const Photo = Parse.Object.extend('Photo');
    const query = new Parse.Query(Photo);

    const user = new Parse.User();
    user.id = id;

    query.equalTo('user', user);

    const result = await query.get(imageId);

    if (!result) {
        throw new Error('The image with that specific ID could not be found or\
         the image might not belong to you!');
    }

    return {
        src: result.get('imageSrc')._url,
        alt: result.get('image') || '',
        name: result.get('imageName') || ''
    };

}

export async function getImagesByUser(username: string): Promise<Iimage[]> {


    // get the ID
    const id = getIdFromUsername(username);
    const Photo = Parse.Object.extend('Photo');

    const query = new Parse.Query(Photo);

    // Create the user we wish to filter against
    const user = new Parse.User();
    user.id = (await id);

    // Find images that only belong to that user
    query.equalTo('user', user);

    // find images that aren't in a folder
    query.equalTo('folder', undefined);
    
    const data = await query.find();


    // Return data in Iimage format
    return data.map(elem => { 
        return {
            src: elem.get('imageSrc')._url,
            alt: elem.get('imageDesc') || '',
            name: elem.get('imageName') || '',
            id: elem.id
        };});
}

/* POST Requests */
export async function postImageByUser(
    username: string, image: File): Promise<Iimage> {

    // Get some required data
    const id = getIdFromUsername(username);
    const parseFile = new Parse.File(image.name, image);

    // Set properties
    const Photo = Parse.Object.extend('Photo');
    const photo = new Photo();

    photo.set('imageName', image.name);
    photo.set('imageSrc', parseFile);
    photo.set('imageDesc', undefined);
    photo.set('folder', undefined);
    photo.set('user', {'__type': 'Pointer', 'className': '_User', 'objectId': await id});

    await photo.save();

    return {src: parseFile._url, alt: '', name: image.name};
}

// /* DELETE Requests */
export async function deleteImageByUser(imageSrc: string): Promise<boolean> {

    const imgId = (await getAllImages()).find(img => img.src == imageSrc)?.id;

    if (!imgId) return false;

    console.log(imgId);

    const Photo = Parse.Object.extend('Photo');
    const query = new Parse.Query(Photo);

    (await query.get(imgId)).destroy();

    return true;
}