import React, { MouseEvent } from 'react';

type loginContentProps = {
    
    // loginClick: () => void;
    cancelClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

const LoginContent = ({ cancelClick }: loginContentProps): JSX.Element => {

    return (
        <>
            <form>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="" />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="" />
            </form>

            <div className="login-buttons">
                <button onClick={cancelClick}>Cancel</button>
                <button>Login</button>
            </div>
        </>
    );
};

export default LoginContent;