import React from 'react';

import ImageItem from './ImageItem.js';

import { Iimage } from '../../services/imageServices';

type imageFunction = (e : React.MouseEvent<HTMLImageElement>) => void;

const ImageGrid = ({ images : Iimage[], imageOnClick : imageFunction}) => {

    return (
        <section className="ImageGrid">
            {images.map(img => 
                <{ImageItem} src={img.src} alt={img.alt} onclick={imageOnClick} /> 
            )}
        </section>
    );
};

export default ImageGrid;