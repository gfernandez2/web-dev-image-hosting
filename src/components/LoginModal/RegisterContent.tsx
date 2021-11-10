import React, { MouseEvent } from 'react';

type registerContentProps = {

    // registerClick: () => void;
    cancelClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

const RegisterContent = ({ cancelClick }: registerContentProps): JSX.Element => {

    return (
        <>
            <form>
                <span>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" id="" />
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" id="" />
                </span>

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

export default RegisterContent;