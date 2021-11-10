import React from 'react';
import { Redirect } from 'react-router-dom';

type protectedLoginProps = {
    isLoggedIn: boolean,
    redirect: string,
};

const ProtectedLoginRoute = ({isLoggedIn, redirect}: protectedLoginProps): JSX.Element => {

    return (
        <>
            {isLoggedIn 
                ? (<Redirect to={redirect} />)
                : (<Redirect to="/login" />)}
        </>
    );

};

export default ProtectedLoginRoute;