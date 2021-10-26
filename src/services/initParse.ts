import Parse from 'parse';
import NodeParse from 'parse/node';
import dotenv from 'dotenv';

// Read .env file and ad to environment
dotenv.config();

// Because Jest runs in NodeJS we need to conditionally use the Node Parse object or Browser
// https://stackoverflow.com/a/34550964
const parseObj = (typeof window === 'undefined') ? NodeParse : Parse;

const parseId = process.env.PARSE_APP_ID;
const jsId    = process.env.PARSE_JS_KEY;

if (parseId && jsId) {
    parseObj.initialize(parseId, jsId);
    parseObj.serverURL = 'https://parseapi.back4app.com/';
} else {
    throw new Error('Parse environment variables not initialized!! Did you make a .env?');
}

export default parseObj;
