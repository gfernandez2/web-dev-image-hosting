import React, { useRef } from 'react';

import './UploadArea.scss';

type uploadProps = {
    onChange : (e : any) => void;
    children : string;
}

const UploadArea = ({ onChange, children } : uploadProps) => {

    const fileRef = useRef(null);
    
    const uploadButtonClick = (e : any) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fileRef.current.click();
    };

    return (
        <div className="UploadArea">
            <input 
                ref={fileRef} 
                type="file"
                accept="image/*"
                onChange={onChange}
                multiple
            />

            <div
                className='drag-area'
                onClick={uploadButtonClick}
            >
                <p>{children}</p>
                
            </div>
        </div>
    );
};

export default UploadArea;