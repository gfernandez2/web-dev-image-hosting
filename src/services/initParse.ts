import Parse from 'parse/node';
import dotenv from 'dotenv';

const initParse = () => {
    dotenv.config();

    const parseId = process.env.PARSE_APP_ID;
    const jsId    = process.env.PARSE_JS_KEY;

    if (parseId && jsId) {
        Parse.initialize(parseId, jsId);
        Parse.serverURL = 'https://parseapi.back4app.com/';
    } else {
        throw new Error('Parse environment variables not initialized!! Did you make a .env?');
    }
};

export default initParse;