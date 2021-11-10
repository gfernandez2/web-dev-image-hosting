import React, { MouseEvent, useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import LoginContent from './LoginContent';
import RegisterContent from './RegisterContent';

// TODO Import loginUser function
import { createUser } from '../../services/userServices';

import '../../styles/LoginModal.scss';

type loginModalProps = {
    loginButtonClick    : (e: MouseEvent<HTMLButtonElement>) => void;
    registerButtonClick : (e: MouseEvent<HTMLButtonElement>) => void;
};


const LoginModal = (): JSX.Element => {

    const history = useHistory();

    // const loginUser = () => {};
    const cancelButtonClick = () => {
        history.push('/');
    };

    const [login, setLogin] = useState(true);

    const loginRef = useRef<HTMLParagraphElement>(null);
    const registerRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (loginRef.current && registerRef.current) {
            if (login) {
                loginRef.current.classList.add('selected');
                registerRef.current.classList.remove('selected');
            } else {
                registerRef.current.classList.add('selected');
                loginRef.current.classList.remove('selected');
            }
        }
    }, [login]);


    const loginSelectEvent = () => {
        if (!login)
            setLogin(!login);
    };

    const registerSelectEvent = () => {
        if (login)
            setLogin(!login);
    };

    return (
        <div className="LoginModal">

            <h2>Welcome!</h2>
            <div className="container">
                <div className="login-type-switcher">
                    <p ref={loginRef} onClick={loginSelectEvent}>Login</p>
                    <p ref={registerRef} onClick={registerSelectEvent}>Register</p>
                </div>

                {
                    login
                        ? (<LoginContent  cancelClick={cancelButtonClick}/>)
                        : (<RegisterContent cancelClick={cancelButtonClick}/>)
                }
            </div>


        </div>
    );
};

export default LoginModal;