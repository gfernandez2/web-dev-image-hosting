import React from 'react';

type detailProps = {
    src : string;
    alt : string;
    setIsFocused: any;
}

const ImageDetails = ({ src, alt, setIsFocused }: detailProps): JSX.Element => { 

    return (
        <div className="ImageDetails" tabIndex={0} onBlur={() => setIsFocused(false)} onFocus={setIsFocused(true)}> 
            <img src={src} alt={alt} />
            <h3>{alt}</h3>
        </div>
    );
};

export default ImageDetails;