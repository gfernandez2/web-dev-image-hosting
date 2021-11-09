import React from 'react';

import LoginContent from './LoginContent';
import RegisterContent from './RegisterContent';

import '../../styles/LoginModal.scss';

type loginModalProps = {

};

const LoginModal = (): JSX.Element => {

    return (
        <div className="LoginModal">

            {/* <LoginContent />     */}
            <RegisterContent /> 

        </div>
    );
};

export default LoginModal;