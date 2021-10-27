import React, { MouseEventHandler } from 'react';

import './../../styles/ImageItem.scss';

type itemProps = {
    src : string;
    alt : string;
    onClick : MouseEventHandler<HTMLElement>;
}

const ImageItem = ({ src, alt, onClick }: itemProps): JSX.Element => {
    return (
        <article className="ImageItem" onClick={onClick}>
            <img src={src} alt={alt} />
        </article>
    );
};

export default ImageItem;