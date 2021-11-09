import React from 'react';

const RegisterContent = () => {

    return (
        <>
            <h2>Make an account to save and organize your favorite pictures</h2>
            <div className="container">
                <div className="login-type-switcher">   x
                    <p>Login</p>
                    <p className="selected">Register</p>
                </div>

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
            </div>

            <div className="login-buttons">
                <button>Cancel</button>
                <button>Login</button>
            </div>
        </>
    );
};

export default RegisterContent;