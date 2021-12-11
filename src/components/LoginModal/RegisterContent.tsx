import React, { MouseEvent, useRef } from 'react';
import { useHistory } from 'react-router';
import { createUser, getCurrUser } from '../../services/userServices';

type registerContentProps = {

    // registerClick: () => void;
    cancelClick: (e: MouseEvent<HTMLButtonElement>) => void;
    setCurrUser: any;
    showAlert: (text: string) => void;
};

const RegisterContent = ({ setCurrUser, cancelClick, showAlert }: registerContentProps): JSX.Element => {

    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef  = useRef<HTMLInputElement>(null);
    const emailRef     = useRef<HTMLInputElement>(null);
    const passwordRef  = useRef<HTMLInputElement>(null);

    const history = useHistory();

    const registerClick = async () => {

        const fname = firstNameRef.current?.value;
        const lname = lastNameRef.current?.value;
        const email = emailRef.current?.value;
        const pword = passwordRef.current?.value;

        if (fname && lname && email && pword) {
            await createUser(fname, lname, email, pword);
            setCurrUser(await getCurrUser());
            history.push('/');
            showAlert(`Registered as ${await getCurrUser()}!`);
        }
    };

    return (
        <>
            <form>
                <span>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" ref={firstNameRef}/>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" ref={lastNameRef} />
                </span>

                <label htmlFor="email">Email</label>
                <input type="email" name="email" ref={emailRef} />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" ref={passwordRef} />
            </form>

            <div className="login-buttons">
                <button onClick={cancelClick}>Cancel</button>
                <button onClick={registerClick}>Register</button>
            </div>
        </>
    );
};

export default RegisterContent;