import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import LoginContent from './LoginContent';
import RegisterContent from './RegisterContent';

import '../../styles/LoginModal.scss';

type loginModalProps = {
    initalLoginState    ?: boolean;
    setCurrUser          : any;
};


const LoginModal = ({ initalLoginState, setCurrUser }: loginModalProps): JSX.Element => {

    const history = useHistory();

    const cancelButtonClick = () => {
        history.push('/');
    };

    if (initalLoginState === undefined)
        initalLoginState = true;

    // Controls whether the "login" or "register" button is selected
    const [login, setLogin] = useState(initalLoginState);

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

        history.push('/login');
    };

    const registerSelectEvent = () => {
        if (login)
            setLogin(!login);

        history.push('/register');
    };

    return (
        <div className="LoginModal">
            <h2>
                {login ? ('Welcome!') : ('Create an account to save and organize photos to a library!')}
            </h2>
            
            <div className="container">
                <div className="login-type-switcher">
                    <p ref={loginRef} onClick={loginSelectEvent}>Login</p>
                    <p ref={registerRef} onClick={registerSelectEvent}>Register</p>
                </div>

                {
                    /**
                     * Shows the appropriate content depending on whether they
                     * have login selected or register
                     */
                    login
                        ? (<LoginContent  setCurrUser={setCurrUser} cancelClick={cancelButtonClick}/>)
                        : (<RegisterContent setCurrUser={setCurrUser} cancelClick={cancelButtonClick}/>)
                }
            </div>


        </div>
    );
};

export default LoginModal;