import React from 'react';
import { Redirect } from 'react-router-dom';

import { } from '../services/userServices';

type protectedLoginProps = {
    desiredCondition: boolean;
    redirectIfTrue: string;
    redirectIfFalse: string;
};

const ProtectedLoginRoute = ({ desiredCondition, redirectIfTrue, redirectIfFalse}: protectedLoginProps): JSX.Element => {

    return (
        <>
            {isLoggedIn == desiredCondition
                ? (<Redirect to={redirectIfTrue} />)
                : (<Redirect to={redirectIfFalse} />)}
        </>
    );

};

export default ProtectedLoginRoute;