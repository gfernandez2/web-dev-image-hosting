import React from 'react';

const LoginContent = () => {

    return (
        <>
            <h2>Welcome back!</h2>
            <div className="container">
                <div className="login-type-switcher">
                    <p className="selected">Login</p>
                    <p>Register</p>
                </div>

                <form>
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

export default LoginContent;