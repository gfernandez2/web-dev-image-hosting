import React, { MouseEvent, useRef } from 'react';
import { useHistory } from 'react-router';

// Services
import { getCurrUser, loginUser } from '../../services/userServices';

type loginContentProps = {    
    setCurrUser: any;
    cancelClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

const LoginContent = ({ setCurrUser, cancelClick }: loginContentProps): JSX.Element => {

    const history = useHistory();

    // Refs
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);    

    // Event Handlers
    const loginButtonClick = async () => {
        
        // Get the input from the user
        const email = emailRef.current?.value;
        const pword = passwordRef.current?.value;

        if (email && pword) {
            
            // Attempt to log in
            const isLoggedIn = await loginUser(email, pword);
            
            if (isLoggedIn) {
                setCurrUser(await getCurrUser());
                history.push('/');
            }
            else
                alert('Unable to log in!');
        }
    };


    return (
        <>
            <form>
                <label htmlFor="email">Email</label>
                <input ref={emailRef} type="email" name="email" id="" />

                <label htmlFor="password">Password</label>
                <input ref={passwordRef} type="password" name="password" id="" />
            </form>

            <div className="login-buttons">
                <button onClick={cancelClick}>Cancel</button>
                <button onClick={loginButtonClick}>Login</button>
            </div>
        </>
    );
};

export default LoginContent;