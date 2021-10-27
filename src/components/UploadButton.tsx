import React, { ChangeEvent, useRef } from 'react';

import '../styles/UploadButton.scss';

type uploadProps = {
    onChange : (e : ChangeEvent<HTMLInputElement>) => Promise<void>;
    children : string;
}

const UploadButton = ({ onChange, children } : uploadProps): JSX.Element => {

    const fileRef = useRef<HTMLInputElement>(null);
    
    const uploadButtonClick = () => {
        if (fileRef != null && fileRef.current != null) {
            fileRef.current.click();

        }
    };

    return (
        <div className="UploadButton">
            <input 
                ref={fileRef} 
                type="file"
                accept="image/*"
                onChange={onChange}
                multiple
            />

            <button
                onClick={uploadButtonClick}
            >
                {children}
            </button>
        </div>
    );
};

export default UploadButton;