import React from 'react';

import './ImageGrid.scss';

import ImageItem from './ImageItem';

import { Iimage } from '../../services/imageServices';

type gridProps = {
    images: Iimage[],
    imageOnClick: (e : React.MouseEvent<HTMLImageElement>) => void;
}

const ImageGrid = ({ images, imageOnClick }: gridProps) => {

    return (
        <section className="ImageGrid">
            {images.map((img, index) => 
                <ImageItem key={index} src={img.src} alt={img.alt} onClick={imageOnClick} /> 
            )}
        </section>
    );
};

export default ImageGrid;