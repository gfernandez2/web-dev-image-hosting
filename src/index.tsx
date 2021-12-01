import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Parse Setup
import { config_parse } from './services/initParse';
config_parse();

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);