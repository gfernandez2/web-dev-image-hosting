import RealParse from 'parse';
import ImportedParse from '../services/initParse';

import {
    getIdFromUsername, 
    getImagesByUser, 
    getAllImages,
    getImageByUser,
} from '../services/imageServices';

describe('Parse Initialization', () => {
    it('Should correctly import parse', () => {
        expect(ImportedParse).toBeDefined();
        expect(typeof ImportedParse).toBe(typeof RealParse);
    });
});

describe('getIdFromUsername()', () => {
    it('Should correctly retrieve the ID of a user', async () => {
        const validUserName = 'srodrig9';
        const expectedId    = 'tcNloPc8y2';

        const result = await getIdFromUsername(validUserName);

        expect(result).toBe(expectedId);
    });

    it('Should throw an error for an invalid user', async () => {
        const invalidUser = 'sefubefnisefnsefsef';

        await expect(getIdFromUsername(invalidUser))
            .rejects
            .toThrowError('That particular user could not be found in the database!');

    });
});

describe('getImageByUser()', () => {

    it('Should retrieve a single image based on user', async () => {

        const validUserName = 'srodrig9';
        const validImageId = 'wpzZ5LLdnh';

        const result = await getImageByUser(validUserName, validImageId);

        expect(result).toBeDefined();
        expect(result).toHaveProperty('src');
        expect(result).toHaveProperty('alt');
    });

    it('Should throw an error if image doesn\'t belong to the user', async () => {

        const user = 'gfernan2';
        const imageThatUserDoesntOwn = 'wpzZ5LLdnh';

        await expect(getImageByUser(user, imageThatUserDoesntOwn))
            .rejects
            .toThrowError();

    });

    it('Should throw an error if image doesn\'t exist', async () => {
        const whateverUser = 'srodrig9';
        const imageThatDoesntExist = 'fsfsefisefisefse';

        await expect(getImageByUser(whateverUser, imageThatDoesntExist))
            .rejects
            .toThrowError();
    });

    it('Should throw an error if the user doesn\'t exist', async () => {
        const userDoesntExist = 'ebfubefbsuefsef';
        const imageCanBeAnything = 'ifseifsefsef';

        await expect(getImageByUser(userDoesntExist, imageCanBeAnything))
            .rejects
            .toThrowError();

    });

});

describe('getAllImages()', () => {
    it('Should get all the images in the database', async () => {
        const images = await getAllImages();

        expect(images).toBeInstanceOf(Array);

        for (const img of images) {
            expect(img).toHaveProperty('src');
            expect(img).toHaveProperty('alt');
        }
    });
});

describe('getImagesByUser()', () => {
    it('Should return a valid array of images from the user', async () => {
        
        const validUserName = 'srodrig9';
        const images = await getImagesByUser(validUserName);

        expect(images).toBeInstanceOf(Array);

        for (const img of images) {
            expect(img).toHaveProperty('src');
            expect(img).toHaveProperty('alt');
        }

    });

    it('Should throw an error if the user doesn\'t exist', async () => {
        const invalidUser = 'asdfasdf';
        await expect(getImagesByUser(invalidUser))
            .rejects
            .toThrowError();
    });
});


describe('POST image tests', () => {

    it.todo('write these unit tests!');
});

describe('postImageByUser()', () => {

    it.todo('Should correctly send an image');

});

