import Parse from './initParse';
import { Iimage } from './imageServices';

interface Ifolder {
    name  : string,
    desc ?: string,
    imgs  : Iimage[]
}

export async function getFoldersByUser(username: string): Promise<Ifolder[]> {
    throw new Error('Not yet implemented');
}

export async function putImageInFolder(
    username: string, folderId: string, imageId: string): Promise<boolean> {

    throw new Error('Not yet implemented');
}