import Parse from 'parse';
import dotenv from 'dotenv';

export function config_parse(): void {
    // Read .env file and ad to environment
    dotenv.config();

    const parseId = process.env.REACT_APP_PARSE_APP_ID;
    const jsId    = process.env.REACT_APP_PARSE_JS_KEY;

    if (!parseId || !jsId)
        throw new Error('Parse environment variables not initialized!! Did you make a .env?');
    
    Parse.initialize(parseId, jsId);

    Parse.serverURL = (
        process.env.REACT_APP_PARSE_SERVER_URL || 
        'https://parseapi.back4app.com/'
    );

}

