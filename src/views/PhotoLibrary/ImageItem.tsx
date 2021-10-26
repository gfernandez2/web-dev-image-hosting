import React from 'react';

type itemProps = {
    src : string;
    alt : string;
    onClick : (e : any) => void;
}

const ImageItem = ({ src, alt, onClick } : itemProps) => {
    return (
        <article className="ImageItem" onClick={onClick}>
            <img src={src} alt={alt} />
        </article>
    );
};

export default ImageItem;