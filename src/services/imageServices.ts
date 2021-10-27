import Parse from './initParse';

export interface Iimage {
    src: string
    alt: string
}

/* GET Requests */
export async function getAllImages(): Promise<Iimage[]> {

    const Photo = Parse.Object.extend('Photo');
    const query = new Parse.Query(Photo);
    
    const data = await query.find();

    const images = data.map(elem => { return {
        src: elem.get('imageSrc')._url,
        alt: elem.get('imageDesc') || ''
    };});

    return images;
}

export async function getIdFromUsername(username: string): Promise<string> {

    const query = new Parse.Query(Parse.User);
    query.equalTo('username', username);

    const data = await query.find();

    if (data[0] === undefined || data[0].id === undefined)
        throw new Error('That particular user could not be found in the database!');

    return data[0].id;
}

export async function getImageByUser(
    username: string, imageId: string): Promise<Iimage> {

    const id = await getIdFromUsername(username);
    const Photo = Parse.Object.extend('Photo');
    const query = new Parse.Query(Photo);
    query.equalTo('user', {'__type': 'Pointer', 'className': '_User', 'objectId': id});

    const result = await query.get(imageId);

    if (!result) {
        throw new Error('The image with that specific ID could not be found or\
         the image might not belong to you!');
    }

    return {
        src: result.get('imageSrc')._url,
        alt: result.get('image') || ''
    };

}

export async function getImagesByUser(username: string): Promise<Iimage[]> {


    const id = getIdFromUsername(username);
    const Photo = Parse.Object.extend('Photo');

    const query = new Parse.Query(Photo);

    const user = new Parse.User();
    user.id = (await id);
    query.equalTo('user', user);
    // https://designingforscale.com/query-on-a-parse-pointer/
    // query.equalTo('user', { '__type': 'Pointer', 'className': '_User', 'objectId': await id });
    
    const data = await query.find();

    return data.map(elem => { return {
        src: elem.get('imageSrc')._url,
        alt: elem.get('imageDesc') || ''
    };});
}

/* POST Requests */
export async function postImageByUser(
    username: string, image: File): Promise<Iimage> {

    // Get some required data
    const id = getIdFromUsername(username);
    const parseFile = new Parse.File(image.name, image);

    // Set properties
    const photo = new Parse.Object('Photo');
    photo.set('imageSrc', parseFile);
    photo.set('imageDesc', undefined);
    photo.set('folder', undefined);
    photo.set('user', {'__type': 'Pointer', 'className': '_User', 'objectId': await id});

    await photo.save();

    return {src: parseFile._url, alt: ''};
}

/* PUT Requests */
// export async function putImageByUser(
//     username: string, 
//     imageId: string, 
//     field: string, 
//     content: string
// ): Promise<Iimage> {

//     throw new Error('Not yet implemented');
// }

// /* DELETE Requests */
// export async function deleteImageByUser(
//     username: string, imageId: string): Promise<boolean> {
    
    
//     throw new Error('Not yet implemented');
// }