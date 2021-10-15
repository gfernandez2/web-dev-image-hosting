import { getImagesByUser } from './imageServices';

describe('GET image tests', () => {

    it('should return a valid array of images', async () => {
        
        const validUserName = 'tcNloPc8y2';
        const images = await getImagesByUser(validUserName);

        expect(images).toBeInstanceOf(Array);

        for (const img of images) {
            expect(img).toHaveProperty('src');
            expect(img).toHaveProperty('alt');
        }

    });

    it.todo('should throw an error for an invalid user');

});


describe('POST image tests', () => {

    it.todo('write these unit tests!');
});

