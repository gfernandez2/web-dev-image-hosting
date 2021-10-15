import Parse from './initParse';

interface Iimage {
    src: string
    alt: string
}

interface Ifolder {
    name  : string,
    desc ?: string,
    imgs  : Iimage[]
}

/* GET Requests */
export async function getIdFromUsername(username: string) {

    const User = Parse.Object.extend('User');
    const query = new Parse.Query(User);
    query.equalTo('username', username);

    return query;
}

export async function getAllImages(): Promise<Iimage[]> {

    const Photo = Parse.Object.extend('Photo');
    const query = new Parse.Query(Photo);
    
    const data = await query.find();

    console.log(data.length);

    const images = data.map(elem => { return {
        src: elem.get('imageSrc')._url,
        alt: elem.get('imageDesc') || 'An image'
    };});

    return images;
}

export async function getImageByUser(
    username: string, imageId: string): Promise<Iimage> {
    throw new Error('Not yet implemented');
}

export async function getImagesByUser(username: string): Promise<Iimage[]> {

    const idQuery = await getIdFromUsername(username);

    const Photo = Parse.Object.extend('Photo');
    const query = new Parse.Query(Photo);
    // query.matchesKeyInQuery('user', 'belongsTo.user', idQuery);
    
    const data = await query.find();

    console.log(data.length);

    const images = data.map(elem => { return {
        src: elem.get('imageSrc')._url,
        alt: elem.get('imageDesc') || 'An image'
    };});

    return images;

}

export async function getFoldersByUser(username: string): Promise<Ifolder[]> {

    throw new Error('Not yet implemented');
}

/* POST Requests */
export async function postImageByUser(
    username: string, image: File): Promise<Iimage> {

    throw new Error('Not yet implemented');
}

/* PUT Requests */
export async function putImageByUser(
    username: string, 
    imageId: string, 
    field: string, 
    content: string
): Promise<Iimage> {

    throw new Error('Not yet implemented');
}

export async function putImageInFolder(
    username: string, folderId: string, imageId: string): Promise<boolean> {

    throw new Error('Not yet implemented');
}

/* DELETE Requests */
export async function deleteImageByUser(
    username: string, imageId: string): Promise<boolean> {
    
    
    throw new Error('Not yet implemented');
}