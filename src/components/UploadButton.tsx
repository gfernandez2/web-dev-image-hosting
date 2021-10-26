import React, { useRef } from 'react';

import './UploadButton.scss';

type uploadProps = {
    onChange : (e : any) => void;
    children : string;
}

const UploadButton = ({ onChange, children } : uploadProps) => {

    const fileRef = useRef(null);
    
    const uploadButtonClick = (e : any) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fileRef.current.click();
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